import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TANYA_COOKIE, FREE_QUESTION_LIMIT, type TanyaSession } from "@/lib/tanya";
import { randomUUID } from "crypto";

function newSession(): TanyaSession {
  return {
    sessionId: randomUUID(),
    questionsUsed: 0,
    createdAt: Date.now(),
  };
}

function parseSession(raw: string | undefined): TanyaSession {
  if (!raw) return newSession();
  try {
    const parsed = JSON.parse(raw) as TanyaSession;
    if (!parsed.sessionId || typeof parsed.questionsUsed !== "number") return newSession();
    return parsed;
  } catch {
    return newSession();
  }
}

// GET — return current session state
export async function GET() {
  const jar = await cookies();
  const raw = jar.get(TANYA_COOKIE)?.value;
  const session = parseSession(raw);

  const res = NextResponse.json({
    sessionId: session.sessionId,
    questionsUsed: session.questionsUsed,
    questionsRemaining: Math.max(0, FREE_QUESTION_LIMIT - session.questionsUsed),
    limit: FREE_QUESTION_LIMIT,
    exhausted: session.questionsUsed >= FREE_QUESTION_LIMIT,
  });

  // Refresh cookie on read so it stays alive
  res.cookies.set(TANYA_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return res;
}

// POST — increment question count, return updated quota
export async function POST(req: NextRequest) {
  const jar = await cookies();
  const raw = jar.get(TANYA_COOKIE)?.value;
  const session = parseSession(raw);

  if (session.questionsUsed >= FREE_QUESTION_LIMIT) {
    return NextResponse.json(
      { error: "quota_exceeded", questionsRemaining: 0 },
      { status: 402 }
    );
  }

  session.questionsUsed += 1;
  const remaining = Math.max(0, FREE_QUESTION_LIMIT - session.questionsUsed);

  const res = NextResponse.json({
    questionsUsed: session.questionsUsed,
    questionsRemaining: remaining,
    exhausted: remaining === 0,
  });

  res.cookies.set(TANYA_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return res;
}
