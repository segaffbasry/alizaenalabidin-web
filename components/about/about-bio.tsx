"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";

const MILESTONES = [
  { year: "2011", text: "Memulai perjalanan sebagai trainer motivasi lokal di Bandung." },
  { year: "2014", text: "Merilis buku pertama yang terjual lebih dari 20.000 eksemplar dalam setahun." },
  { year: "2017", text: "Mendirikan program Revisi Hidup — intensive workshop life design pertama di Indonesia." },
  { year: "2020", text: "Bertransisi ke format hybrid; menjangkau peserta di 5+ negara Asia Tenggara." },
  { year: "2024", text: "Meluncurkan Mindful Manifestation — menggabungkan mindfulness timur dengan life design barat." },
];

export default function AboutBio() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portrait */}
        <SectionReveal>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-accent)]">
              <Image
                src="/ali-portrait.jpg"
                alt="Ali Zaenal Abidin"
                fill
                className="object-cover"
                onError={() => {}}
              />
              {/* Fallback gradient when image missing */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[#2d2d2d] flex items-end p-8">
                <p className="font-display text-3xl text-[var(--color-gold)]">Ali Zaenal Abidin</p>
              </div>
            </div>
            {/* Gold accent block */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-gold)]/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-[var(--color-gold)]/30 rounded-xl -z-10" />
          </div>
        </SectionReveal>

        {/* Bio text */}
        <div className="space-y-8">
          <SectionReveal delay={0.1}>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] font-body mb-3">
              Siapa Ali?
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--color-accent)] leading-tight">
              Memandu manusia menemukan arah yang sesungguhnya.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="font-body text-[var(--color-muted)] leading-relaxed text-lg">
              Ali Zaenal Abidin bukan sekadar motivator. Ia adalah arsitek transformasi —
              seseorang yang percaya bahwa setiap orang lahir dengan tujuan unik yang menunggu
              untuk ditemukan, bukan diciptakan.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <p className="font-body text-[var(--color-muted)] leading-relaxed">
              Perjalanannya dimulai dari kegelisahan pribadi: setelah berhasil secara karier
              namun merasa hampa, Ali memulai pencarian panjang yang membawanya ke berbagai
              tradisi kebijaksanaan — dari filosofi Stoic hingga praktik mindfulness Asia,
              dari positive psychology hingga deep work. Hasilnya bukan sekadar framework,
              melainkan metodologi hidup yang telah membantu lebih dari 50.000 orang.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="font-body text-[var(--color-muted)] leading-relaxed">
              Misi Ali sederhana namun radikal: <em className="text-[var(--color-accent)] not-italic font-medium">membantu setiap orang hidup dengan
              disengaja</em> — bukan sekadar reaktif terhadap apa yang datang, tapi aktif merancang
              kehidupan yang selaras dengan nilai terdalam mereka.
            </p>
          </SectionReveal>

          {/* Timeline */}
          <SectionReveal delay={0.35}>
            <div className="pt-4 space-y-4">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-4">
                  <span className="font-display text-sm text-[var(--color-gold)] w-10 flex-shrink-0 pt-0.5">
                    {m.year}
                  </span>
                  <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed border-l border-[var(--color-gold)]/20 pl-4">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
