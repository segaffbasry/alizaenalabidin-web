"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MEDUSA_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

interface MedusaOrder {
  id: string;
  display_id: number;
  status: string;
  total: number;
  currency_code: string;
  created_at: string;
  items: { id: string; title: string; quantity: number; unit_price: number }[];
}

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending: { label: "Menunggu", color: "bg-amber-50 text-amber-600" },
  completed: { label: "Selesai", color: "bg-green-50 text-green-600" },
  cancelled: { label: "Dibatalkan", color: "bg-red-50 text-red-500" },
  requires_action: { label: "Perlu Tindakan", color: "bg-purple-50 text-purple-600" },
};

export default function DashboardOrders({ userEmail }: { userEmail: string }) {
  const [orders, setOrders] = useState<MedusaOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(
          `${MEDUSA_URL}/store/orders?email=${encodeURIComponent(userEmail)}`,
          {
            headers: {
              "x-publishable-api-key": PUB_KEY,
            },
          }
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setOrders(data.orders ?? []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white/60 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm text-center border border-[var(--color-gold)]/10">
        <p className="text-4xl mb-3">📦</p>
        <h3 className="font-display text-xl text-[var(--color-accent)] mb-2">
          {error ? "Tidak dapat memuat pesanan" : "Belum ada pesanan"}
        </h3>
        <p className="font-body text-sm text-[var(--color-muted)] mb-6">
          {error
            ? "Backend Medusa belum terhubung. Pesanan akan muncul setelah backend aktif."
            : "Belum ada pembelian. Lihat buku, workshop, dan sesi coaching tersedia."}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-body text-sm rounded-xl hover:bg-[var(--color-gold)] transition-colors"
        >
          Lihat Produk →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusInfo = STATUS_LABEL[order.status] ?? {
          label: order.status,
          color: "bg-gray-100 text-gray-600",
        };
        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-gold)]/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-body text-xs text-[var(--color-muted)]">
                  Pesanan #{order.display_id}
                </p>
                <p className="font-body text-xs text-[var(--color-muted)]">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-body font-medium px-3 py-1 rounded-full ${statusInfo.color}`}
                >
                  {statusInfo.label}
                </span>
                <p className="font-display text-lg text-[var(--color-gold)]">
                  {formatIDR(order.total)}
                </p>
              </div>
            </div>

            <ul className="space-y-1">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between font-body text-sm"
                >
                  <span className="text-[var(--color-accent)]">
                    {item.title}
                    {item.quantity > 1 && (
                      <span className="text-[var(--color-muted)] ml-1">×{item.quantity}</span>
                    )}
                  </span>
                  <span className="text-[var(--color-muted)]">{formatIDR(item.unit_price)}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
