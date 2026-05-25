"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { SlideOver } from "@/components/admin/slide-over";
import { DataTable } from "@/components/admin/data-table";
import type { KnowledgeEntry, KnowledgeCategory } from "@/lib/generated/prisma/client";

const CATEGORIES: KnowledgeCategory[] = ["BIOGRAPHY","PHILOSOPHY","PROGRAMS","BOOKS","FAQ","QA_PAIRS"];

type FormState = {
  title: string; content: string; category: KnowledgeCategory; tags: string; isActive: boolean;
};
const emptyForm: FormState = { title: "", content: "", category: "FAQ", tags: "", isActive: true };

export default function KnowledgePage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [filter, setFilter] = useState<KnowledgeCategory | "">("");
  const [search, setSearch] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<KnowledgeEntry | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const params = new URLSearchParams();
    if (filter) params.set("category", filter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/knowledge?${params}`);
    setEntries(await res.json() as KnowledgeEntry[]);
  }

  useEffect(() => { load(); }, [filter, search]); // eslint-disable-line

  function openAdd() { setEditing(null); setForm(emptyForm); setPanelOpen(true); }
  function openEdit(e: KnowledgeEntry) {
    setEditing(e);
    setForm({ title: e.title, content: e.content, category: e.category, tags: e.tags, isActive: e.isActive });
    setPanelOpen(true);
  }

  async function save() {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/knowledge/${editing.id}` : "/api/admin/knowledge";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setPanelOpen(false);
    load();
  }

  async function toggle(e: KnowledgeEntry) {
    await fetch(`/api/admin/knowledge/${e.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !e.isActive }),
    });
    load();
  }

  async function del(e: KnowledgeEntry) {
    if (!confirm(`Delete "${e.title}"?`)) return;
    await fetch(`/api/admin/knowledge/${e.id}`, { method: "DELETE" });
    load();
  }

  const columns = [
    { key: "title", header: "Title", render: (r: Record<string, unknown>) => <span className="font-medium">{String(r.title)}</span> },
    { key: "category", header: "Category", render: (r: Record<string, unknown>) => (
      <span className="text-xs bg-[#C8A96E]/10 text-[#C8A96E] px-2 py-0.5 rounded">{String(r.category)}</span>
    )},
    { key: "tags", header: "Tags", render: (r: Record<string, unknown>) => (
      <span className="text-xs text-[#6B6560]">{String(r.tags || "—")}</span>
    )},
    { key: "isActive", header: "Active", render: (r: Record<string, unknown>) => {
      const entry = entries.find((e) => e.id === r.id)!;
      return (
        <button onClick={(ev) => { ev.stopPropagation(); toggle(entry); }} className="text-[#6B6560] hover:text-[#C8A96E] transition-colors">
          {r.isActive ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} />}
        </button>
      );
    }},
    { key: "actions", header: "", render: (r: Record<string, unknown>) => {
      const entry = entries.find((e) => e.id === r.id)!;
      return (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(entry); }} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors"><Pencil size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); del(entry); }} className="text-[#6B6560] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
        </div>
      );
    }},
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">Knowledge Bank</h1>
            <p className="text-sm text-[#6B6560] mt-0.5">{entries.length} entries</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 h-9 px-4 text-sm font-medium bg-[#1A1A1A] text-white rounded-md hover:bg-[#C8A96E] transition-colors">
            <Plus size={14} /> Add Entry
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title or content…"
            className="h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] w-56" />
          <select value={filter} onChange={(e) => setFilter(e.target.value as KnowledgeCategory | "")}
            className="h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] bg-white">
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <DataTable columns={columns} data={entries as unknown as Record<string, unknown>[]} emptyMessage="No knowledge entries yet." />
      </div>

      <SlideOver open={panelOpen} onClose={() => setPanelOpen(false)} title={editing ? "Edit Entry" : "Add Entry"}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as KnowledgeCategory }))}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] bg-white">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 block">Tags (comma-separated)</label>
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="purpose, mindfulness, coaching"
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6560] mb-1 flex justify-between">
              Content <span className="text-[#6B6560]/60">{form.content.length} chars</span>
            </label>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={10} placeholder="Write knowledge content here. Supports plain text or markdown."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] resize-none leading-relaxed" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              className="w-4 h-4 accent-[#C8A96E]" />
            <span className="text-sm text-[#1A1A1A]">Active (visible to AI)</span>
          </label>
          <button onClick={save} disabled={saving || !form.title || !form.content}
            className="h-10 bg-[#1A1A1A] text-white text-sm font-medium rounded-md hover:bg-[#C8A96E] transition-colors disabled:opacity-50">
            {saving ? "Saving…" : editing ? "Save Changes" : "Create Entry"}
          </button>
        </div>
      </SlideOver>
    </>
  );
}
