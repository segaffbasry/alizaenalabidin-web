"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const ease = (t: number) => 1 - Math.pow(2, -10 * t);

const BROWN = "rgb(56, 40, 30)";

/* ─── data ─────────────────────────────────────────────────── */

const BENEFITS = [
  {
    title: "Unlock the Formula for Manifestation That Actually Works",
    body: (
      <>
        Discover the <strong>science-backed and energetically proven</strong> method to align your
        thoughts, emotions, and actions, so you can attract what you want{" "}
        <strong>faster and with less effort</strong>.
      </>
    ),
  },
  {
    title: "Activate Your Manifestation Power in Real-Time",
    body: (
      <>
        No more waiting. <strong>You'll experience powerful, hands-on exercises</strong> that{" "}
        <strong>shift your energy instantly</strong>. Feel your reality change as you reprogram your
        subconscious mind.
      </>
    ),
  },
  {
    title: "Break Free from Hidden Blocks & Limitations",
    body: (
      <>
        You're not stuck. You're just running outdated programs. Learn how to{" "}
        <strong>
          rewire deep-rooted beliefs, dissolve fear and doubt, and install a mindset of unlimited
          possibilities
        </strong>
        .
      </>
    ),
  },
  {
    title: "Walk Away with a Manifestation Blueprint for Life",
    body: (
      <>
        No guessing, no confusion. You'll leave with a{" "}
        <strong>clear, personalized step-by-step plan</strong> to{" "}
        <strong>keep your momentum strong</strong> and manifest your dream life long after the
        workshop ends.
      </>
    ),
  },
];

const VIDEOS = [
  { file: "/videos/mindful.mp4",  label: "YOU ARE ALWAYS MANIFESTING" },
  { file: "/videos/mindful2.mp4", label: "REWIRING YOUR REALITY" },
  { file: "/videos/mindful3.mp4", label: "IT'S OK TO BE SKEPTICAL" },
  { file: "/videos/mindful4.mp4", label: "LEARNING MINDFUL MANIFESTATION" },
];

const DAYS = [
  {
    day: "DAY 1",
    title: "The Science of\nManifestation",
    desc: "Discover the science behind how manifestation works. Through insights from neuroscience and quantum physics, gain practical tools to rewire your brain, shift old patterns, and set the foundation for conscious manifestation.",
    img: "/images/mindful-stock-3.webp",
  },
  {
    day: "DAY 2",
    title: "Spiritual Framework\n& Energy Alignment",
    desc: "Unlock the spiritual principles that power manifestation. Learn how to elevate your energy to match the frequency of your desires and experience powerful guided techniques to shift your energy and attract effortlessly.",
    img: "/images/mindful stock-4.webp",
  },
  {
    day: "DAY 3",
    title: "Sustaining Manifestation\nMomentum & Action",
    desc: "Create your personalized Manifestation Blueprint to stay aligned with your goals and overcome resistance. Learn practical strategies to maintain momentum, take inspired action, and sustain the results long after the workshop ends.",
    img: "/images/mindful-stock 5.webp",
  },
];

/* ─── page ──────────────────────────────────────────────────── */

export default function MindfulManifestationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  function scrollToNext() {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f0eb",
        }}
      >
        {/* Hero image — no parallax */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/images/mindful top page.png"
            alt=""
            aria-hidden
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        {/* Bottom gradient — blends hero into next section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", zIndex: 2,
          background: "linear-gradient(to bottom, transparent, #ffffff)",
          pointerEvents: "none",
        }} />

        <div
          style={{
            position: "relative", zIndex: 3, textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img
              src="/images/logo mindful.avif"
              alt="Mindful Manifestation"
              style={{ width: "clamp(320px, 52vw, 720px)", height: "auto", display: "block" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 24,
              lineHeight: "34px", color: "rgb(17,17,20)", marginTop: 24, marginBottom: 32,
              maxWidth: 640, textAlign: "center",
            }}
          >
            Join our 3-day immersive workshop and transform your life
          </motion.p>

          <motion.a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block", padding: "16px 40px",
              background: "rgb(94,52,36)", color: "#fff",
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16,
              letterSpacing: "0.06em", textDecoration: "none", borderRadius: 999,
            }}
          >
            SECURE YOUR SPOT NOW
          </motion.a>
        </div>

        {/* Bottom bar — desktop: date — line — arrow — line — venue */}
        <div
          className="hidden sm:flex"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            alignItems: "center", padding: "0 48px 32px", gap: 24, zIndex: 4,
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(84,79,71)", whiteSpace: "nowrap" }}>
            1-3 May 2026
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(84,79,71,0.3)" }} />
          <button
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            style={{
              width: 48, height: 48, borderRadius: "50%", background: "rgba(94,52,36,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              border: "none", cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9l6 6 6-6" stroke="rgb(94,52,36)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ flex: 1, height: 1, background: "rgba(84,79,71,0.3)" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(84,79,71)", whiteSpace: "nowrap" }}>
            Plaza 51, Bintaro
          </span>
        </div>

        {/* Bottom bar — mobile: stacked */}
        <div
          className="flex sm:hidden"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            flexDirection: "column", alignItems: "center", gap: 10,
            padding: "0 24px 24px", zIndex: 4,
          }}
        >
          <div style={{ width: "100%", height: 1, background: "rgba(84,79,71,0.3)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "rgb(84,79,71)" }}>
              1-3 May 2026
            </span>
            <button
              onClick={scrollToNext}
              aria-label="Scroll to next section"
              style={{
                width: 40, height: 40, borderRadius: "50%", background: "rgba(94,52,36,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "none", cursor: "pointer", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9l6 6 6-6" stroke="rgb(94,52,36)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "rgb(84,79,71)" }}>
              Plaza 51, Bintaro
            </span>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS MINDFUL MANIFESTATION ════════════════════ */}
      <section ref={nextSectionRef} style={{ background: "#fff", padding: "clamp(48px,8vw,80px) clamp(20px,6vw,80px) 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(40px,6vw,80px)" }}>

          {/* Row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start gap-8 sm:gap-16"
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 32px)", color: "#111", margin: "0 0 20px", lineHeight: 1.25 }}>
                What is <span style={{ textTransform: "uppercase" }}>MINDFUL MANIFESTATION</span>?
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.5vw,16px)", color: "#333", lineHeight: 1.75, margin: 0 }}>
                <strong>This isn&apos;t your ordinary workshop.</strong> It&apos;s a transformational 3-day experience designed for purpose-driven individuals ready to <strong>unlock their full potential</strong>. Learn how to <em>overcome mental blocks, align your energy, and manifest the life you&apos;ve always envisioned</em>.
              </p>
            </div>
            <div style={{ width: "clamp(160px,25vw,260px)", flexShrink: 0, borderRadius: 16, overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="/images/mindful-stock1.avif" alt="Mindful Manifestation" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-16"
          >
            <div style={{ width: "clamp(160px,25vw,260px)", flexShrink: 0, borderRadius: 16, overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="/images/mindful-stock 2.avif" alt="Science and Spirituality" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.5vw,16px)", color: "#333", lineHeight: 1.75, margin: 0 }}>
                Unlike other manifestation programs, this workshop <strong>dives deeper into the intersection of science and spirituality</strong>. You&apos;ll not only learn how manifestation works but also why it works—through <em>neuroscience, energy principles, and practical application</em>. Plus, our intimate setting ensures personalized attention, making this an exclusive, <em>results-driven experience</em>.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ WHAT YOU'LL EXPERIENCE ════════════════════════════ */}
      <section style={{ background: "#fff", padding: "clamp(48px,8vw,100px) clamp(20px,6vw,80px)" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(24px,3vw,42px)", color: "#111", textAlign: "center", margin: "0 0 clamp(40px,6vw,80px)" }}
        >
          What you'll <strong>EXPERIENCE</strong>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,440px),1fr))", gap: "clamp(32px,5vw,64px) clamp(24px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
          {BENEFITS.map(({ title, body }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }}>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(15px,1.5vw,18px)", color: "#111", margin: "0 0 12px", lineHeight: 1.35 }}>{title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(13px,1.3vw,15px)", color: "rgb(90,85,80)", lineHeight: 1.75, margin: 0 }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ WHAT THEY SAY — VIDEO TESTIMONIALS ═══════════════ */}
      <section style={{ background: "#fff", padding: "clamp(40px,6vw,80px) clamp(20px,6vw,80px) clamp(48px,8vw,100px)" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(24px,3vw,42px)", color: "#111", textAlign: "center", margin: "0 0 40px" }}
        >
          What they <strong>SAY</strong>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,180px),1fr))", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {VIDEOS.map(({ file, label }, i) => (
            <motion.div
              key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              style={{ borderRadius: 12, overflow: "hidden", background: "#111", aspectRatio: "9/16", position: "relative", display: "flex", flexDirection: "column" }}
            >
              <video src={file} controls playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 16px 24px", pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 13, color: "#fff", textAlign: "center", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ THE JOURNEY ═══════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "clamp(40px,6vw,80px) clamp(20px,6vw,80px) clamp(48px,8vw,100px)", borderTop: "1px solid #f0ebe2" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(28px,4vw,52px)", color: "#111", margin: "0 0 40px" }}
        >
          The <strong>JOURNEY</strong>
        </motion.h2>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
          {[
            { label: "DATE, TIME", value: "Friday–Sunday, 1–3 May 2026\n9am – 6pm" },
            { label: "VENUE", value: "Plaza 51, Bintaro, Tangerang Selatan", link: "https://maps.app.goo.gl/6QMSGLj2MVkqV5um7", linkText: "Maps: https://maps.app.goo.gl/6QMSGLj2MVkqV5um7" },
          ].map(({ label, value, link, linkText }) => (
            <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-0">
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: "#111", minWidth: 160, paddingTop: 2 }}>{label}</span>
              <div>
                {value.split("\n").map((line, i) => (
                  <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#444", margin: "0 0 2px" }}>{line}</p>
                ))}
                {link && <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#444", display: "block", wordBreak: "break-all" }}>{linkText}</a>}
              </div>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {DAYS.map(({ day, title, desc, img }, i) => (
            <motion.div
              key={day} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              style={{ background: "#f7f4f0", borderRadius: 16, overflow: "hidden" }}
            >
              {/* ── Mobile: top-bottom stack ── */}
              <div className="flex flex-col sm:hidden">
                <div style={{ aspectRatio: "16/7", overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px 20px 8px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#111", margin: "0 0 4px", letterSpacing: "0.05em" }}>{day}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16, color: "#111", margin: 0, whiteSpace: "pre-line", lineHeight: 1.35 }}>{title}</p>
                </div>
                <div style={{ padding: "8px 20px 20px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>

              {/* ── Desktop: left-right row ── */}
              <div className="hidden sm:flex items-center" style={{ gap: 0 }}>
                <div style={{ padding: "clamp(20px,4vw,40px)", minWidth: "clamp(120px,18vw,200px)", flexShrink: 0 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#111", margin: "0 0 6px" }}>{day}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(14px,1.5vw,18px)", color: "#111", margin: 0, whiteSpace: "pre-line", lineHeight: 1.35 }}>{title}</p>
                </div>
                <div style={{ flex: 1, padding: "clamp(16px,3vw,40px) clamp(16px,3vw,40px) clamp(16px,3vw,40px) 0" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(13px,1.3vw,15px)", color: "#555", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
                <div style={{ width: 120, height: 120, flexShrink: 0, margin: "0 24px 0 0", borderRadius: 12, overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "clamp(48px,8vw,100px) clamp(20px,6vw,80px)" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(26px,4.5vw,60px)", color: BROWN, margin: "0 0 16px", maxWidth: 600 }}
        >
          Your new reality, starts here!
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.5vw,16px)", color: "rgb(90,85,80)", margin: "0 0 4px" }}>This isn&apos;t just a workshop, it&apos;s your breakthrough moment.</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.5vw,16px)", color: "rgb(90,85,80)", margin: 0 }}>Spots are <strong>LIMITED</strong>. Secure yours now!</p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center"
          style={{ background: "#f0f0f0", borderRadius: 20, padding: "clamp(24px,4vw,40px) clamp(20px,4vw,48px)", gap: "clamp(24px,5vw,64px)" }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 17, color: "#111", margin: "0 0 16px" }}>Currently at Normal Price</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgb(80,80,80)", margin: "0 0 24px", lineHeight: 1.65 }}>Secure this price up until the next buy period, price valid until April 31st 2026</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "Early bird 1", note: "Until Feb 28th, IDR 7,7 mio" }, { label: "Early bird 2", note: "Until Mar 31st, IDR 8,8 mio" }].map(({ label, note }) => (
                <p key={label} style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgb(100,100,100)", margin: 0 }}>
                  <strong style={{ color: "#333" }}>{label}</strong> <span style={{ textDecoration: "line-through" }}>{note}</span>
                </p>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, width: "100%" }}>
            <div style={{ display: "inline-block", background: "rgba(94,190,178,0.22)", borderRadius: 6, padding: "5px 14px", marginBottom: 14 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: "rgb(30,130,120)", letterSpacing: "0.1em" }}>PRICE CHANGE SOON</span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: "#111", margin: "0 0 6px", lineHeight: 1.1 }}>IDR 9,9 Million</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgb(120,120,120)", margin: "0 0 24px" }}>Until April 31st</p>
            <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "16px 0", background: "rgb(56,40,30)", color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", textDecoration: "none", borderRadius: 999 }}>
              BUY NOW
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
