"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Parallax background — extends below to cover parallax travel */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ y, height: "110%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "80% center" }}
        />
      </motion.div>

      {/* Bottom-only gradient — just enough to read the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Content — vertically centered, left-aligned */}
      <div className="absolute inset-y-0 left-10 sm:left-12 md:left-24 lg:left-36 right-6 sm:right-12 flex flex-col justify-end sm:justify-center pb-16 sm:pb-0">
        <motion.h1
          className="font-display text-white uppercase"
          style={{ fontSize: "clamp(36px, 7vw, 79px)", lineHeight: 1.1, fontWeight: 400 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          Transform Your Life Today
        </motion.h1>

        <motion.p
          className="font-body text-white mt-4 mb-4"
          style={{ fontSize: "clamp(15px, 2.5vw, 24px)", lineHeight: 1.6, fontWeight: 400 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
        >
          Unlock your potential and live your life purpose
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
        >
          <Link href="/booking">
            <motion.span
              className="group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 cursor-pointer select-none transition-colors duration-300 bg-[#6B8F8E] hover:bg-[#1A1A1A]"
              style={{ borderRadius: "16px" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="font-body font-medium text-white text-base whitespace-nowrap">
                Book A Session With Ali
              </span>
              <span
                className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] group-hover:bg-[#6B8F8E] transition-colors duration-300 flex-shrink-0"
                style={{ borderRadius: "10px" }}
              >
                <ArrowRight size={17} className="text-white" />
              </span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
