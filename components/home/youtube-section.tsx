"use client";

import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";

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

export function YouTubeSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const anim = el.getAnimations()[0];
    if (anim) animRef.current = anim;
  });

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

      {/* Marquee */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => { if (animRef.current) animRef.current.playbackRate = 0.25; }}
        onMouseLeave={() => { if (animRef.current) animRef.current.playbackRate = 1; }}
      >
        {/* Edge fades */}
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, #f9faf7, transparent)", zIndex: 10 }} />
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, #f9faf7, transparent)", zIndex: 10 }} />

        <ul
          ref={trackRef}
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee-left 40s linear infinite",
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
