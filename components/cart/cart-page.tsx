"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, formatIDR } from "@/lib/store/cart-store";
import MidtransSnap from "@/components/checkout/midtrans-snap";

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout gagal");
      setSnapToken(data.snap_token);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20 flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="font-display text-3xl text-[var(--color-accent)] mb-3">
          Keranjang Kosong
        </h1>
        <p className="font-body text-[var(--color-muted)] mb-8">
          Belum ada produk yang ditambahkan.
        </p>
        <Link
          href="/products"
          className="bg-[var(--color-accent)] text-white font-body font-medium px-8 py-3 rounded-xl hover:bg-[var(--color-gold)] transition-colors"
        >
          Lihat Produk
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--color-accent)] mb-8">
          Keranjang Belanja
          <span className="ml-3 text-lg text-[var(--color-muted)] font-body font-normal">
            ({itemCount()} item)
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.variantId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
                >
                  {/* Thumbnail */}
                  {item.thumbnail && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--color-primary)]">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base text-[var(--color-accent)] truncate">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-muted)] mb-2">
                      {item.variantTitle}
                    </p>
                    <p className="font-display text-[var(--color-gold)] font-semibold">
                      {formatIDR(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-xs font-body text-red-400 hover:text-red-600 transition-colors"
                    >
                      Hapus
                    </button>
                    <div className="flex items-center gap-1 bg-[var(--color-primary)] rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-body text-sm font-medium text-[var(--color-accent)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h2 className="font-display text-xl text-[var(--color-accent)] mb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between font-body text-sm">
                    <span className="text-[var(--color-muted)] truncate flex-1 mr-2">
                      {item.title}
                      {item.quantity > 1 && ` ×${item.quantity}`}
                    </span>
                    <span className="text-[var(--color-accent)] flex-shrink-0">
                      {formatIDR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-display text-lg text-[var(--color-accent)] mb-6">
                <span>Total</span>
                <span className="text-[var(--color-gold)]">{formatIDR(total())}</span>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4 font-body">
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-body font-medium hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkingOut ? "Memproses..." : "Bayar Sekarang"}
              </button>

              <p className="text-xs font-body text-center text-[var(--color-muted)] mt-3">
                Pembayaran aman via Midtrans
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Snap popup */}
      {snapToken && (
        <MidtransSnap
          snapToken={snapToken}
          onClose={() => setSnapToken(null)}
        />
      )}
    </main>
  );
}
