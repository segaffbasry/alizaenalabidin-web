"use client";

import { SectionReveal } from "@/components/ui/section-reveal";

interface Outcome { icon: string; title: string; desc: string }
interface EventOutcomesProps {
  event: { outcomes: Outcome[]; accentColor: string };
}

export default function EventOutcomes({ event }: EventOutcomesProps) {
  return (
    <section className="py-20 px-6 bg-white/40">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body mb-3"
            style={{ color: event.accentColor }}
          >
            Yang Akan Kamu Dapatkan
          </p>
          <h2 className="font-display text-4xl text-[var(--color-accent)]">
            Transformasi nyata, bukan janji kosong.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {event.outcomes.map((o, i) => (
            <SectionReveal key={o.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{o.icon}</span>
                <h3 className="font-display text-xl text-[var(--color-accent)] mb-2">
                  {o.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed">
                  {o.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
