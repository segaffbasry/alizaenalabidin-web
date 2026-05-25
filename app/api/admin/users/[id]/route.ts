import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import type { Role } from "@/lib/generated/prisma/client";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json() as Partial<{
    role: Role; quotaGranted: number; name: string;
  }>;

  const user = await db.user.update({
    where: { id },
    data: {
      ...(body.role !== undefined && { role: body.role }),
      ...(body.quotaGranted !== undefined && { quotaGranted: body.quotaGranted }),
      ...(body.name !== undefined && { name: body.name }),
    },
    select: { id: true, email: true, name: true, role: true, quotaGranted: true },
  });

  return NextResponse.json(user);
}
