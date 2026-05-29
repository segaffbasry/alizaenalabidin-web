"use client";

import { useEffect, useRef } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  {
    id: "v1",
    title: "Tenang, Tapi Biar Jujur Sama Diri Sendiri",
    duration: "6:37",
    thumb: "/images/1.avif",
    href: "https://youtube.com/@alizaenalabidin",
  },
  {
    id: "v2",
    title: "Imajinasi Dalam Islam: Yang Selama Ini Kita Abaikan",
    duration: "1:25:22",
    thumb: "/images/2.avif",
    href: "https://youtube.com/@alizaenalabidin",
  },
  {
    id: "v3",
    title: "Imajinasi Dalam Islam: Yang Selama Ini Kita Abaikan",
    duration: "9:30",
    thumb: "/images/3.avif",
    href: "https://youtube.com/@alizaenalabidin",
  },
  {
    id: "v4",
    title: "Mindfulness Bukan Biar Tenang, Tapi Biar Jujur Sama Diri Sendiri",
    duration: "6:37",
    thumb: "/images/4.avif",
    href: "https://youtube.com/@alizaenalabidin",
  },
];

const LOOP = [...VIDEOS, ...VIDEOS];

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <li
      style={{
        listStyleType: "none",
        flexShrink: 0,
        width: 352,
        userSelect: "none",
        marginRight: 16,
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <a href={video.href} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
        {/* Thumbnail */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1.737 / 1",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#1a1a1a",
            marginBottom: 16,
          }}
        >
          <img
            src={video.thumb}
            alt={video.title}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: "Inter, 'Inter Placeholder', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "19px",
            color: "rgb(0, 0, 0)",
            margin: "0 0 8px",
          }}
        >
          {video.title}
        </p>

        {/* Duration */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={13} color="rgba(0,0,0,0.5)" />
          <span
            style={{
              fontFamily: "Inter, 'Inter Placeholder', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "21px",
              color: "rgb(0, 0, 0)",
            }}
          >
            {video.duration}
          </span>
        </div>
      </a>
    </li>
  );
}

const CARD_STEP = 352 + 16; // card width + marginRight

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "calc(50% - 38px)", // center on the thumbnail row
    [side]: "clamp(8px, 2vw, 24px)",
    transform: "translateY(-50%)",
    zIndex: 11,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e6e4df",
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
}

export function YouTubeSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const xRef = useRef(0);
  const halfRef = useRef(0);
  const draggingRef = useRef(false);
  const nudgingRef = useRef(false);
  const movedRef = useRef(false);
  const pointerStartRef = useRef(0);
  const xStartRef = useRef(0);

  const wrapX = () => {
    const half = halfRef.current;
    if (half <= 0) return;
    while (xRef.current <= -half) xRef.current += half;
    while (xRef.current > 0) xRef.current -= half;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const SPEED = 0.5;

    const measure = () => { halfRef.current = track.scrollWidth / 2; };
    measure();
    window.addEventListener("resize", measure);

    const tick = () => {
      if (!draggingRef.current && !nudgingRef.current) {
        xRef.current -= SPEED;
        wrapX();
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

  // Arrow buttons: dir = +1 (next, move left), -1 (prev, move right)
  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (!track || nudgingRef.current || draggingRef.current) return;
    nudgingRef.current = true;
    xRef.current -= dir * CARD_STEP;
    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translate3d(${xRef.current}px,0,0)`;
    window.setTimeout(() => {
      track.style.transition = "";
      wrapX();
      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      nudgingRef.current = false;
    }, 460);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (nudgingRef.current) return;
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
    wrapX();
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${xRef.current}px,0,0)`;
  };

  const endDrag = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    (e.currentTarget as HTMLElement).style.cursor = "grab";
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) { e.preventDefault(); e.stopPropagation(); }
  };

  return (
    <section
      style={{
        background: "#f9faf7",
        paddingTop: 80,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: "48px",
            color: "rgb(38, 38, 38)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Latest Videos by Ali
        </h2>
        <p
          style={{
            fontFamily: "var(--font-work-sans), sans-serif",
            fontWeight: 400,
            fontSize: 21,
            lineHeight: "23px",
            color: "rgb(68, 68, 68)",
          }}
        >
          Explore Ali&apos;s most recent video content
        </p>
      </div>

      {/* Marquee — auto-scrolls, draggable, with arrow controls */}
      <div
        style={{ position: "relative", cursor: "grab", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {/* Edge fades */}
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, #f9faf7, transparent)", zIndex: 10 }} />
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, #f9faf7, transparent)", zIndex: 10 }} />

        {/* Arrow controls */}
        <button
          type="button"
          aria-label="Previous videos"
          onClick={() => nudge(-1)}
          style={arrowStyle("left")}
        >
          <ChevronLeft size={22} color="#1a1a1a" />
        </button>
        <button
          type="button"
          aria-label="Next videos"
          onClick={() => nudge(1)}
          style={arrowStyle("right")}
        >
          <ChevronRight size={22} color="#1a1a1a" />
        </button>

        <ul
          ref={trackRef}
          style={{
            display: "flex",
            width: "max-content",
            willChange: "transform",
            margin: 0,
            padding: "8px 0 8px 24px",
          }}
        >
          {LOOP.map((v, i) => (
            <VideoCard key={`${v.id}-${i}`} video={v} />
          ))}
        </ul>
      </div>
    </section>
  );
}
