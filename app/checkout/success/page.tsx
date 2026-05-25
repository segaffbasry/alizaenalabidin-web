import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center text-center px-6">
      <div>
        <p className="text-6xl mb-6">🎉</p>
        <h1 className="font-display text-3xl text-[var(--color-accent)] mb-3">
          Pembayaran Berhasil!
        </h1>
        <p className="font-body text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
          Terima kasih atas pembelianmu. Konfirmasi pesanan telah dikirim ke emailmu.
        </p>
        <Link
          href="/products"
          className="bg-[var(--color-gold)] text-white font-body font-medium px-8 py-3 rounded-xl hover:bg-[var(--color-accent)] transition-colors"
        >
          Lihat Produk Lainnya
        </Link>
      </div>
    </main>
  );
}
