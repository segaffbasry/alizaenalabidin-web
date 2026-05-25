"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";

export default function AboutCta() {
  return (
    <section className="py-28 px-6 bg-[var(--color-primary)]">
      <SectionReveal className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] font-body mb-4">
          Mulai Perjalananmu
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-accent)] mb-6 leading-tight">
          Siap untuk merevisi hidupmu bersama Ali?
        </h2>
        <p className="font-body text-[var(--color-muted)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Bergabunglah dalam workshop, baca bukunya, atau mulai dengan sesi
          coaching pribadi — pilihannya ada di tanganmu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/1on1-coaching-session"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-body font-medium rounded-xl hover:bg-[var(--color-gold)] transition-colors"
          >
            Book Sesi Coaching
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-body font-medium rounded-xl hover:bg-[var(--color-accent)] hover:text-white transition-colors"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}
