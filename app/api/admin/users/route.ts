import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const users = await db.user.findMany({
    select: {
      id: true, email: true, name: true, role: true,
      quotaGranted: true, createdAt: true,
      _count: { select: { conversations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}
