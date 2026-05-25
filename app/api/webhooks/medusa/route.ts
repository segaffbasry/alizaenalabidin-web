import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

// Quota granted per product type on order.placed
const QUOTA_BY_PRODUCT_TYPE: Record<string, number> = {
  book: 0,       // books don't grant extra quota
  workshop: 50,  // workshop ticket → 50 extra questions
  service: 100,  // 1-on-1 coaching → 100 extra questions
};

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.MEDUSA_WEBHOOK_SECRET;
  if (!secret) return true; // skip verification in dev if secret not set
  if (!signature) return false;

  const expected = createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-medusa-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { type: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.type !== "order.placed") {
    return NextResponse.json({ received: true });
  }

  try {
    await handleOrderPlaced(event.data);
  } catch (err) {
    console.error("[webhook/medusa] handleOrderPlaced error:", err);
    // Return 200 so Medusa doesn't retry — log and handle manually
  }

  return NextResponse.json({ received: true });
}

async function handleOrderPlaced(orderData: Record<string, unknown>) {
  // Extract customer email from Medusa order payload
  const email =
    (orderData.email as string) ??
    ((orderData.customer as Record<string, unknown>)?.email as string);

  if (!email) return;

  // Find user by email
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return; // guest checkout — no quota to update

  // Sum quota to grant from all line items
  interface LineItem {
    variant?: { product?: { type?: { value?: string } } };
    quantity?: number;
  }
  const items: LineItem[] = (orderData.items as LineItem[]) ?? [];
  let quotaToAdd = 0;

  for (const item of items) {
    const productType = item.variant?.product?.type?.value ?? "";
    const grantPerItem = QUOTA_BY_PRODUCT_TYPE[productType] ?? 0;
    quotaToAdd += grantPerItem * (item.quantity ?? 1);
  }

  if (quotaToAdd > 0) {
    await db.user.update({
      where: { id: user.id },
      data: { quotaGranted: { increment: quotaToAdd } },
    });
    console.log(`[webhook/medusa] Granted ${quotaToAdd} questions to user ${user.email}`);
  }
}
