"use client";

import Link from "next/link";
import type { DashboardUser } from "./dashboard-shell";

const PLAN_LABELS: Record<string, string> = {
  free: "Gratis",
  "1month": "1 Bulan",
  "6month": "6 Bulan",
  "12month": "12 Bulan",
  lifetime: "Lifetime",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function DashboardOverview({ user }: { user: DashboardUser }) {
  const isPaid = user.plan && user.plan !== "free";
  const isExpired = user.plan_expires_at && new Date(user.plan_expires_at) < new Date();
  const isActive = isPaid && !isExpired;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Membership card */}
      <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-gold)]/10">
        <p className="font-body text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3">
          Status Keanggotaan
        </p>
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            isActive
              ? "bg-[#6B8F8E] text-white"
              : "bg-[var(--color-primary)] text-[var(--color-muted)]"
          }`}>
            {PLAN_LABELS[user.plan] ?? user.plan}
          </span>
          {isExpired && (
            <span className="text-xs text-red-500 font-medium">Keanggotaan habis</span>
          )}
        </div>
        {user.plan_expires_at && (
          <p className="font-body text-sm text-[var(--color-muted)]">
            {isExpired ? "Berakhir pada" : "Aktif hingga"}{" "}
            <span className="font-semibold text-[var(--color-accent)]">
              {formatDate(user.plan_expires_at)}
            </span>
          </p>
        )}
        {!isPaid && (
          <p className="font-body text-sm text-[var(--color-muted)] mt-1">
            Upgrade untuk akses percakapan tak terbatas dengan Ali.
          </p>
        )}
        {(!isPaid || isExpired) && (
          <Link
            href="https://tanya.alizaenalabidin.com/upgrade"
            className="inline-flex items-center mt-4 px-4 py-2 bg-[var(--color-accent)] text-white font-body text-sm rounded-xl hover:bg-[var(--color-gold)] transition-colors"
          >
            {isExpired ? "Perpanjang Sekarang →" : "Upgrade Sekarang →"}
          </Link>
        )}
      </div>

      {/* Member since */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-gold)]/10">
        <p className="font-body text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">
          Bergabung Sejak
        </p>
        <p className="font-display text-2xl text-[var(--color-accent)]">
          {new Date(user.createdAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
        </p>
        <p className="font-body text-xs text-[var(--color-muted)] mt-0.5">
          {formatDate(user.createdAt)}
        </p>
      </div>

      {/* CTA */}
      <div className="bg-[var(--color-accent)] rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <p className="font-display text-xl text-white mb-2">Tanya Ali sekarang</p>
          <p className="font-body text-sm text-white/60 leading-relaxed">
            {isActive
              ? "Keanggotaan aktif — percakapan tak terbatas."
              : "Coba gratis atau upgrade untuk akses penuh."}
          </p>
        </div>
        <Link
          href="https://tanya.alizaenalabidin.com"
          className="mt-6 inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-gold)] text-white font-body text-sm rounded-xl hover:bg-[#b8986a] transition-colors"
        >
          Mulai Chat →
        </Link>
      </div>

      {/* Account info */}
      <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-gold)]/10">
        <p className="font-body text-sm font-semibold text-[var(--color-accent)] mb-4">
          Info Akun
        </p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-body">
            <span className="text-[var(--color-muted)]">Nama</span>
            <span className="text-[var(--color-accent)] font-medium">{user.name || "—"}</span>
          </div>
          <div className="flex justify-between text-sm font-body border-t border-gray-50 pt-3">
            <span className="text-[var(--color-muted)]">Email</span>
            <span className="text-[var(--color-accent)]">{user.email}</span>
          </div>
          <div className="flex justify-between text-sm font-body border-t border-gray-50 pt-3">
            <span className="text-[var(--color-muted)]">Role</span>
            <span className="text-[var(--color-accent)] capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
