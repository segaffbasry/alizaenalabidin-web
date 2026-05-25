"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/use-lenis";

const ease = (t: number) => 1 - Math.pow(2, -10 * t);

/* ─── data ─────────────────────────────────────────────────── */

const SPEAKERS = [
  {
    name: "Sandiaga Uno",
    label: "SANDIAGA UNO",
    role: "Entrepreneur & Menteri Pariwisata dan Ekonomi Kreatif (2020–2024)",
    img: "/images/sandiaga.avif",
  },
  {
    name: "Adji Santosoputro",
    label: "ADJI SANTOSOPUTRO",
    role: "Mindfulness Practitioner",
    img: "/images/adji.avif",
  },
  {
    name: "Meilinda Sutanto",
    label: "MEILINDA SUTANTO",
    role: "Family & Systemic Constellation Therapist. Bestseller Author.",
    img: "/images/meilinda.avif",
  },
  {
    name: "Ali Zaenal Abidin",
    label: "ALI ZAENAL ABIDIN\n(Facilitator)",
    role: "Life Purpose & Wellbeing Facilitator",
    img: "/images/ali-about.avif",
  },
];


const FAQS = [
  {
    q: "Apa agenda kegiatan dalam workshop Revisi Hidup?",
    a: "Seperti yang disebutkan dalam \"YOUR JOURNEY\", dalam workshop Revisi Hidup kita akan menjawab pertanyaan \"Who am I?\" \"Where am I?\" \"Where to go?\" \"How to go?\" dan \"I'm On My Way\", dengan difasilitasi oleh Ali Zaenal Abidin. Di sini kita tidak hanya mendengarkan materi tetapi juga mempraktekkan langsung materinya. Selain itu, akan ada sesi dengan para pembicara tamu lainnya.",
  },
  {
    q: "Kapan workshop Revisi Hidup dilaksanakan?",
    a: "Workshop Revisi Hidup dilaksanakan pada hari Kamis - Minggu, tanggal 20-23 Oktober 2025, jam 09.00 - 21.00 WIB.",
  },
  {
    q: "Di mana workshop Revisi Hidup dilaksanakan?",
    a: "Workshop Revisi Hidup dilaksanakan di Plaza 51, Bintaro, Tangerang Selatan.",
  },
  {
    q: "Saya ada jadwal kerja atau kuliah bentrok dengan jadwal workshop Revisi Hidup, apakah saya tetap boleh mengikuti workshopnya walaupun hanya 1, 2, atau 3 hari saja?",
    a: "Tidak boleh. Semua peserta wajib ikut workshop selama 4 hari penuh, dari jam 09.00 - 21.00 WIB. Jika diperlukan, kami bisa memberikan letter of acceptance sebagai lampiran surat izin agar tetap bisa mengikuti workshop.",
  },
  {
    q: "Apakah peserta menginap untuk mengikuti workshop Revisi Hidup?",
    a: "Peserta tidak menginap untuk mengikuti workshop Revisi Hidup. Workshop selesai jam 21.00 WIB, jadi peserta bisa pulang setelah workshop selesai.",
  },
  {
    q: "Apakah disediakan makan untuk peserta?",
    a: "Iya, peserta akan mendapatkan makan selama workshop berlangsung dari pagi hingga malam, sehingga bisa tetap fokus mengikuti workshop. Peserta dianjurkan untuk membawa botol minum sendiri untuk mengurangi sampah botol minum.",
  },
  {
    q: "Apakah benar peserta akan mendapatkan uang senilai Rp400.000 dengan mengikuti workshop Revisi Hidup?",
    a: "Benar, peserta akan mendapatkan Bonus Partisipasi berupa uang cash senilai Rp400.000 dengan mengikuti workshop Revisi Hidup secara penuh selama 4 hari.",
  },
  {
    q: "Bagaimana cara mendaftar workshop Revisi Hidup?",
    a: "Cara mendaftar workshop Revisi Hidup dengan mengikuti langkah berikut: 1. Mengisi formulir pendaftaran  2. Follow akun Instagram @revisi.hidup @youtzmedia dan @alizaenalabidin  3. Share info tentang workshop Revisi Hidup di Instagram Story dan mention akun Instagram @revisi.hidup @youtzmedia dan @alizaenalabidin  4. Upload bukti share info pada formulir pendaftaran",
  },
  {
    q: "Apakah perlu membayar untuk mendaftar workshop Revisi Hidup?",
    a: "Tidak perlu membayar untuk mendaftar workshop Revisi Hidup. Hanya perlu mengisi formulir pendaftaran dengan serius dan sungguh-sungguh karena peserta akan diseleksi berdasarkan jawaban yang diberikan.",
  },
  {
    q: "Apakah ada batasan usia untuk mengikuti workshop Revisi Hidup?",
    a: "Tidak ada batasan usia untuk mengikuti workshop Revisi Hidup. Kami terbuka menerima peserta dari berbagai latar belakang usia, yang serius ingin meREVISI HIDUP mereka.",
  },
  {
    q: "Kalau sudah mendaftar, apakah sudah pasti diterima sebagai peserta?",
    a: "Jumlah peserta terbatas sehingga kami akan melakukan seleksi pada pendaftar yang masuk berdasarkan jawaban yang ditulis dalam formulir pendaftaran.",
  },
  {
    q: "Kapan batas akhir pendaftaran peserta?",
    a: "Pendaftaran peserta ditutup pada Sabtu, 8 November 2025.",
  },
];

/* ─── components ────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.5 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ color: "#111", fontSize: 22, lineHeight: 1, flexShrink: 0, marginTop: 2 }}
        >
          —
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontFamily: "var(--font-work-sans), sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, paddingBottom: 20 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────── */

export default function RevisiHidupPage() {
  const heroRef = useRef<HTMLElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();

  function scrollToNext() {
    const el = nextSectionRef.current;
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          background: "#FF2727",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Centered content */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{
              fontFamily: "var(--font-inter-display), 'Inter Display', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(42px, 8vw, 85px)",
              lineHeight: "111px",
              color: "rgb(255,255,255)",
              margin: "0 0 16px",
            }}
          >
            REVISI HIDUP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-inter-display), 'Inter Display', sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "clamp(20px, 4.5vw, 38px)",
              lineHeight: "49px",
              color: "rgb(255,255,255)",
              margin: 0,
            }}
          >
            4 hari yang mengubah hidupmu <strong style={{ fontWeight: 900, fontStyle: "italic" }}>Selamanya!</strong>
          </motion.p>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          display: "flex", alignItems: "center", flexWrap: "wrap", padding: "0 clamp(16px, 4vw, 48px) clamp(20px, 3vw, 36px)", gap: 24, zIndex: 1,
        }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
            9-12 April 2026
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.35)" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
            Plaza 51, Bintaro
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.35)" }} />
          <button
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            style={{
              width: 72, height: 72,
              background: "rgba(255,255,255,0.18)",
              border: "none",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Rotating dotted ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", inset: -6,
                borderRadius: "50%",
              }}
            >
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i / 24) * 2 * Math.PI;
                  const r = 40;
                  const cx = 42 + r * Math.cos(angle);
                  const cy = 42 + r * Math.sin(angle);
                  return <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(255,255,255,0.6)" />;
                })}
              </svg>
            </motion.div>
            {/* Arrow */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9l6 6 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ══ SPEAKERS ══════════════════════════════════════════ */}
      <section ref={nextSectionRef} style={{
        background: "linear-gradient(180deg, #FF2727 0%, #FF4C57 50%, #FF2727 100%)",
        padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)",
      }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "#fff",
          }}>
            Speakers
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400, fontSize: "clamp(22px, 5vw, 60px)", lineHeight: 1.2, letterSpacing: "-0.01em",
            color: "#fff", margin: "0 0 56px",
          }}
        >
          Pembicara di Revisi Hidup kali ini
        </motion.h2>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 24 }}>
          {SPEAKERS.map(({ name, label, role, img }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            >
              {/* Photo card */}
              <div style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "3 / 3.6",
                marginBottom: 20,
              }}>
                <img
                  src={img}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              {/* Name */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600, fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: "34px",
                color: "rgb(255,255,255)", margin: "0 0 4px", whiteSpace: "pre-line",
              }}>
                {label}
              </p>

              {/* Role */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400, fontSize: 16, lineHeight: "24px",
                color: "rgba(255,255,255,0.55)", margin: 0,
              }}>
                {role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TENTANG REVISI HIDUP ══════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "#fff",
          }}>
            About
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400, fontSize: "clamp(22px, 5vw, 60px)", lineHeight: 1.2, letterSpacing: "-0.01em",
            color: "#fff", margin: "0 0 40px",
          }}
        >
          Tentang Revisi Hidup
        </motion.h2>

        {/* YouTube embed — autoplay muted, 16:9 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            margin: "0 clamp(-20px, -6vw, -80px)",
          }}
        >
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "#000",
          }}>
            <iframe
              src="https://www.youtube.com/embed/eyNzotVnXS8?autoplay=1&mute=1&loop=1&playlist=eyNzotVnXS8&controls=1&rel=0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ══ BENEFITS / INSIDE ═════════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "#fff" }}>
            Inside
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400, fontSize: "clamp(22px, 5vw, 60px)", lineHeight: 1.2, letterSpacing: "-0.01em",
            color: "#fff", margin: "0 0 40px",
          }}
        >
          On Revisi Hidup
        </motion.h2>

        {/* Benefit rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { num: "01", text: "Workshop selama 4 hari full = GRATIS" },
            { num: "02", text: "BONUS partisipasi Rp400.000 cash untuk tiap peserta" },
            { num: "03", text: "GRATIS makan dan minum sepanjang acara" },
          ].map(({ num, text }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: 0,
                background: "rgba(0,0,0,0.12)",
                borderRadius: 999,
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              {/* Yellow number box */}
              <div style={{
                background: "#F5C842",
                width: "clamp(68px, 12vw, 88px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                borderRadius: "999px 0 0 999px",
                padding: "20px 0",
              }}>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700, fontSize: "clamp(16px, 3vw, 26px)",
                  color: "#fff",
                }}>
                  {num}
                </span>
              </div>

              {/* Text */}
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500, fontSize: "clamp(15px, 3.5vw, 26px)", lineHeight: 1.5,
                color: "#fff",
                padding: "clamp(14px, 2vw, 22px) clamp(18px, 4vw, 40px)",
              }}>
                {text}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ JOURNEY ═══════════════════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "#fff" }}>
            The Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400, fontSize: "clamp(22px, 5vw, 60px)", lineHeight: 1.2, letterSpacing: "-0.01em",
            color: "#fff", margin: "0 0 56px",
          }}
        >
          Your journey
        </motion.h2>

        {/* Journey items — single col mobile, 5 col desktop */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))", gap: "clamp(32px, 5vw, 40px)" }}>
          {[
            { img: "/images/whoami.webp",    title: "WHO AM I?",      desc: "Melihat di balik layar fitur-fitur yang membentuk pikiran, emosi, dan mindset kita" },
            { img: "/images/whereami.webp",  title: "WHERE AM I?",   desc: "Memahami dan menerima kondisi saat ini, serta berdamai dengan masa lalu" },
            { img: "/images/wheretogo.webp", title: "WHERE TO GO?",  desc: "Menggali dan menemukan tujuan hidup secara sistematis" },
            { img: "/images/howtogo.webp",   title: "HOW TO GO?",    desc: "Menanamkan determinasi ke otak bawah sadar dan membangun kemampuan mengelola energi" },
            { img: "/images/imonmyway.webp", title: "I'M ON MY WAY", desc: "Membangun support system dalam menjaga konsistensi menjalankan tujuan hidup" },
          ].map(({ img, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-5"
            >
              <img
                src={img}
                alt={title}
                className="shrink-0 sm:mb-4"
                style={{ width: "clamp(64px, 10vw, 120px)", height: "clamp(64px, 10vw, 120px)", objectFit: "contain" }}
              />
              <div>
                <p style={{
                  fontFamily: "var(--font-inter-display), Inter, sans-serif",
                  fontWeight: 700, fontSize: "clamp(15px, 2.5vw, 22px)", lineHeight: 1.3,
                  color: "rgb(255,255,255)", margin: "0 0 8px",
                }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter-display), Inter, sans-serif",
                  fontWeight: 400, fontSize: "clamp(13px, 1.8vw, 17px)", lineHeight: 1.6,
                  color: "rgba(255,255,255,0.85)", margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 80px)", alignItems: "flex-start" }}>

          {/* Left — sticky label + heading */}
          <div style={{ width: "min(340px, 100%)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "#fff" }}>
                FAQ
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-inter-display), Inter, sans-serif",
              fontWeight: 400, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "58px", letterSpacing: "-0.01em",
              color: "#fff", margin: 0,
            }}>
              Pertanyaan umum tentang acara Revisi Hidup
            </h2>
          </div>

          {/* Right — FAQ cards */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.04 }}
              >
                <FaqItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONI ═════════════════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, color: "#fff" }}>
            Testimoni
          </span>
        </motion.div>

        {/* 3-column: video · video · youtz */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 24, alignItems: "center" }}>

          {/* Video 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "9 / 16", background: "#000" }}
          >
            <video
              src="/videos/testimoni1.mp4"
              controls
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>

          {/* Video 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "9 / 16", background: "#000" }}
          >
            <video
              src="/videos/testimoni2.mp4"
              controls
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>

          {/* Youtz Media */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18,
              color: "#fff", letterSpacing: "0.1em", margin: 0,
            }}>
              SUPPORTED BY:
            </p>
            <img
              src="/images/logo youtz media.avif"
              alt="Youtz Media"
              style={{ width: 120, height: 120, objectFit: "contain" }}
            />
            <p style={{
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16,
              color: "#fff", margin: 0,
            }}>
              Youtz Media
            </p>
          </motion.div>

        </div>
      </section>

      {/* ══ PAST GUEST SPEAKERS ═══════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }}>

          {/* Left — text */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}
            >
              <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, color: "#fff" }}>
                Our Guest Speakers
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              style={{
                fontFamily: "var(--font-inter-display), Inter, sans-serif",
                fontWeight: 400, fontSize: "clamp(36px, 4vw, 60px)", lineHeight: 1.15,
                color: "#fff", margin: "0 0 56px",
              }}
            >
              Diantara mereka yang pernah menjadi pembicara di{" "}
              <span style={{ color: "rgba(255,255,255,0.45)" }}>Revisi Hidup sebelumnya</span>
            </motion.h2>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                20+ Speakers
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.3)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                See All
              </span>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#FF2727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Right — 2×2 photo grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              "/images/guestpast1revpage.avif",
              "/images/guestpast2revpage.avif",
              "/images/guestpast3revpage.avif",
              "/images/guestpast4revpage.avif",
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  aspectRatio: "3 / 3.5",
                }}
              >
                <img
                  src={src}
                  alt={`Guest Speaker ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REGISTRATION CTA ══════════════════════════════════ */}
      <section style={{ background: "#FF2727", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) clamp(50px, 8vw, 100px)" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 28, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16, color: "#fff" }}>
            Pendaftaran
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "var(--font-inter-display), Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 1.15,
            color: "#fff", margin: "0 0 48px", maxWidth: 640,
          }}
        >
          Daftarkan dirimu sekarang di batch ini!
        </motion.h2>

        {/* Two cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16, alignItems: "stretch" }}>

          {/* Left card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "36px 40px",
            }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 20, color: "#111", margin: "0 0 24px" }}>
              Daftarkan diri Anda
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Menggali & menemukan tujuan hidup secara sistematis",
                "Memprogram pola pikir positif ke otak bawah sadar",
                "Membangun kemampuan mengelola energi positif",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ccc", flexShrink: 0, marginTop: 8 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#333", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "36px 40px",
              minWidth: 280, maxWidth: 380,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* DIBUKA badge */}
              <div style={{
                display: "inline-block",
                background: "#F5C842",
                borderRadius: 999,
                padding: "4px 14px",
                marginBottom: 20,
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.06em" }}>
                  DIBUKA
                </span>
              </div>

              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 56, color: "#111", margin: "0 0 8px", lineHeight: 1 }}>
                Gratis
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#666", margin: 0 }}>
                Terbatas bagi yang terpilih
              </p>
            </div>

            <motion.a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "block",
                textAlign: "center",
                padding: "16px 24px",
                background: "#FF2727",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textDecoration: "none",
                borderRadius: 999,
                marginTop: 32,
              }}
            >
              DAFTAR SEBAGAI PESERTA
            </motion.a>
          </motion.div>
        </div>
      </section>


    </main>
  );
}
