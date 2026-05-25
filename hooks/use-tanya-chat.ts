"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type ChatMessage, FREE_QUESTION_LIMIT } from "@/lib/tanya";

interface UseTanyaChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  questionsRemaining: number;
  quotaExhausted: boolean;
  send: (text: string) => Promise<void>;
}

export function useTanyaChat(): UseTanyaChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Saya Ali — siap menemani perjalanan transformasimu. Ada yang ingin kamu tanyakan tentang hidup, tujuan, atau mindfulness?",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(FREE_QUESTION_LIMIT);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetch("/api/tanya/session")
      .then((r) => r.json())
      .then((data: { questionsRemaining?: number; exhausted?: boolean }) => {
        if (typeof data.questionsRemaining === "number") setQuestionsRemaining(data.questionsRemaining);
        if (data.exhausted) setQuotaExhausted(true);
      })
      .catch(() => {});
  }, []);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || quotaExhausted) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    // Optimistically add user message + empty assistant placeholder
    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "", timestamp: Date.now() },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/tanya/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 402) {
        setQuotaExhausted(true);
        setQuestionsRemaining(0);
        // Remove empty placeholder
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        return;
      }

      if (!res.body) throw new Error("No response body");

      // Read SSE stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6)) as {
              text?: string;
              done?: boolean;
              questionsRemaining?: number;
              exhausted?: boolean;
              error?: boolean;
            };

            if (event.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + event.text } : m
                )
              );
            }

            if (event.done) {
              if (typeof event.questionsRemaining === "number") setQuestionsRemaining(event.questionsRemaining);
              if (event.exhausted) setQuotaExhausted(true);
            }
          } catch {
            // malformed event line — skip
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Maaf, ada gangguan koneksi. Silakan coba lagi." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, quotaExhausted]);

  return { messages, isLoading, questionsRemaining, quotaExhausted, send };
}
