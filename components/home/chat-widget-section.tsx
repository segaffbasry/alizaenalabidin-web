"use client";

import { useState, useRef, useEffect } from "react";

const STARTER_PROMPTS = [
  "Bagaimana menemukan tujuan hidup?",
  "Langkah pertama memulai perubahan?",
  "Tips tetap semangat saat ada tantangan?",
  "Cara move on dari masa lalu?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIBOT_URL = process.env.NEXT_PUBLIC_AIBOT_URL || "https://tanya.alizaenalabidin.com";
const GUEST_LIMIT = 10;
const GUEST_COUNT_KEY = "aza_guest_chat_count";

export function ChatWidgetSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = Number(localStorage.getItem(GUEST_COUNT_KEY) || "0");
    if (!Number.isNaN(stored)) setGuestCount(stored);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const limitReached = guestCount >= GUEST_LIMIT;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || limitReached) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setGuestCount((prev) => {
      const next = prev + 1;
      localStorage.setItem(GUEST_COUNT_KEY, String(next));
      return next;
    });
    setLoading(true);

    try {
      const res = await fetch(`${AIBOT_URL}/api/chat/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error();

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: fullContent };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="bg-[#F5F0E8] min-h-screen px-6 py-24 sm:py-0 flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h2
            className="mb-6"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontWeight: 400,
              fontSize: 40,
              lineHeight: "48px",
              color: "rgb(36, 36, 36)",
            }}
          >
            Talk with Ali Right Away
          </h2>
          <p className="text-[#6B6560] text-base leading-relaxed max-w-sm mb-8">
            Konsultasi langsung dengan AI Ali: akses wawasan, saran, dan pengalaman dari Ali Zaenal Abidin kapanpun kamu butuh.
          </p>
          <a
            href={AIBOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: '"Satoshi", sans-serif' }}
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#6B8F8E] text-white text-sm font-medium transition-all duration-200 cursor-pointer hover:ring-4 hover:ring-[#6B8F8E]/30 hover:ring-offset-2 hover:ring-offset-[#F5F0E8]"
          >
            Start chat now
          </a>
        </div>

        {/* Right — chat widget */}
        <div className="bg-white rounded-2xl border border-[#e8e3d9] shadow-lg overflow-hidden flex flex-col h-[500px]">
          {/* Widget header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e8e3d9]">
            <img src={`${AIBOT_URL}/avatar-ali.png`} alt="Ali" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Ali Zaenal Abidin</p>
              <p className="text-xs text-[#6B6560]">Representasi digital Ali Zaenal Abidin</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.length === 0 ? (
              <div>
                <p className="text-xs text-[#9a9490] text-center mb-4">Pilih pertanyaan atau tulis sendiri:</p>
                <div className="space-y-2">
                  {STARTER_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      disabled={limitReached}
                      className="w-full text-left text-sm text-[#1A1A1A] border border-[#e8e3d9] rounded-xl px-4 py-3 hover:border-[#C8A96E] hover:bg-[#faf7f2] transition-colors disabled:opacity-40 disabled:hover:border-[#e8e3d9] disabled:hover:bg-transparent"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "assistant" && (
                    <img src={`${AIBOT_URL}/avatar-ali.png`} alt="Ali" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1A1A1A] text-white rounded-tr-sm"
                      : "bg-[#F5F0E8] text-[#1A1A1A] rounded-tl-sm"
                  }`}>
                    {msg.content || (
                      <span className="inline-flex gap-1">
                        {[0, 150, 300].map((d) => (
                          <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Limit notice */}
          {limitReached && (
            <div className="border-t border-[#e8e3d9] bg-[#faf7f2] px-5 py-4 text-center">
              <p className="text-sm text-[#1A1A1A] mb-3">
                Kamu sudah mencapai batas {GUEST_LIMIT} pesan sebagai tamu. Daftar gratis untuk lanjut ngobrol dengan AI Ali.
              </p>
              <a
                href="/register"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#6B8F8E] text-white text-sm font-medium hover:bg-[#5e807f] transition-colors"
              >
                Daftar sekarang
              </a>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="relative border-t border-[#e8e3d9] bg-white"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder={limitReached ? "Batas pesan tamu tercapai" : "Tanya AZA"}
              disabled={loading || limitReached}
              rows={3}
              className="w-full resize-none text-base border-0 px-5 pt-5 pb-14 focus:outline-none bg-white placeholder:text-[#9a9490] disabled:opacity-50"
            />
            <div
              className={`absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border px-3 h-8 text-xs font-medium ${
                limitReached
                  ? "border-[#e0bdbd] bg-[#fbeeee] text-[#a35a5a]"
                  : "border-[#e8e3d9] bg-[#faf7f2] text-[#6B6560]"
              }`}
              title={`Batas ${GUEST_LIMIT} pesan untuk tamu`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
              {limitReached ? "Batas tercapai" : `Sisa ${GUEST_LIMIT - guestCount} pesan`}
            </div>
            <button
              type="submit"
              disabled={loading || limitReached || !input.trim()}
              className="absolute bottom-4 right-4 bg-[#e8e3d9] text-[#1A1A1A] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d4cfc9] transition-colors disabled:opacity-40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
