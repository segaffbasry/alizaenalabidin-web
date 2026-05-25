"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

interface Faq { q: string; a: string }
interface EventFaqProps {
  event: { faqs: Faq[]; accentColor: string };
}

export default function EventFaq({ event }: EventFaqProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-[var(--color-accent)]">
      <div className="max-w-2xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase font-body text-[var(--color-gold)] mb-3">
            FAQ
          </p>
          <h2 className="font-display text-4xl text-white">
            Pertanyaan yang sering ditanya.
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {event.faqs.map((faq, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-start justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-body text-white font-medium leading-snug">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="text-[var(--color-gold)] text-xl mt-0.5 flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <p className="px-6 pb-5 font-body text-white/60 leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
