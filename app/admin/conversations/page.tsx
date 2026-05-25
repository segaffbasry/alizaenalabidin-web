"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import type { ConversationLog } from "@/lib/generated/prisma/client";

type ConvWithUser = ConversationLog & { user: { name?: string | null; email?: string } | null };
type Message = { role: string; content: string; timestamp: number };

export default function ConversationsPage() {
  const [convs, setConvs] = useState<ConvWithUser[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [quotaOnly, setQuotaOnly] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  async function load() {
    const params = new URLSearchParams();
    if (quotaOnly) params.set("quotaExhausted", "true");
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    const res = await fetch(`/api/admin/conversations?${params}`);
    setConvs(await res.json() as ConvWithUser[]);
  }
  useEffect(() => { load(); }, [quotaOnly, dateFrom, dateTo]); // eslint-disable-line

  const columns = [
    { key: "id", header: "Session", render: (r: Record<string, unknown>) => (
      <span className="font-mono text-xs text-[#6B6560]">{String(r.id).slice(0, 10)}…</span>
    )},
    { key: "user", header: "User", render: (r: Record<string, unknown>) => {
      const u = r.user as { name?: string; email?: string } | null;
      return <span>{u?.name ?? u?.email ?? "Guest"}</span>;
    }},
    { key: "questionCount", header: "Qs", render: (r: Record<string, unknown>) => <span>{String(r.questionCount)}</span> },
    { key: "quotaExhausted", header: "Quota Hit", render: (r: Record<string, unknown>) => (
      <span className={r.quotaExhausted ? "text-amber-500 font-medium text-xs" : "text-[#6B6560] text-xs"}>
        {r.quotaExhausted ? "Yes ✱" : "No"}
      </span>
    )},
    { key: "startedAt", header: "Started", render: (r: Record<string, unknown>) => (
      <span className="text-xs">{new Date(r.startedAt as string).toLocaleString("id-ID")}</span>
    )},
  ];

  const selected = convs.find((c) => c.id === expanded);
  let messages: Message[] = [];
  if (selected) {
    try { messages = JSON.parse(selected.messages) as Message[]; } catch { messages = []; }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#1A1A1A]">Conversations</h1>
        <p className="text-sm text-[#6B6560] mt-0.5">{convs.length} sessions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <label className="flex items-center gap-2 text-sm text-[#6B6560] cursor-pointer">
          <input type="checkbox" checked={quotaOnly} onChange={(e) => setQuotaOnly(e.target.checked)} className="accent-[#C8A96E]" />
          Quota-exceeded only
        </label>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
          className="h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
        <span className="text-[#6B6560] text-sm">to</span>
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
          className="h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
      </div>

      <DataTable
        columns={columns}
        data={convs as unknown as Record<string, unknown>[]}
        onRowClick={(r) => setExpanded(expanded === r.id ? null : String(r.id))}
      />

      {/* Expanded thread */}
      {selected && (
        <div className="bg-white border border-gray-100 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4">
            Thread — {String(selected.id).slice(0, 12)}… ({messages.length} messages)
          </h2>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user" ? "bg-[#1A1A1A] text-white rounded-br-sm" : "bg-gray-50 text-[#1A1A1A] rounded-bl-sm border border-gray-100"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
