import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/store/cart-store";

interface CustomerDetails {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

interface ShippingAddress {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items: CartItem[] = body.items ?? [];
  const customer: CustomerDetails = body.customer ?? {};
  const shippingAddress: ShippingAddress = body.shipping_address ?? {};

  if (!items.length) {
    return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "MIDTRANS_SERVER_KEY tidak dikonfigurasi" }, { status: 500 });
  }

  try {
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const orderId = `AZA-${Date.now()}`;
    const grossAmount = Math.round(
      items.reduce((sum, item) => sum + (item.price) * item.quantity, 0)
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const payload: Record<string, unknown> = {
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      credit_card: { secure: true },
      item_details: items.map((item) => ({
        id: item.variantId,
        price: Math.round(item.price),
        quantity: item.quantity,
        name: `${item.title} - ${item.variantTitle}`.slice(0, 50),
      })),
      currency: "IDR",
      callbacks: {
        finish: `${baseUrl}/checkout/success`,
        error: `${baseUrl}/checkout/error`,
        pending: `${baseUrl}/checkout/pending`,
      },
    };

    if (customer.email || customer.first_name) {
      payload.customer_details = {
        first_name: customer.first_name ?? "",
        last_name: customer.last_name ?? "",
        email: customer.email ?? "",
        phone: customer.phone ?? "",
      };
    }

    if (shippingAddress.address) {
      payload.shipping_address = {
        first_name: shippingAddress.first_name ?? "",
        last_name: shippingAddress.last_name ?? "",
        email: shippingAddress.email ?? "",
        phone: shippingAddress.phone ?? "",
        address: shippingAddress.address ?? "",
        city: shippingAddress.city ?? "",
        postal_code: shippingAddress.postal_code ?? "",
        country_code: "IDN",
      };
    }

    const res = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error_messages?.[0] ?? data?.message ?? "Midtrans error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({
      snap_token: data.token,
      redirect_url: data.redirect_url,
      order_id: orderId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
