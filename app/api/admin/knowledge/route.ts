import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import type { KnowledgeCategory } from "@/lib/generated/prisma/client";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as KnowledgeCategory | null;
  const search = searchParams.get("search") ?? "";

  const entries = await db.knowledgeEntry.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ],
      } : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json() as {
    title: string; content: string; category: KnowledgeCategory;
    tags?: string; isActive?: boolean;
  };

  const entry = await db.knowledgeEntry.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      tags: body.tags ?? "",
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(entry, { status: 201 });
}
