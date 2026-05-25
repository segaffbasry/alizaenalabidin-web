"use client";

import { SectionReveal } from "@/components/ui/section-reveal";

interface Testimonial { name: string; role: string; text: string }
interface EventTestimonialsProps {
  event: { testimonials: Testimonial[]; accentColor: string };
}

export default function EventTestimonials({ event }: EventTestimonialsProps) {
  return (
    <section className="py-24 px-6 bg-white/40">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body mb-3"
            style={{ color: event.accentColor }}
          >
            Kata Mereka
          </p>
          <h2 className="font-display text-4xl text-[var(--color-accent)]">
            Perubahan nyata dari alumni.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col h-full">
                {/* Quote mark */}
                <span
                  className="font-display text-5xl leading-none mb-4 block"
                  style={{ color: `${event.accentColor}50` }}
                >
                  "
                </span>
                <p className="font-body text-[var(--color-muted)] leading-relaxed flex-1 mb-6">
                  {t.text}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-display text-base text-[var(--color-accent)]">{t.name}</p>
                  <p className="font-body text-xs text-[var(--color-muted)]">{t.role}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
