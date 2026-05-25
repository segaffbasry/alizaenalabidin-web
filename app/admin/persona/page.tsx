"use client";

import { useEffect, useState } from "react";
import type { BotPersona } from "@/lib/generated/prisma/client";

const MODELS = ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"] as const;

export default function PersonaPage() {
  const [persona, setPersona] = useState<Partial<BotPersona>>({
    systemPrompt: "", greetingMessage: "", fallbackMessage: "",
    model: "gpt-4o-mini", temperature: 0.7, maxTokens: 800,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/persona").then((r) => r.json()).then((data) => {
      if (data) setPersona(data as BotPersona);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/persona", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(persona),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function testPersona() {
    if (!testInput.trim()) return;
    setTesting(true); setTestOutput("");
    const res = await fetch("/api/tanya/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: testInput }] }),
    });
    if (!res.body) { setTesting(false); return; }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const evt = JSON.parse(line.slice(6)) as { text?: string; done?: boolean };
          if (evt.text) setTestOutput((o) => o + evt.text);
        } catch { /* skip */ }
      }
    }
    setTesting(false);
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-[#1A1A1A]">Bot Persona</h1>
        {persona.updatedAt && (
          <p className="text-xs text-[#6B6560] mt-0.5">
            Last saved: {new Date(persona.updatedAt).toLocaleString("id-ID")}
          </p>
        )}
      </div>

      <div className="space-y-5 bg-white border border-gray-100 rounded-lg p-6">
        <div>
          <label className="text-xs font-medium text-[#6B6560] mb-1 block">System Prompt</label>
          <p className="text-xs text-[#6B6560]/70 mb-2">Write in first person as Ali. This sets the AI&apos;s base personality.</p>
          <textarea value={persona.systemPrompt ?? ""} onChange={(e) => setPersona((p) => ({ ...p, systemPrompt: e.target.value }))}
            rows={10} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] resize-none font-mono" />
        </div>

        <div>
          <label className="text-xs font-medium text-[#6B6560] mb-1 block">Greeting Message</label>
          <input value={persona.greetingMessage ?? ""} onChange={(e) => setPersona((p) => ({ ...p, greetingMessage: e.target.value }))}
            className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
        </div>

        <div>
          <label className="text-xs font-medium text-[#6B6560] mb-1 block">Fallback Message (when AI fails)</label>
          <input value={persona.fallbackMessage ?? ""} onChange={(e) => setPersona((p) => ({ ...p, fallbackMessage: e.target.value }))}
            className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Model</label>
            <select value={persona.model ?? "gpt-4o-mini"} onChange={(e) => setPersona((p) => ({ ...p, model: e.target.value }))}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] bg-white">
              {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 flex justify-between">
              Temperature <span className="font-mono">{persona.temperature?.toFixed(1)}</span>
            </label>
            <input type="range" min={0} max={1} step={0.1} value={persona.temperature ?? 0.7}
              onChange={(e) => setPersona((p) => ({ ...p, temperature: parseFloat(e.target.value) }))}
              className="w-full accent-[#C8A96E]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Max Tokens</label>
            <input type="number" min={100} max={4000} value={persona.maxTokens ?? 800}
              onChange={(e) => setPersona((p) => ({ ...p, maxTokens: parseInt(e.target.value) }))}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="h-10 px-6 bg-[#1A1A1A] text-white text-sm font-medium rounded-md hover:bg-[#C8A96E] transition-colors disabled:opacity-50">
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save Persona"}
        </button>
      </div>

      {/* Test section */}
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4">Test Persona</h2>
        <div className="flex gap-2 mb-3">
          <input value={testInput} onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type a test question…"
            className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]"
            onKeyDown={(e) => e.key === "Enter" && testPersona()} />
          <button onClick={testPersona} disabled={testing || !testInput.trim()}
            className="h-9 px-4 text-sm bg-[#C8A96E] text-white rounded-md disabled:opacity-50">
            {testing ? "…" : "Ask"}
          </button>
        </div>
        {testOutput && (
          <div className="bg-gray-50 rounded-md p-4 text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
            {testOutput}
          </div>
        )}
      </div>
    </div>
  );
}
