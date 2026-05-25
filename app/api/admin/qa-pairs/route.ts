import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import type { KnowledgeCategory } from "@/lib/generated/prisma/client";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as KnowledgeCategory | null;

  const pairs = await db.qAPair.findMany({
    where: category ? { category } : {},
    orderBy: { usageCount: "desc" },
  });

  return NextResponse.json(pairs);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json() as {
    question: string; answer: string; category?: KnowledgeCategory; isActive?: boolean;
  };

  const pair = await db.qAPair.create({
    data: {
      question: body.question,
      answer: body.answer,
      category: body.category ?? "FAQ",
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(pair, { status: 201 });
}
