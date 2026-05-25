"use client";

import { SectionReveal } from "@/components/ui/section-reveal";

interface EventAboutProps {
  event: {
    about: { heading: string; paragraphs: string[] };
    accentColor: string;
    tagline: string;
  };
}

export default function EventAbout({ event }: EventAboutProps) {
  return (
    <section id="tentang" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionReveal>
          <p
            className="text-xs tracking-[0.3em] uppercase font-body mb-4"
            style={{ color: event.accentColor }}
          >
            {event.tagline}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-accent)] mb-10 leading-tight">
            {event.about.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-5">
          {event.about.paragraphs.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="font-body text-[var(--color-muted)] text-lg leading-relaxed">
                {p}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
