"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";

const STATS = [
  { value: 50000, suffix: "+", label: "Peserta Terdampak" },
  { value: 19, suffix: "+", label: "Kota di Indonesia" },
  { value: 5, suffix: "+", label: "Negara" },
  { value: 12, suffix: "", label: "Tahun Berpengalaman" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

export default function AboutStats() {
  return (
    <section className="bg-[var(--color-accent)] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] font-body mb-3">
            Dampak Nyata
          </p>
          <h2 className="font-display text-4xl text-white">
            Angka yang berbicara sendiri.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-5xl md:text-6xl text-[var(--color-gold)] mb-2">
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p className="font-body text-white/60 text-sm uppercase tracking-wider">
                {s.label}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
