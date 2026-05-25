"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center text-center px-6">
      <div>
        <p className="text-6xl mb-6">😔</p>
        <h1 className="font-display text-3xl text-[var(--color-accent)] mb-3">
          Terjadi Kesalahan
        </h1>
        <p className="font-body text-[var(--color-muted)] mb-8 max-w-sm mx-auto leading-relaxed">
          Mohon maaf, ada sesuatu yang tidak berjalan dengan baik. Silakan coba
          lagi atau kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[var(--color-accent)] text-white font-body rounded-xl hover:bg-[var(--color-gold)] transition-colors"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-body rounded-xl hover:bg-[var(--color-accent)] hover:text-white transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-6 font-body text-xs text-[var(--color-muted)] opacity-50">
            Error digest: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
