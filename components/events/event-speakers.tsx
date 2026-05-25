"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";

export default function EventSpeakers() {
  return (
    <section className="py-20 px-6 bg-[var(--color-accent)]">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase font-body text-[var(--color-gold)] mb-3">
            Fasilitator
          </p>
          <h2 className="font-display text-4xl text-white">
            Dipimpin langsung oleh Ali.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar */}
            <div className="relative w-40 h-40 flex-shrink-0 rounded-full overflow-hidden bg-[var(--color-gold)]/20">
              <Image
                src="/ali-portrait.jpg"
                alt="Ali Zaenal Abidin"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-5xl text-[var(--color-gold)]">A</span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-display text-3xl text-white mb-1">Ali Zaenal Abidin</h3>
              <p className="font-body text-[var(--color-gold)] text-sm mb-4">
                Life Transformation Coach · Penulis Bestseller · Speaker
              </p>
              <p className="font-body text-white/65 leading-relaxed">
                Dengan lebih dari 12 tahun pengalaman memandu transformasi hidup,
                Ali telah bekerja dengan lebih dari 50.000 individu di Indonesia dan
                Asia Tenggara. Pendekatannya menggabungkan psikologi positif, filosofi
                timur, dan metodologi coaching yang terbukti secara empiris — semuanya
                disajikan dengan cara yang hangat, personal, dan sangat relevan.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
