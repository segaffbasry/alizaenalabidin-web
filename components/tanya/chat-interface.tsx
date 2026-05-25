"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTanyaChat } from "@/hooks/use-tanya-chat";
import { QuotaModal } from "./quota-modal";
import { quotaColor, FREE_QUESTION_LIMIT } from "@/lib/tanya";
import { cn } from "@/lib/utils";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-[#C8A96E] flex-shrink-0 flex items-center justify-center mb-0.5">
        <span className="text-[10px] font-bold text-white">A</span>
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
        {[0, 0.18, 0.36].map((delay) => (
          <motion.div
            key={delay}
            className="w-1.5 h-1.5 rounded-full bg-[#6B6560]"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 0.7, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MessageBubble({
  role,
  content,
  index,
}: {
  role: "user" | "assistant";
  content: string;
  index: number;
}) {
  const isAli = role === "assistant";

  return (
    <motion.div
      className={cn("flex items-end gap-2", isAli ? "justify-start" : "justify-end")}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOut, delay: Math.min(index * 0.04, 0.2) }}
    >
      {isAli && (
        <div className="w-8 h-8 rounded-full bg-[#C8A96E] flex-shrink-0 flex items-center justify-center mb-0.5">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
      )}

      <div
        className={cn(
          "max-w-[78%] md:max-w-[65%] px-4 py-3 text-sm leading-relaxed",
          isAli
            ? "bg-white rounded-2xl rounded-bl-sm text-[#1A1A1A] shadow-sm"
            : "bg-[#1A1A1A] rounded-2xl rounded-br-sm text-white"
        )}
      >
        {/* Render newlines and markdown-style bold */}
        {content.split("\n").map((line, i) => (
          <span key={i}>
            {line.split(/(\*[^*]+\*)/).map((seg, j) =>
              seg.startsWith("*") && seg.endsWith("*") ? (
                <strong key={j} className={isAli ? "text-[#C8A96E]" : "text-[#C8A96E]"}>
                  {seg.slice(1, -1)}
                </strong>
              ) : (
                seg
              )
            )}
            {i < content.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>

      {!isAli && (
        <div className="w-8 h-8 rounded-full bg-[#6B6560]/20 flex-shrink-0 flex items-center justify-center mb-0.5">
          <span className="text-[10px] font-medium text-[#6B6560]">Kamu</span>
        </div>
      )}
    </motion.div>
  );
}

function QuotaBar({ remaining }: { remaining: number }) {
  const color = quotaColor(remaining);
  const pct = (remaining / FREE_QUESTION_LIMIT) * 100;

  return (
    <motion.div
      className="flex items-center gap-3"
      animate={{ opacity: remaining <= 5 ? 1 : 0.6 }}
    >
      <div className="flex-1 h-1 bg-[#1A1A1A]/8 rounded-full overflow-hidden max-w-24">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-[11px] font-medium" style={{ color }}>
        {remaining} question{remaining !== 1 ? "s" : ""} remaining
      </span>
    </motion.div>
  );
}

export function ChatInterface() {
  const { messages, isLoading, questionsRemaining, quotaExhausted, send } = useTanyaChat();
  const [input, setInput] = useState("");
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Show modal when quota just got exhausted
  useEffect(() => {
    if (quotaExhausted) setShowQuotaModal(true);
  }, [quotaExhausted]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    if (quotaExhausted) { setShowQuotaModal(true); return; }
    send(input);
    setInput("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <>
      <QuotaModal open={showQuotaModal} onClose={() => setShowQuotaModal(false)} />

      <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#1A1A1A]/8 bg-[#F5F0E8]/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="mr-1 text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="w-9 h-9 rounded-full bg-[#C8A96E] flex items-center justify-center">
              <span className="text-xs font-bold text-white">AZA</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[#1A1A1A]">Tanya Ali</p>
                <span className="text-[9px] tracking-wider uppercase bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/30 px-1.5 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[11px] text-[#6B6560]">Ali&rsquo;s AI · Online</p>
              </div>
            </div>
          </div>

          <QuotaBar remaining={questionsRemaining} />
        </motion.div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col gap-4 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} index={i} />
            ))}
            {isLoading && <TypingIndicator key="typing" />}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <motion.div
          className="flex-shrink-0 border-t border-[#1A1A1A]/8 px-4 md:px-6 py-4 bg-[#F5F0E8]/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
        >
          {quotaExhausted ? (
            <div className="flex items-center justify-between gap-4 py-2">
              <p className="text-sm text-[#6B6560]">
                You&rsquo;ve reached your free limit.
              </p>
              <button
                onClick={() => setShowQuotaModal(true)}
                className="text-sm font-medium text-[#C8A96E] border-b border-[#C8A96E]/50 pb-0.5 hover:border-[#C8A96E] transition-colors whitespace-nowrap"
              >
                Continue chatting →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pertanyaanmu..."
                rows={1}
                className="flex-1 resize-none bg-white border border-[#1A1A1A]/10 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#C8A96E] transition-colors leading-relaxed max-h-32 overflow-y-auto"
                style={{ minHeight: "46px" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
                }}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#C8A96E] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Send size={16} className="text-white translate-x-px" />
              </motion.button>
            </form>
          )}

          <p className="mt-2 text-center text-[10px] text-[#6B6560]/40">
            Press Enter to send · Shift+Enter for new line
          </p>
        </motion.div>
      </div>
    </>
  );
}
