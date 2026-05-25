"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useCartStore, formatIDR } from "@/lib/store/cart-store";

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: {
        onSuccess?: (result: unknown) => void;
        onPending?: (result: unknown) => void;
        onError?: (result: unknown) => void;
        onClose?: () => void;
      }) => void;
    };
  }
}

interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const EMPTY_FORM: CustomerForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPageClient() {
  const { items, total, itemCount, clearCart } = useCartStore();
  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = total();
  const count = itemCount();

  const set = (field: keyof CustomerForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handlePay = async () => {
    if (!form.firstName || !form.email) {
      setError("Nama depan dan email wajib diisi.");
      return;
    }
    if (!window.snap) {
      setError("Payment belum siap, coba refresh halaman.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
          },
          shipping_address: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            postal_code: form.postalCode,
            country_code: "ID",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout gagal");
      setLoading(false);
      window.snap.pay(data.snap_token, {
        onSuccess: () => { clearCart(); window.location.href = "/checkout/success"; },
        onPending: () => { clearCart(); window.location.href = "/checkout/pending"; },
        onError: () => { setError("Pembayaran gagal, silakan coba lagi."); },
        onClose: () => {},
      });
    } catch (err: unknown) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  if (count === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20 flex flex-col items-center justify-center text-center px-6">
        <p className="text-5xl mb-6">🛒</p>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 700, color: "#262626", marginBottom: 12 }}>
          Keranjang Kosong
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#6B6560", marginBottom: 32 }}>
          Tambahkan produk terlebih dahulu sebelum checkout.
        </p>
        <Link
          href="/products"
          style={{ backgroundColor: "#724233", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 500, padding: "12px 32px", borderRadius: 12 }}
        >
          Lihat Produk
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20">
      <Script
        src="https://app.midtrans.com/snap/snap.js"
        data-client-key="Mid-client-hK_oCh_9UNmzJLCc"
        data-environment="production"
        strategy="afterInteractive"
      />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 pt-8">
          <Link href="/products" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B6560" }} className="hover:text-[#724233] transition-colors">
            ← Lanjut belanja
          </Link>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 32, fontWeight: 700, color: "#262626", marginTop: 12 }}>
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left: Customer form */}
          <div className="space-y-5">
            {/* Contact */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 20 }}>
                Informasi Kontak
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Depan *" value={form.firstName} onChange={set("firstName")} placeholder="Ali" />
                <Field label="Nama Belakang" value={form.lastName} onChange={set("lastName")} placeholder="Zaenal" />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Field label="Email *" value={form.email} onChange={set("email")} placeholder="ali@email.com" type="email" />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B6560", marginTop: 5 }}>
                    📧 Untuk produk digital, tiket/file akan dikirim ke email ini.
                  </p>
                </div>
                <Field label="Nomor Telepon" value={form.phone} onChange={set("phone")} placeholder="+62 812 3456 7890" type="tel" />
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 4 }}>
                Alamat Pengiriman
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B6560", marginBottom: 20 }}>
                Opsional — diperlukan untuk produk fisik.
              </p>
              <Field label="Alamat" value={form.address} onChange={set("address")} placeholder="Jl. Contoh No. 1, RT 01/RW 02" />
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Kota" value={form.city} onChange={set("city")} placeholder="Jakarta" />
                <Field label="Kode Pos" value={form.postalCode} onChange={set("postalCode")} placeholder="12345" />
              </div>
            </section>
          </div>

          {/* Right: Order summary */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 20 }}>
                Ringkasan Pesanan
              </h2>

              {/* Items */}
              <ul className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                {items.map((item) => (
                  <li key={item.variantId} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#e8e3da] flex-shrink-0">
                      {item.thumbnail ? (
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#262626" }} className="line-clamp-1">
                        {item.title}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B6560" }}>
                        {item.variantTitle}{item.quantity > 1 && ` × ${item.quantity}`}
                      </p>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#262626", flexShrink: 0 }}>
                      {formatIDR(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B6560" }}>
                  <span>Subtotal ({count} item)</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B6560" }}>
                  <span>Pengiriman</span>
                  <span>Dihitung saat pembayaran</span>
                </div>
              </div>

              <div className="flex justify-between mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700, color: "#262626" }}>
                <span>Total</span>
                <span style={{ color: "#724233" }}>{formatIDR(subtotal)}</span>
              </div>

              {error && (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#dc2626", backgroundColor: "#fef2f2", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
                  {error}
                </p>
              )}

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-4 rounded-xl transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#724233", color: "white", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500 }}
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>

              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B6560", textAlign: "center", marginTop: 12 }}>
                Pembayaran aman via Midtrans · SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#262626", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #e0e0e0",
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          color: "#262626",
          outline: "none",
          backgroundColor: "white",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#724233")}
        onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
      />
    </div>
  );
}
