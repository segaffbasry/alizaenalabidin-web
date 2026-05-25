"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

interface EventHeroProps {
  event: {
    name: string;
    tagline: string;
    date: string;
    venue: string;
    productHandle: string;
    accentColor: string;
    bgFrom: string;
    heroImage: string;
  };
}

export default function EventHero({ event }: EventHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Bg */}
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${event.heroImage}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${event.bgFrom}ee 0%, ${event.bgFrom}99 60%, transparent 100%)`,
          }}
        />
      </motion.div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.35em] uppercase mb-5 font-body"
          style={{ color: event.accentColor }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        >
          {event.tagline}
        </motion.p>

        <motion.h1
          className="font-display text-6xl md:text-8xl text-white mb-6 leading-[0.95]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.35 }}
        >
          {event.name}
        </motion.h1>

        {/* Event meta chips */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
        >
          <Chip icon="📅" label={event.date} color={event.accentColor} />
          <Chip icon="📍" label={event.venue} color={event.accentColor} />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.65 }}
        >
          <Link
            href={`/products/${event.productHandle}`}
            className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-[var(--color-accent)] rounded-xl transition-colors"
            style={{ backgroundColor: event.accentColor }}
          >
            Daftar Sekarang
          </Link>
          <a
            href="#tentang"
            className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
          >
            Pelajari Lebih Lanjut
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function Chip({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm font-body text-sm text-white border"
      style={{ borderColor: `${color}40` }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
