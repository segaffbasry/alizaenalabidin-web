"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

const CREDENTIALS = [
  "35+ countries",
  "CEO, Content & Publishing — Mizan",
  "CITIZEN 40 Under 40 — Marketeers",
  "Author, Uncover Your Unique Purpose",
];

export function AboutSummary() {
  return (
    <section
      style={{
        background: "#F5F0E8",
        padding: "clamp(64px, 9vw, 120px) clamp(24px, 8vw, 144px)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}
        className="about-summary-grid"
      >
        {/* ── Text ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOut }}
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              fontSize: 23,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6B8F8E",
              margin: "0 0 20px",
            }}
          >
            About Ali
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 400,
              fontSize: "clamp(26px, 3.4vw, 44px)",
              lineHeight: 1.25,
              color: "rgb(26,26,26)",
              margin: "0 0 24px",
            }}
          >
            Helping people find their purpose, heal their minds, and manifest
            the life they were made for.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-work-sans), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.7,
              color: "rgb(68,68,68)",
              margin: "0 0 28px",
              maxWidth: 520,
            }}
          >
            Ali Zaenal Abidin is a bestselling author, entrepreneur, and life
            transformation coach who blends science, spirituality, and
            psychology into a practical framework for change — already trusted
            by people across more than 35 countries.
          </motion.p>

          {/* Credentials */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              margin: "0 0 36px",
              padding: 0,
            }}
          >
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                style={{
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 13,
                  color: "rgb(90,84,78)",
                  border: "1px solid #d8cfc0",
                  borderRadius: 999,
                  padding: "6px 14px",
                }}
              >
                {c}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
          >
            <Link href="/tanya">
              <span
                className="group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 cursor-pointer select-none transition-colors duration-300 bg-[#6B8F8E] hover:bg-[#1A1A1A]"
                style={{ borderRadius: "16px" }}
              >
                <span className="font-body font-medium text-white text-base whitespace-nowrap">
                  Chat with Ali
                </span>
                <span
                  className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] group-hover:bg-[#6B8F8E] transition-colors duration-300 flex-shrink-0"
                  style={{ borderRadius: "10px" }}
                >
                  <ArrowRight size={17} className="text-white" />
                </span>
              </span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-3 font-body font-medium text-base transition-colors duration-300"
              style={{
                color: "#1A1A1A",
                border: "1px solid #1A1A1A",
                borderRadius: "16px",
              }}
            >
              Read Ali&apos;s full story
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>

        {/* ── Photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="about-summary-photo"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "#e8e0d3",
            aspectRatio: "4 / 5",
          }}
        >
          <img
            src="/images/ali-about.avif"
            alt="Ali Zaenal Abidin"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      <style>{`
        .about-summary-grid { grid-template-columns: 1fr; }
        @media (min-width: 860px) {
          .about-summary-grid { grid-template-columns: 1.1fr 0.9fr; }
        }
        @media (max-width: 859px) {
          .about-summary-photo { max-width: 420px; margin: 0 auto; width: 100%; }
        }
      `}</style>
    </section>
  );
}
