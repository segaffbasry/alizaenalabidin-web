"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import type { Role } from "@/lib/generated/prisma/client";

type UserRow = {
  id: string; email: string; name?: string | null; role: Role;
  quotaGranted: number; createdAt: string;
  _count: { conversations: number };
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [grantModal, setGrantModal] = useState<{ user: UserRow; amount: string } | null>(null);

  async function load() {
    const res = await fetch("/api/admin/users");
    setUsers(await res.json() as UserRow[]);
  }
  useEffect(() => { load(); }, []);

  async function updateUser(id: string, data: Partial<{ role: Role; quotaGranted: number }>) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    load();
  }

  const columns = [
    { key: "name", header: "Name", render: (r: Record<string, unknown>) => (
      <span className="font-medium">{String(r.name ?? "—")}</span>
    )},
    { key: "email", header: "Email", render: (r: Record<string, unknown>) => (
      <span className="text-[#6B6560] text-sm">{String(r.email)}</span>
    )},
    { key: "role", header: "Role", render: (r: Record<string, unknown>) => {
      const user = users.find((u) => u.id === r.id)!;
      return (
        <select
          value={String(r.role)}
          onChange={(e) => updateUser(user.id, { role: e.target.value as Role })}
          onClick={(e) => e.stopPropagation()}
          className="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#C8A96E]"
        >
          <option value="member">member</option>
          <option value="admin">admin</option>
        </select>
      );
    }},
    { key: "quotaGranted", header: "Bonus Quota", render: (r: Record<string, unknown>) => (
      <span className="font-mono text-sm">+{String(r.quotaGranted)}</span>
    )},
    { key: "_count", header: "Convos", render: (r: Record<string, unknown>) => {
      const cnt = r._count as { conversations: number };
      return <span>{cnt.conversations}</span>;
    }},
    { key: "createdAt", header: "Joined", render: (r: Record<string, unknown>) => (
      <span className="text-xs text-[#6B6560]">{new Date(r.createdAt as string).toLocaleDateString("id-ID")}</span>
    )},
    { key: "actions", header: "", render: (r: Record<string, unknown>) => {
      const user = users.find((u) => u.id === r.id)!;
      return (
        <button
          onClick={(e) => { e.stopPropagation(); setGrantModal({ user, amount: "10" }); }}
          className="text-xs text-[#C8A96E] border border-[#C8A96E]/30 px-2 py-1 rounded hover:bg-[#C8A96E]/10 transition-colors"
        >
          Grant Quota
        </button>
      );
    }},
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Users</h1>
          <p className="text-sm text-[#6B6560] mt-0.5">{users.length} registered users</p>
        </div>
        <DataTable columns={columns} data={users as unknown as Record<string, unknown>[]} />
      </div>

      {grantModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-80 shadow-2xl">
            <h3 className="font-semibold text-[#1A1A1A] mb-1">Grant Bonus Questions</h3>
            <p className="text-sm text-[#6B6560] mb-4">{grantModal.user.email}</p>
            <input
              type="number" min={1} value={grantModal.amount}
              onChange={(e) => setGrantModal((m) => m && { ...m, amount: e.target.value })}
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#C8A96E] mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await updateUser(grantModal.user.id, {
                    quotaGranted: grantModal.user.quotaGranted + parseInt(grantModal.amount),
                  });
                  setGrantModal(null);
                }}
                className="flex-1 h-9 bg-[#1A1A1A] text-white text-sm rounded-md hover:bg-[#C8A96E] transition-colors"
              >
                Confirm
              </button>
              <button onClick={() => setGrantModal(null)} className="flex-1 h-9 border border-gray-200 text-sm rounded-md text-[#6B6560] hover:text-[#1A1A1A]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
