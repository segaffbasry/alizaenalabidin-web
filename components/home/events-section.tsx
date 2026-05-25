"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "mindful-manifestation",
    title: "Mindful Manifestation",
    date: "1-3 May 2026",
    venue: "Plaza 51, Bintaro",
    description:
      "A 3-day guided mindfulness workshop designed to help you reconnect, refocus, and consciously shape your inner direction through intentional practice.",
    image: "/images/poster-mindful.png",
    href: "/mindful-manifestation",
    imageRight: false,
  },
  {
    id: "revisi-hidup",
    title: "Revisi Hidup",
    date: "9-12 April 2026",
    venue: "Plaza 51, Bintaro",
    description:
      "A 4-day guided workshop designed to help you pause, review your life direction, and make intentional adjustments with clarity and awareness.",
    image: "/images/poster-revisi.png",
    href: "/revisi-hidup",
    imageRight: true,
  },
];

export function EventsSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(50px, 8vw, 100px)",
        paddingBottom: "clamp(50px, 8vw, 100px)",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/footer bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue Placeholder', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(26px, 4vw, 40px)",
            lineHeight: "1.2",
            color: "rgb(36,36,36)",
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          Upcoming Events
        </h2>

        {/* Event cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {EVENTS.map((event) => (
            <div
              key={event.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 0,
                borderRadius: 10,
                background: "linear-gradient(112deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 100%)",
                overflow: "hidden",
                transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "default",
              }}
              className="sm:!flex-row sm:items-center"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Poster image */}
              <div
                style={{ flexShrink: 0, width: "100%", borderRadius: "10px 10px 0 0", overflow: "hidden", aspectRatio: "3 / 2" }}
                className="sm:!w-[220px] lg:!w-[285px] sm:!aspect-auto sm:!h-[360px] sm:!rounded-[12px_0_0_12px]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: "1 0 0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, padding: "24px 20px" }}
                className="sm:!p-[20px_32px_20px_24px] lg:!p-[20px_40px_20px_32px]"
              >
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 400,
                    fontSize: "clamp(26px, 4vw, 42px)",
                    lineHeight: "1.15",
                    color: "rgb(28,28,28)",
                    margin: 0,
                  }}
                >
                  {event.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: "#6B8F8E",
                    margin: 0,
                  }}
                >
                  {event.date} · {event.venue}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.8vw, 16px)",
                    lineHeight: "1.7",
                    color: "rgb(68,68,68)",
                    margin: 0,
                    maxWidth: 480,
                  }}
                >
                  {event.description}
                </p>

                <Link
                  href={event.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 28px",
                    borderRadius: 999,
                    background: "#6B8F8E",
                    color: "#ffffff",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#5a7978")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#6B8F8E")}
                >
                  More detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
