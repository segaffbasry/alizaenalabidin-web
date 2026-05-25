"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

interface DaySchedule { day: string; title: string; items: string[] }
interface EventScheduleProps {
  event: { schedule: DaySchedule[]; accentColor: string };
}

export default function EventSchedule({ event }: EventScheduleProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body mb-3"
            style={{ color: event.accentColor }}
          >
            Agenda
          </p>
          <h2 className="font-display text-4xl text-[var(--color-accent)]">
            4 hari yang akan mengubah segalanya.
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {event.schedule.map((day, i) => (
            <SectionReveal key={day.day} delay={i * 0.05}>
              <div className="border border-[var(--color-gold)]/20 rounded-2xl overflow-hidden bg-white/50">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/60 transition-colors"
                  onClick={() => setOpenDay(openDay === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${event.accentColor}18`,
                        color: event.accentColor,
                      }}
                    >
                      {day.day}
                    </span>
                    <span className="font-display text-lg text-[var(--color-accent)]">
                      {day.title}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: openDay === i ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="text-[var(--color-muted)] text-xl ml-4 flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openDay === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                    >
                      <ul className="px-6 pb-5 space-y-2 border-t border-[var(--color-gold)]/10 pt-4">
                        {day.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: event.accentColor }}
                            />
                            <span className="font-body text-[var(--color-muted)] text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
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
