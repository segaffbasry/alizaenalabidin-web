"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Agnia Melianasari",
    role: "MC | Praktisi Public Speaking & Self Development",
    avatar: "/images/Agnia M.jpg",
    initials: "AM",
    bg: "#d4c5b0",
    text: "Bang Ali is not merely a coach or facilitator who happily shares life theories. He is present as an extension of God's hand who helps open the path of life. He has awakened many people to realize that life has meaning and a sacred mission.",
  },
  {
    id: 2,
    name: "Andriani A.",
    role: "Parenting Content Creator",
    avatar: "/images/Andriani A.jpg",
    initials: "AA",
    bg: "#b0c5c0",
    text: "Bang Ali delivers the session and guides the participants in a way that is easy to understand. He is able to bring participants out of fear and dare to live the life purpose that has been considered merely a dream.",
  },
  {
    id: 3,
    name: "Dwi Kurnianto",
    role: "Founder of Lex Remidium",
    avatar: "/images/Dwi Kurnianto.jpg",
    initials: "DK",
    bg: "#c0b8b0",
    text: "Mas Ali is the type of coach who makes us truly \"realize\" our own lives. The way he explains is always clear, deep, and hits the point we need. Joining Revisi Hidup with Mas Ali feels like being invited to meet a version of ourselves that we have been looking for for a long time.",
  },
  {
    id: 4,
    name: "Aisyah Rakhmatusyifa",
    role: "Fasilitator Healing and Holistik Wellbeing",
    avatar: "/images/Aisyah.jpeg",
    initials: "AR",
    bg: "#d4b8a0",
    text: "Mas Ali is one of my teachers, a life teacher, a life coach and my role model. His approach is gentle but still firm, communicative, and quite sensitive in reading people's dynamics.",
  },
  {
    id: 5,
    name: "Agnesia Yolanda Soleman",
    role: "Trauma Healing Practitioner",
    avatar: "/images/Agnes.png",
    initials: "AY",
    bg: "#a8b8c4",
    text: "Mas Ali is able to deliver the session from something very basic to forming foundations that can lead me into the depth of my soul and my life purpose, accompanying dozens of participants in a simple, patient, and energetic way.",
  },
  {
    id: 6,
    name: "Ervira Rusdhiana",
    role: "Housewife | Belajar Mengajar",
    avatar: "/images/Ervira.jpg",
    initials: "ER",
    bg: "#c8b4a8",
    text: "Mas Ali is able to explain how to find our true life purpose and how to live it in a scientific way and aligned with spirituality. He formulates complicated things in language that is very easy to understand.",
  },
];

const LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <li
      style={{
        listStyleType: "none",
        flexGrow: 0,
        flexShrink: 0,
        position: "relative",
        height: "fit-content",
        width: "fit-content",
        userSelect: "none",
        marginRight: 16,
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
    <div
      style={{
        width: "clamp(280px, 85vw, 400px)",
        height: "auto",
        minHeight: "auto",
        background: "#ffffff",
        border: "1px solid #eeebe6",
        borderRadius: 12,
        padding: "clamp(32px, 5vw, 60px) clamp(20px, 4vw, 30px) clamp(36px, 5vw, 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: t.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          overflow: "hidden",
          border: "3px solid #f0ede8",
          flexShrink: 0,
        }}
      >
        {t.avatar ? (
          <img src={t.avatar} alt={t.name} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: 22, fontWeight: 600, color: "#fff" }}>
            {t.initials}
          </span>
        )}
      </div>

      {/* Name */}
      <p style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 20, color: "#1a1a1a", textAlign: "center", marginBottom: 4 }}>
        {t.name}
      </p>

      {/* Role */}
      <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "27px", color: "rgb(32, 32, 36)", textAlign: "center", marginBottom: 20, opacity: 0.55 }}>
        {t.role}
      </p>

      {/* Testimonial */}
      <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "22px", color: "rgb(68, 68, 68)", textAlign: "center" }}>
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
    </li>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const xRef = useRef(0);
  const halfRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const pointerStartRef = useRef(0);
  const xStartRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const SPEED = 0.5; // px/frame ≈ matches the old 40s loop

    const measure = () => { halfRef.current = track.scrollWidth / 2; };
    measure();
    window.addEventListener("resize", measure);

    const wrap = () => {
      const half = halfRef.current;
      if (half <= 0) return;
      while (xRef.current <= -half) xRef.current += half;
      while (xRef.current > 0) xRef.current -= half;
    };

    const tick = () => {
      if (!draggingRef.current) {
        xRef.current -= SPEED;
        wrap();
        track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    pointerStartRef.current = e.clientX;
    xStartRef.current = xRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - pointerStartRef.current;
    if (Math.abs(dx) > 3) movedRef.current = true;
    xRef.current = xStartRef.current + dx;
    const half = halfRef.current;
    if (half > 0) {
      while (xRef.current <= -half) xRef.current += half;
      while (xRef.current > 0) xRef.current -= half;
    }
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${xRef.current}px,0,0)`;
  };

  const endDrag = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    (e.currentTarget as HTMLElement).style.cursor = "grab";
  };

  // Suppress card click/hover jitter that fires after a drag
  const onClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) { e.preventDefault(); e.stopPropagation(); }
  };

  return (
    <section style={{ background: "linear-gradient(to bottom, #ffffff, #f6f5f1 50%, #ffffff)", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(48px, 7vw, 80px)", paddingBottom: "clamp(48px, 7vw, 80px)", overflow: "hidden" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)", padding: "0 clamp(16px, 4vw, 24px)" }}>
        <h2
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(24px, 4vw, 40px)",
            lineHeight: 1.2,
            color: "rgb(38, 38, 38)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Among the Successful Peers with Ali Zaenal Abidin
        </h2>
        <p
          style={{
            fontFamily: "var(--font-work-sans), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 2.5vw, 21px)",
            lineHeight: 1.5,
            color: "rgb(68, 68, 68)",
          }}
        >
          Hear what others say about the impact Ali has made in their lives.
        </p>
      </div>

      {/* Marquee — auto-scrolls and is draggable/swipeable */}
      <div
        style={{ position: "relative", cursor: "grab", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {/* Edge fades */}
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, left: 0, width: "clamp(24px, 6vw, 80px)", background: "linear-gradient(to right, #ffffff, transparent)", zIndex: 10 }} />
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, right: 0, width: "clamp(24px, 6vw, 80px)", background: "linear-gradient(to left, #ffffff, transparent)", zIndex: 10 }} />

        <ul
          ref={trackRef}
          style={{ display: "flex", width: "max-content", willChange: "transform", margin: 0, padding: 0 }}
        >
          {LOOP.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </ul>
      </div>


    </section>
  );
}
