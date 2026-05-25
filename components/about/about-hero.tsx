"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ─── chapter data ─────────────────────────────────────────── */
const CHAPTERS = [
  {
    eyebrow: "Life Purpose · Mental Health · Manifestation",
    text: "Ali is a writer, entrepreneur, and expert in helping people find their life purpose, manage their mental health, and maximize potential for manifestation. He combines science, spirituality, and psychology to create a self-development framework that is scientific, practical, and transformative.",
    isQuote: false,
  },
  {
    eyebrow: "A Global Journey",
    text: "Ali has traveled to more than 35 countries, serving individuals from various backgrounds to help them transform with a practical, profound, and non-preachy approach. His latest book, Uncover Your Unique Purpose, is the world's first research-based international book on finding and living one's life purpose — presenting an approach that is both systematic and personal for self-discovery.",
    isQuote: false,
  },
  {
    eyebrow: "Leadership & Innovation",
    text: "Ali also serves as the CEO of the Content & Publishing Group at Mizan. He bridges creativity, leadership, and innovation to build a culture of growth oriented toward Mizan's mission as a curator of enlightenment.",
    isQuote: false,
  },
  {
    eyebrow: "Recognition",
    text: "Ali was awarded the CITIZEN 40 UNDER 40 award by Marketeers Magazine for his contributions to society and humanity. He is also a keynote speaker at HR Week Asia and continues to share his insights through various platforms.",
    isQuote: false,
  },
  {
    eyebrow: null,
    text: `"Healing can't happen if you keep hurting yourself."`,
    isQuote: true,
  },
  {
    eyebrow: null,
    text: `"It's confusing and hard to win the game of life if you don't know the purpose of the game."`,
    isQuote: true,
  },
];

/* ─── word-by-word reveal ───────────────────────────────────── */
function RevealText({
  text,
  isQuote,
  progress,
  initiallyRevealed = false,
}: {
  text: string;
  isQuote: boolean;
  progress: MotionValue<number>;
  initiallyRevealed?: boolean;
  chapterVisible?: MotionValue<number>;
}) {
  const words = text.split(" ");
  const REVEAL_END = 0.72;

  return (
    <p
      style={{
        fontFamily: "var(--font-playfair), serif",
        fontWeight: 400,
        fontSize: isQuote ? "clamp(22px, 3vw, 46px)" : "clamp(14px, 1.25vw, 19px)",
        lineHeight: isQuote ? 1.28 : 1.8,
        color: "rgb(26,26,26)",
        fontStyle: isQuote ? "italic" : "normal",
        margin: 0,
        maxWidth: isQuote ? 560 : 520,
      }}
    >
      {words.map((word, i) => {
        // Already revealed: words start fully visible, no animation needed
        const wordStart = initiallyRevealed ? -1 : (i / words.length) * REVEAL_END;
        const wordEnd   = initiallyRevealed ? -0.5 : wordStart + 0.06;
        const opacity = useTransform(progress, [wordStart, wordEnd], [initiallyRevealed ? 1 : 0.12, 1]);
        const y       = useTransform(progress, [wordStart, wordEnd], [initiallyRevealed ? 0 : 14, 0]);

        return (
          <motion.span
            key={i}
            style={{ opacity, y, display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

/* ─── single chapter panel ──────────────────────────────────── */
function ChapterPanel({
  chapter,
  globalProgress,
  index,
  total,
}: {
  chapter: typeof CHAPTERS[0];
  globalProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const chapterSize = 1 / total;
  const start = index * chapterSize;
  const end = start + chapterSize;
  const fadeIn = start + chapterSize * 0.06;
  const fadeOut = end - chapterSize * 0.08;

  // chapter 0 starts fully visible; all others fade in
  const initialOpacity = index === 0 ? 1 : 0;
  const initialY       = index === 0 ? 0 : 36;

  const panelOpacity = useTransform(
    globalProgress,
    [start, fadeIn, fadeOut, end],
    [initialOpacity, 1, 1, 0]
  );
  const panelY = useTransform(
    globalProgress,
    [start, fadeIn, fadeOut, end],
    [initialY, 0, 0, -36]
  );

  // chapter-local progress 0→1 (for word reveal)
  const chapterProgress = useTransform(
    globalProgress,
    [start, end],
    [0, 1]
  );

  return (
    <motion.div
      style={{
        opacity: panelOpacity,
        y: panelY,
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {chapter.eyebrow && (
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B8F8E",
            margin: 0,
          }}
        >
          {chapter.eyebrow}
        </p>
      )}

      <RevealText
        text={chapter.text}
        isQuote={chapter.isQuote}
        progress={chapterProgress}
        initiallyRevealed={index === 0}
        chapterVisible={panelOpacity}
      />
    </motion.div>
  );
}

/* ─── progress dots ─────────────────────────────────────────── */
function ProgressDots({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: total }).map((_, i) => {
        const s = i / total;
        const e = (i + 1) / total;
        const scale = useTransform(progress, [s, s + 0.05, e - 0.05, e], [1, 1.7, 1.7, 1]);
        const bg = useTransform(
          progress,
          [s, s + 0.05, e - 0.05, e],
          ["#C8A96E33", "#C8A96E", "#C8A96E", "#C8A96E33"]
        );
        return (
          <motion.span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: bg,
              scale,
              display: "block",
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── main export ───────────────────────────────────────────── */
export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 18 });

  const photoY = useTransform(smooth, [0, 1], ["0%", "7%"]);
  const scrollHintOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${CHAPTERS.length * 100}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#F5F0E8",
          display: "flex",
        }}
      >
        {/* ── Left ── */}
        <div
          className="relative flex flex-col justify-center w-full md:w-[52%]"
          style={{ padding: "0 clamp(24px, 6vw, 64px) 0 clamp(48px, 10vw, 144px)" }}
        >
          {/* About Ali label */}
          <p
            className="absolute"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              fontSize: 23,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgb(68,68,68)",
              top: "clamp(80px, 12vh, 120px)",
              left: "clamp(24px, 10vw, 144px)",
              margin: 0,
            }}
          >
            About Ali
          </p>

          {/* Progress dots */}
          <div
            className="absolute hidden sm:block"
            style={{
              left: "clamp(20px, 5vw, 96px)",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ProgressDots progress={smooth} total={CHAPTERS.length} />
          </div>

          {/* Chapter panels */}
          <div className="relative" style={{ height: "clamp(320px, 50vh, 460px)", marginTop: "clamp(-140px, -15vh, -80px)" }}>
            {CHAPTERS.map((chapter, i) => (
              <ChapterPanel
                key={i}
                chapter={chapter}
                globalProgress={smooth}
                index={i}
                total={CHAPTERS.length}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <motion.p
            style={{
              position: "absolute",
              bottom: "clamp(24px, 5vh, 48px)",
              left: "clamp(24px, 10vw, 144px)",
              fontFamily: "var(--font-playfair), serif",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgb(150,140,130)",
              opacity: scrollHintOpacity,
              margin: 0,
            }}
          >
            Scroll to explore
          </motion.p>
        </div>

        {/* ── Right — photo ── */}
        <div
          className="hidden md:block"
          style={{
            width: "48%",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #F5F0E8 0%, transparent 14%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <motion.img
            src="/images/ali-about.avif"
            alt="Ali Zaenal Abidin"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: "74%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom right",
              y: photoY,
            }}
          />
        </div>

        {/* ── Mobile photo — centered bottom ── */}
        <div
          className="md:hidden absolute bottom-0 left-1/2 pointer-events-none"
          style={{ width: "80%", transform: "translateX(-50%)", zIndex: 0 }}
        >
          <motion.img
            src="/images/ali-about.avif"
            alt="Ali Zaenal Abidin"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              objectPosition: "bottom center",
              display: "block",
              y: photoY,
            }}
          />
        </div>
      </div>
    </div>
  );
}
