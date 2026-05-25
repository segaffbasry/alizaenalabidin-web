"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const BOOKS = [
  {
    id: "uncover-your-unique-purpose",
    slug: "uncover-your-unique-purpose",
    title: "Uncover your unique purpose",
    tag: "Newest release book by Ali Zaenal Abidin",
    spine: "#2E2820",
    description:
      "Grounded in psychology, behavioural science, and real-world case studies, this book goes beyond motivation and inspiration. It provides structured frameworks, reflective exercises, and actionable steps that guide you through understanding who you are, what genuinely matters to you, and how to align your daily life with long-term meaning.",
    cover: "/images/cover-book-1.avif",
    coverFallback: "linear-gradient(160deg, #3D3026 0%, #5C4A32 50%, #C8A96E 100%)",
  },
  {
    id: "hidup-mau-ngapain",
    slug: "hidup-mau-ngapain",
    title: "Hidup mau ngapain?",
    tag: "A best-seller book by Ali Zaenal Abidin",
    spine: "#1A1A1A",
    description:
      "Karena bahagia bukan tujuan hidup, terus Hidup Mau Ngapain?",
    cover: "/images/cover-book-2.png",
    coverFallback: "linear-gradient(160deg, #1A1A1A 0%, #2E2820 60%, #6B6560 100%)",
  },
];

const spring = { bounce: 0, delay: 0, duration: 0.6, type: "spring" } as const;

function Book3D({ book }: { book: typeof BOOKS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: 200, height: 305, flexShrink: 0, position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shadow on outer container */}
      <motion.div
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        animate={{
          boxShadow: hovered
            ? "0px 0.71px 0.71px -0.625px rgba(0,0,0,0.44), 0px 1.81px 1.81px -1.25px rgba(0,0,0,0.43), 0px 3.62px 3.62px -1.875px rgba(0,0,0,0.41), 0px 6.87px 6.87px -2.5px rgba(0,0,0,0.38), 0px 13.65px 13.65px -3.125px rgba(0,0,0,0.31), 0px 30px 30px -3.75px rgba(0,0,0,0.15)"
            : "0px 0.71px 0.71px -0.625px rgba(0,0,0,0), 0px 1.81px 1.81px -1.25px rgba(0,0,0,0), 0px 3.62px 3.62px -1.875px rgba(0,0,0,0), 0px 6.87px 6.87px -2.5px rgba(0,0,0,0), 0px 13.65px 13.65px -3.125px rgba(0,0,0,0), 0px 30px 30px -3.75px rgba(0,0,0,0)",
        }}
        transition={spring}
      />

      {/* Book wrapper */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          position: "relative",
          transformStyle: "preserve-3d",
          transformPerspective: 1200,
          originX: 1,
        }}
        animate={{ z: hovered ? 50 : 0 } as any}
        transition={spring}
      >
        {/* Paper — inner page */}
        <div
          style={{
            display: "flex",
            flex: "1 0 0",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 1,
            width: "100%",
            overflow: "hidden",
            padding: 30,
            position: "relative",
            zIndex: 0,
            background: "linear-gradient(239deg, rgb(255,255,255) 0%, rgb(224,224,224) 100%)",
          }}
        >
          <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: 20, fontWeight: 700, textAlign: "center", color: "#1a1a1a", width: "100%", wordBreak: "break-word" }}>
            {book.title}
          </p>
          <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 12, textAlign: "center", opacity: 0.3, width: "100%", wordBreak: "break-word" }}>
            Ali Zaenal Abidin
          </p>
        </div>

        {/* Cover — rotates open */}
        <motion.div
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 1 }}
          animate={hovered ? { originX: 0, rotateY: -70, z: 10, left: 1, right: -1 } as any : { rotateY: 0, z: 0, left: 0, right: 0 }}
          transition={spring}
        >
          <div style={{ flex: "1 0 0", height: 305, position: "relative", backgroundImage: `url('${book.cover}'), ${book.coverFallback}`, backgroundSize: "cover", backgroundPosition: "center" }} />
          {/* Lights 1 */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 18, overflow: "hidden", zIndex: 1, background: "linear-gradient(90deg, rgb(0,0,0) 0%, rgb(255,255,255) 23.82%, rgb(0,0,0) 40.39%, rgb(255,255,255) 48.43%, rgba(255,255,255,0) 100%)", opacity: 0.2, pointerEvents: "none" }} />
          {/* Lights 2 */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1, background: "linear-gradient(38deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function BooksSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(to bottom, #f5f3f1, #ffffff)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <h2
          className="text-center mb-16 md:mb-20 uppercase"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: "48px",
            color: "rgb(38, 38, 38)",
          }}
        >
          Explore Ali&rsquo;s Writing and Books
        </h2>

        {/* Books list */}
        <div className="flex flex-col gap-20 md:gap-28">
          {BOOKS.map((book) => (
            <div key={book.id} className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <Book3D book={book} />

              {/* Text */}
              <div className="flex flex-col justify-center max-w-xl">
                <h3
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 400,
                    fontSize: 40,
                    lineHeight: "48px",
                    color: "rgb(38, 38, 38)",
                  }}
                >
                  {book.title}
                </h3>

                <p
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "27px",
                    color: "rgb(68, 68, 68)",
                  }}
                >
                  {book.description}
                </p>

                <p
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-instrument-sans), sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "27px",
                    color: "rgb(68, 68, 68)",
                  }}
                >
                  {book.tag}
                </p>

                <Link
                  href={`/products/${book.slug}`}
                  className="inline-flex items-center px-7 py-3 rounded-full bg-[#6B8F8E] text-white text-sm font-medium w-fit transition-all duration-200 hover:ring-4 hover:ring-[#6B8F8E]/30 hover:ring-offset-2 hover:ring-offset-white"
                  style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
                >
                  Order now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
