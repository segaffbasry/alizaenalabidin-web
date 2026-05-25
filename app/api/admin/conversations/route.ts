import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const quotaOnly = searchParams.get("quotaExhausted") === "true";
  const dateFrom = searchParams.get("from");
  const dateTo = searchParams.get("to");

  const conversations = await db.conversationLog.findMany({
    where: {
      ...(quotaOnly ? { quotaExhausted: true } : {}),
      ...(dateFrom || dateTo ? {
        startedAt: {
          ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
          ...(dateTo ? { lte: new Date(dateTo) } : {}),
        },
      } : {}),
    },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { startedAt: "desc" },
    take: 100,
  });

  return NextResponse.json(conversations);
}
