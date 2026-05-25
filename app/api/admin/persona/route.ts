import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { invalidatePersonaCache } from "@/lib/persona-cache";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const persona = await db.botPersona.findFirst();
  return NextResponse.json(persona);
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json() as Partial<{
    systemPrompt: string; temperature: number; model: string;
    maxTokens: number; greetingMessage: string; fallbackMessage: string;
  }>;

  const existing = await db.botPersona.findFirst();

  const persona = existing
    ? await db.botPersona.update({ where: { id: existing.id }, data: body })
    : await db.botPersona.create({
        data: {
          systemPrompt: body.systemPrompt ?? "",
          temperature: body.temperature ?? 0.7,
          model: body.model ?? "gpt-4o-mini",
          maxTokens: body.maxTokens ?? 800,
          greetingMessage: body.greetingMessage ?? "Halo! Ada yang ingin kamu tanyakan?",
          fallbackMessage: body.fallbackMessage ?? "Maaf, saya tidak dapat merespons saat ini. Silakan coba lagi.",
        },
      });

  invalidatePersonaCache();
  return NextResponse.json(persona);
}
