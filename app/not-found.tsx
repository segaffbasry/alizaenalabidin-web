import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center text-center px-6">
      <div>
        <p className="font-display text-8xl text-[var(--color-gold)]/30 mb-2">404</p>
        <h1 className="font-display text-3xl text-[var(--color-accent)] mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="font-body text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
          Halaman yang kamu cari tidak ada atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white font-body rounded-xl hover:bg-[var(--color-gold)] transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
