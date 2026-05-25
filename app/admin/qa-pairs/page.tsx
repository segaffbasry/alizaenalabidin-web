"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Download } from "lucide-react";
import { SlideOver } from "@/components/admin/slide-over";
import { DataTable } from "@/components/admin/data-table";
import type { QAPair, KnowledgeCategory } from "@/lib/generated/prisma/client";

const CATEGORIES: KnowledgeCategory[] = ["BIOGRAPHY","PHILOSOPHY","PROGRAMS","BOOKS","FAQ","QA_PAIRS"];
const CSV_TEMPLATE = "question,answer,category\nApa itu coaching Ali?,Coaching Ali adalah...,FAQ\n";

type FormState = { question: string; answer: string; category: KnowledgeCategory; isActive: boolean };
const emptyForm: FormState = { question: "", answer: "", category: "FAQ", isActive: true };

export default function QAPairsPage() {
  const [pairs, setPairs] = useState<QAPair[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<QAPair | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await fetch("/api/admin/qa-pairs");
    setPairs(await res.json() as QAPair[]);
  }
  useEffect(() => { load(); }, []);

  function openAdd() { setEditing(null); setForm(emptyForm); setPanelOpen(true); }
  function openEdit(p: QAPair) {
    setEditing(p);
    setForm({ question: p.question, answer: p.answer, category: p.category, isActive: p.isActive });
    setPanelOpen(true);
  }

  async function save() {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/qa-pairs/${editing.id}` : "/api/admin/qa-pairs";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setPanelOpen(false); load();
  }

  async function del(p: QAPair) {
    if (!confirm(`Delete Q: "${p.question.slice(0, 60)}…"?`)) return;
    await fetch(`/api/admin/qa-pairs/${p.id}`, { method: "DELETE" });
    load();
  }

  async function importCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/admin/qa-pairs/import", { method: "POST", body: fd });
    const data = await res.json() as { imported: number; skipped: number };
    alert(`Imported ${data.imported} pairs, skipped ${data.skipped}`);
    setImporting(false); load();
    if (fileRef.current) fileRef.current.value = "";
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "qa-template.csv"; a.click();
  }

  const columns = [
    { key: "question", header: "Question", render: (r: Record<string, unknown>) => (
      <span className="font-medium line-clamp-2">{String(r.question)}</span>
    )},
    { key: "answer", header: "Answer", render: (r: Record<string, unknown>) => (
      <span className="text-[#6B6560] line-clamp-1">{String(r.answer)}</span>
    )},
    { key: "category", header: "Category", render: (r: Record<string, unknown>) => (
      <span className="text-xs bg-[#C8A96E]/10 text-[#C8A96E] px-2 py-0.5 rounded">{String(r.category)}</span>
    )},
    { key: "usageCount", header: "Uses", render: (r: Record<string, unknown>) => (
      <span className="font-mono text-sm">{String(r.usageCount)}</span>
    )},
    { key: "actions", header: "", render: (r: Record<string, unknown>) => {
      const pair = pairs.find((p) => p.id === r.id)!;
      return (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(pair); }} className="text-[#6B6560] hover:text-[#1A1A1A]"><Pencil size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); del(pair); }} className="text-[#6B6560] hover:text-red-500"><Trash2 size={14} /></button>
        </div>
      );
    }},
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">Q&amp;A Pairs</h1>
            <p className="text-sm text-[#6B6560] mt-0.5">{pairs.length} pairs · AI uses these for direct question matching</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={downloadTemplate} className="flex items-center gap-1.5 h-9 px-3 text-sm border border-gray-200 rounded-md text-[#6B6560] hover:text-[#1A1A1A] hover:border-[#C8A96E] transition-colors">
              <Download size={13} /> Template
            </button>
            <label className={`flex items-center gap-1.5 h-9 px-3 text-sm border border-gray-200 rounded-md cursor-pointer text-[#6B6560] hover:text-[#1A1A1A] hover:border-[#C8A96E] transition-colors ${importing ? "opacity-50 pointer-events-none" : ""}`}>
              <Upload size={13} /> {importing ? "Importing…" : "Import CSV"}
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={importCSV} />
            </label>
            <button onClick={openAdd} className="flex items-center gap-1.5 h-9 px-4 text-sm font-medium bg-[#1A1A1A] text-white rounded-md hover:bg-[#C8A96E] transition-colors">
              <Plus size={14} /> Add Pair
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={pairs as unknown as Record<string, unknown>[]} emptyMessage="No Q&A pairs yet. Add some or import a CSV." />
      </div>

      <SlideOver open={panelOpen} onClose={() => setPanelOpen(false)} title={editing ? "Edit Q&A Pair" : "Add Q&A Pair"}>
        <div className="flex flex-col gap-4">
          {(["question", "answer"] as const).map((field) => (
            <div key={field}>
              <label className="text-xs font-medium text-[#6B6560] mb-1 block capitalize">{field}</label>
              <textarea value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                rows={field === "answer" ? 6 : 3}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] resize-none" />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as KnowledgeCategory }))}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] bg-white">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={save} disabled={saving || !form.question || !form.answer}
            className="h-10 bg-[#1A1A1A] text-white text-sm font-medium rounded-md hover:bg-[#C8A96E] transition-colors disabled:opacity-50">
            {saving ? "Saving…" : editing ? "Save Changes" : "Create Pair"}
          </button>
        </div>
      </SlideOver>
    </>
  );
}
