"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Only pins well outside the center text area (approx 25–75% horizontal, 25–75% vertical)
const PINS = [
  { top: "10%", left: "8%" },
  { top: "20%", left: "19%" },
  { top: "6%",  left: "42%" },
  { top: "8%",  left: "78%" },
  { top: "15%", left: "88%" },
  { top: "38%", left: "4%" },
  { top: "62%", left: "80%" },
  { top: "78%", left: "14%" },
  { top: "83%", left: "67%" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const countries = useCountUp(37, 2000, started);
  const cities = useCountUp(110, 2200, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* World map background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/bg-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Ali location pins — only outer positions, away from center text */}
      {PINS.map((pin, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: pin.top,
            left: pin.left,
            animation: started ? `pin-pop 0.5s ease ${0.1 + i * 0.12}s both` : "none",
          }}
        >
          <img
            src="/images/ali location pin.webp"
            alt=""
            style={{ width: 90, height: 112, objectFit: "contain", display: "block" }}
          />
        </div>
      ))}

      {/* Center text */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 7vw, 64px)",
            lineHeight: "normal",
            color: "rgb(38, 38, 38)",
            margin: 0,
          }}
        >
          <span style={{ color: "#797a74" }}>{countries}</span>+ COUNTRIES
        </p>
        <p
          style={{
            fontFamily: "var(--font-work-sans), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 2.5vw, 20px)",
            lineHeight: "20px",
            color: "rgb(22, 22, 32)",
            margin: "8px 0",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          and
        </p>
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: 64,
            lineHeight: "normal",
            color: "rgb(38, 38, 38)",
            margin: 0,
          }}
        >
          <span style={{ color: "#797a74" }}>{cities}</span>+ CITIES
        </p>
        <p
          style={{
            fontFamily: "var(--font-work-sans), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2.2vw, 20px)",
            lineHeight: "1.6",
            color: "rgb(22, 22, 32)",
            maxWidth: 520,
            margin: "24px auto 0",
          }}
        >
          Ali&apos;s journey has crossed borders and cultures, creating meaningful connections and lasting communities around the world.
        </p>
      </div>

      <style>{`
        @keyframes pin-pop {
          0%   { opacity: 0; transform: translateY(-24px) scale(0.4); }
          65%  { transform: translateY(6px) scale(1.08); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
