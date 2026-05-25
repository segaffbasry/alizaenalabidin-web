import Link from "next/link";

export default function CheckoutPendingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center text-center px-6">
      <div>
        <p className="text-6xl mb-6">⏳</p>
        <h1 className="font-display text-3xl text-[var(--color-accent)] mb-3">
          Menunggu Pembayaran
        </h1>
        <p className="font-body text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
          Pesananmu sedang diproses. Kami akan mengirim konfirmasi setelah pembayaran dikonfirmasi.
        </p>
        <Link
          href="/"
          className="bg-[var(--color-accent)] text-white font-body font-medium px-8 py-3 rounded-xl hover:bg-[var(--color-gold)] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
