"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

const MESSAGES = [
  { from: "user", text: "Hallo Karnal, aku mau tanya tentang hidup yang lebih bermakna..." },
  { from: "ali", text: "Tentu, kita bisa mulai dari memahami nilai-nilai inti dalam hidupmu. Apa yang paling kamu anggap penting?" },
  { from: "user", text: "Keluarga dan ketenangan batin..." },
  { from: "ali", text: "Itu fondasi yang luar biasa. Ketenangan batin dimulai dari keselarasan antara apa yang kamu pikirkan, rasakan, dan lakukan setiap hari." },
];

function ChatBubble({ msg, index }: { msg: typeof MESSAGES[0]; index: number }) {
  const isAli = msg.from === "ali";
  return (
    <motion.div
      className={`flex ${isAli ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: easeOut, delay: 0.15 + index * 0.12 }}
    >
      {isAli && (
        <div className="w-7 h-7 rounded-full bg-[#C8A96E] flex-shrink-0 mr-2 mt-1 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
          isAli
            ? "bg-white text-[#1A1A1A] rounded-tl-none shadow-sm"
            : "bg-[#C8A96E] text-white rounded-tr-none"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function ShimmerBar({ width }: { width: string }) {
  return (
    <motion.div
      className="h-2 rounded-full bg-[#1A1A1A]/10 overflow-hidden"
      style={{ width }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
      />
    </motion.div>
  );
}

export function ChatTeaserSection() {
  return (
    <section className="relative overflow-hidden bg-[#EEF2EC] py-24 md:py-32">
      {/* Warm green blob */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C8D8B8]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-[#D4E8C4]/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#6B6560] mb-4">AI — Powered</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-5 leading-tight">
            Talk with Ali<br />right away
          </h2>
          <p className="text-[#6B6560] leading-relaxed mb-8 max-w-sm">
            Have a question about life, aligning everyday emotion, or becoming more mindful?
            Ali&rsquo;s AI is trained on his philosophy and ready to help — anytime.
          </p>
          <Link href="/tanya">
            <motion.span
              className="inline-flex items-center h-12 px-7 text-sm font-medium bg-[#1A1A1A] text-[#F5F0E8] cursor-pointer select-none"
              whileHover={{ scale: 1.03, backgroundColor: "#C8A96E", color: "#1A1A1A" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Start Chat Now →
            </motion.span>
          </Link>
        </motion.div>

        {/* Right — chat card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
        >
          {/* Card */}
          <div className="bg-[#F9F7F2] rounded-2xl shadow-xl overflow-hidden border border-white/60">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1A1A1A]/6 bg-white">
              <div className="w-9 h-9 rounded-full bg-[#C8A96E] flex items-center justify-center">
                <span className="text-xs font-bold text-white">AZA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Tanya Ali</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[11px] text-[#6B6560]">Online sekarang</p>
                </div>
              </div>
              {/* Shimmer activity indicator */}
              <div className="ml-auto flex flex-col gap-1">
                <ShimmerBar width="48px" />
                <ShimmerBar width="32px" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 p-4">
              {MESSAGES.map((msg, i) => (
                <ChatBubble key={i} msg={msg} index={i} />
              ))}

              {/* Typing indicator */}
              <motion.div
                className="flex justify-start"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-7 h-7 rounded-full bg-[#C8A96E] flex-shrink-0 mr-2 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">A</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.div
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-[#6B6560]"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Input bar */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-white rounded-xl border border-[#1A1A1A]/8 px-4 h-11">
                <span className="text-sm text-[#1A1A1A]/30 flex-1">Ketik pesanmu...</span>
                <div className="w-7 h-7 rounded-full bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-[#C8A96E]/20 blur-2xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
