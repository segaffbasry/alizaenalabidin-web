"use client";

import { SectionReveal } from "@/components/ui/section-reveal";

// Media logos rendered as styled text — swap for <Image> when real assets are available
const MEDIA = [
  { name: "Kompas", style: "font-display text-2xl tracking-wider" },
  { name: "Tempo", style: "font-display text-2xl italic" },
  { name: "IDN Times", style: "font-body text-xl font-bold" },
  { name: "Detik", style: "font-display text-2xl" },
  { name: "CNN Indonesia", style: "font-body text-lg font-bold tracking-tight" },
  { name: "Liputan 6", style: "font-body text-xl font-medium" },
];

export default function AboutMedia() {
  return (
    <section className="py-20 px-6 border-t border-[var(--color-gold)]/10">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <p className="font-body text-sm text-[var(--color-muted)] uppercase tracking-widest">
            Diliput oleh
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {MEDIA.map((m) => (
              <span
                key={m.name}
                className={`${m.style} text-[var(--color-accent)] opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-default select-none`}
              >
                {m.name}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
