import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { TANYA_COOKIE, FREE_QUESTION_LIMIT, type TanyaSession } from "@/lib/tanya";
import { authOptions } from "@/lib/auth";
import { getPersona } from "@/lib/persona-cache";
import { retrieveContext, formatContextBlock, incrementQAUsage } from "@/lib/knowledge";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? "missing",
    organization: process.env.OPENAI_ORG_ID,
  });
}

const FALLBACK_RESPONSE =
  "Terima kasih atas pertanyaan yang indah ini. Saat ini saya mengalami sedikit gangguan koneksi. Silakan coba lagi, atau booking sesi langsung bersama Ali di halaman Products.";

function parseCookieSession(raw: string | undefined): TanyaSession {
  if (!raw) return { sessionId: randomUUID(), questionsUsed: 0, createdAt: Date.now() };
  try {
    return JSON.parse(raw) as TanyaSession;
  } catch {
    return { sessionId: randomUUID(), questionsUsed: 0, createdAt: Date.now() };
  }
}

export async function POST(req: NextRequest) {
  const jar = await cookies();

  // ── Resolve quota based on auth status ───────────────────────────────────
  const authSession = await getServerSession(authOptions);
  const userId = authSession?.user?.id ?? null;

  let effectiveLimit: number;
  let currentUsed: number;
  let cookieSession: TanyaSession | null = null;

  if (userId) {
    // Authenticated: quota tracked in DB
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { questionUsed: true, quotaGranted: true },
    });
    currentUsed = user?.questionUsed ?? 0;
    effectiveLimit = FREE_QUESTION_LIMIT + (user?.quotaGranted ?? 0);
  } else {
    // Guest: quota tracked in cookie
    const raw = jar.get(TANYA_COOKIE)?.value;
    cookieSession = parseCookieSession(raw);
    currentUsed = cookieSession.questionsUsed;
    effectiveLimit = FREE_QUESTION_LIMIT;
  }

  if (currentUsed >= effectiveLimit) {
    return NextResponse.json({ error: "quota_exceeded" }, { status: 402 });
  }

  const body = await req.json() as { messages?: { role: string; content: string }[]; conversationId?: string };
  const incomingMessages = body?.messages ?? [];
  if (!incomingMessages.length) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const userMessage = incomingMessages[incomingMessages.length - 1];
  if (!userMessage || userMessage.role !== "user") {
    return NextResponse.json({ error: "Last message must be from user." }, { status: 400 });
  }

  // Load persona + knowledge context concurrently
  const [persona, context] = await Promise.all([
    getPersona(),
    retrieveContext(userMessage.content),
  ]);

  const contextBlock = formatContextBlock(context);
  const systemContent = persona
    ? `${persona.systemPrompt}${contextBlock ? `\n\n${contextBlock}` : ""}`
    : `You are Ali Zaenal Abidin's AI representative. Answer warmly as Ali would — in Bahasa Indonesia unless the user writes in English. Focus on life transformation, mindfulness, and purpose. If unsure, suggest booking a session.${contextBlock ? `\n\n${contextBlock}` : ""}`;

  const historyMessages = incomingMessages
    .slice(-7, -1)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const messageId = randomUUID();
  const newUsed = currentUsed + 1;
  const remaining = Math.max(0, effectiveLimit - newUsed);
  const exhausted = remaining === 0;

  // Track usage (kick off before streaming; don't await in stream)
  if (userId) {
    db.user.update({
      where: { id: userId },
      data: { questionUsed: { increment: 1 } },
    }).catch(() => {});
  } else if (cookieSession) {
    cookieSession.questionsUsed = newUsed;
  }

  const sessionIdForLog = cookieSession?.sessionId ?? userId ?? randomUUID();

  // ── Streaming response ────────────────────────────────────────────────────
  const encoder = new TextEncoder();
  let fullContent = "";

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        if (!process.env.OPENAI_API_KEY) {
          const mock = persona?.fallbackMessage ?? FALLBACK_RESPONSE;
          for (const char of mock) {
            fullContent += char;
            sendEvent({ text: char });
            await new Promise((r) => setTimeout(r, 12));
          }
        } else {
          const completion = await getOpenAI().chat.completions.create({
            model: persona?.model ?? "gpt-4o-mini",
            temperature: persona?.temperature ?? 0.7,
            max_tokens: persona?.maxTokens ?? 800,
            stream: true,
            messages: [
              { role: "system", content: systemContent },
              ...historyMessages,
              { role: "user", content: userMessage.content },
            ],
          });

          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullContent += text;
              sendEvent({ text });
            }
          }
        }

        if (context.qaPairs.length) {
          await incrementQAUsage(context.qaPairs.map((q) => q.id)).catch(() => {});
        }

        const allMessages = [
          ...incomingMessages,
          { role: "assistant", content: fullContent, timestamp: Date.now() },
        ];
        db.conversationLog.upsert({
          where: { id: body.conversationId ?? "__new__" },
          update: {
            messages: JSON.stringify(allMessages),
            questionCount: { increment: 1 },
            quotaExhausted: exhausted,
          },
          create: {
            sessionId: sessionIdForLog,
            userId,
            messages: JSON.stringify(allMessages),
            questionCount: 1,
            quotaExhausted: exhausted,
          },
        }).catch(() => {});

        sendEvent({ done: true, messageId, questionsRemaining: remaining, exhausted });
      } catch (err) {
        console.error("[tanya/chat]", err);
        const fallback = persona?.fallbackMessage ?? FALLBACK_RESPONSE;
        fullContent = fallback;
        sendEvent({ text: fallback });
        sendEvent({ done: true, messageId, questionsRemaining: remaining, exhausted, error: true });
      } finally {
        controller.close();
      }
    },
  });

  const response = new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  // For guest sessions, persist updated cookie count
  if (cookieSession) {
    const updatedSession = JSON.stringify(cookieSession);
    response.headers.append(
      "Set-Cookie",
      `${TANYA_COOKIE}=${encodeURIComponent(updatedSession)}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly`
    );
  }

  return response;
}
