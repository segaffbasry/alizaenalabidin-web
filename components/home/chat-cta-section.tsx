"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

export function ChatCtaSection() {
  return (
    <section className="relative bg-[#F5F0E8] py-28 md:py-40 overflow-hidden">
      {/* Background decorative text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-display text-[18vw] font-bold text-[#1A1A1A]/[0.025] whitespace-nowrap leading-none">
          Tanya Ali
        </span>
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs tracking-[0.25em] uppercase text-[#6B6560]">
            AI Available Now
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-display text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] leading-tight mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          Ask Ali anything —<br />
          <span className="text-[#C8A96E]">1 to 10 questions,</span>
          <br />on us.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-[#6B6560] text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
        >
          Your first 10 questions are completely free — no account needed. After that, unlock
          unlimited access and deeper conversations with a simple subscription.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.35 }}
        >
          <Link href="/tanya">
            <motion.span
              className="inline-flex items-center h-14 px-8 text-sm font-medium bg-[#C8A96E] text-[#1A1A1A] cursor-pointer select-none"
              whileHover={{ scale: 1.04, backgroundColor: "#1A1A1A", color: "#F5F0E8" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Start Chatting Free
            </motion.span>
          </Link>
          <Link
            href="/login"
            className="text-sm text-[#6B6560] border-b border-[#6B6560]/40 pb-0.5 hover:text-[#C8A96E] hover:border-[#C8A96E] transition-colors"
          >
            Or login to your account →
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          className="mt-10 text-xs text-[#6B6560]/60 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
        >
          Trained on Ali&rsquo;s philosophy, books, and thousands of coaching sessions
        </motion.p>
      </div>
    </section>
  );
}
