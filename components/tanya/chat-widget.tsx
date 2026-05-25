"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

const SEED_MESSAGES = [
  {
    id: "s1",
    role: "user" as const,
    text: "Bagaimana cara menemukan tujuan hidup saya yang sesungguhnya?",
  },
  {
    id: "s2",
    role: "assistant" as const,
    text: "Tujuan hidup bukan sesuatu yang 'ditemukan' — ia *diciptakan* melalui pilihan-pilihan kecil yang Anda buat setiap hari. Mulailah dengan bertanya: apa yang membuat Anda lupa waktu?",
  },
  {
    id: "s3",
    role: "user" as const,
    text: "Saya sering merasa hidup saya stagnan...",
  },
];

function WidgetBubble({ msg, index }: { msg: typeof SEED_MESSAGES[0]; index: number }) {
  const isAli = msg.role === "assistant";
  return (
    <motion.div
      className={`flex items-end gap-2 ${isAli ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: easeOut, delay: 0.1 + index * 0.1 }}
    >
      {isAli && (
        <div className="w-6 h-6 rounded-full bg-[#C8A96E] flex-shrink-0 flex items-center justify-center mb-0.5">
          <span className="text-[8px] font-bold text-white">A</span>
        </div>
      )}
      <div
        className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed rounded-xl ${
          isAli
            ? "bg-white text-[#1A1A1A] rounded-bl-sm shadow-sm"
            : "bg-[#1A1A1A] text-white rounded-br-sm"
        }`}
      >
        {msg.text.split(/(\*[^*]+\*)/).map((seg, i) =>
          seg.startsWith("*") && seg.endsWith("*") ? (
            <strong key={i} className="text-[#C8A96E]">{seg.slice(1, -1)}</strong>
          ) : (
            seg
          )
        )}
      </div>
    </motion.div>
  );
}

export function ChatWidget() {
  return (
    <div className="bg-[#F9F7F2] rounded-2xl border border-[#C8A96E]/15 shadow-lg overflow-hidden h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#1A1A1A]/6 bg-white flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#C8A96E] flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">AZA</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-[#1A1A1A]">Tanya Ali</p>
            <span className="text-[8px] tracking-wider uppercase bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/30 px-1.5 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-[10px] text-[#6B6560]">Online sekarang</p>
          </div>
        </div>
        <p className="text-[10px] text-[#6B6560]/60">10 pertanyaan gratis</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3">
        {SEED_MESSAGES.map((msg, i) => (
          <WidgetBubble key={msg.id} msg={msg} index={i} />
        ))}

        {/* Typing indicator */}
        <motion.div
          className="flex items-end gap-2 justify-start"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-6 h-6 rounded-full bg-[#C8A96E] flex-shrink-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">A</span>
          </div>
          <div className="bg-white rounded-xl rounded-bl-sm px-3 py-2 shadow-sm flex items-center gap-1">
            {[0, 0.2, 0.4].map((d) => (
              <motion.div
                key={d}
                className="w-1 h-1 rounded-full bg-[#6B6560]"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: d }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Footer */}
      <div className="flex-shrink-0 px-4 pb-4">
        <Link href="/tanya">
          <motion.span
            className="flex items-center justify-center w-full h-10 text-sm font-medium bg-[#1A1A1A] text-[#F5F0E8] rounded-xl cursor-pointer select-none"
            whileHover={{ backgroundColor: "#C8A96E", color: "#1A1A1A" }}
            transition={{ duration: 0.2 }}
          >
            Start Chatting — It&rsquo;s Free →
          </motion.span>
        </Link>
      </div>
    </div>
  );
}
