"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { DashboardUser } from "./dashboard-shell";

interface SettingsProps {
  user: DashboardUser;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function DashboardSettings({ user }: SettingsProps) {
  const [name, setName] = useState(user.name ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileState, setProfileState] = useState<SaveState>("idle");
  const [passwordState, setPasswordState] = useState<SaveState>("idle");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileState("saving");

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menyimpan");
      setProfileState("saved");
      startTransition(() => router.refresh());
      setTimeout(() => setProfileState("idle"), 2500);
    } catch (err: unknown) {
      const e = err as Error;
      setProfileError(e.message);
      setProfileState("error");
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.");
      return;
    }

    setPasswordState("saving");
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengubah password");
      setPasswordState("saved");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordState("idle"), 2500);
    } catch (err: unknown) {
      const e = err as Error;
      setPasswordError(e.message);
      setPasswordState("error");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile settings */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-gold)]/10">
        <h2 className="font-display text-xl text-[var(--color-accent)] mb-5">Profil</h2>

        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-all"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-body text-sm text-[var(--color-muted)] cursor-not-allowed"
            />
            <p className="font-body text-xs text-[var(--color-muted)] mt-1">
              Email tidak dapat diubah.
            </p>
          </div>

          <FeedbackRow state={profileState} error={profileError}>
            <button
              type="submit"
              disabled={profileState === "saving" || isPending}
              className="px-6 py-2.5 bg-[var(--color-accent)] text-white font-body text-sm rounded-xl hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
            >
              {profileState === "saving" ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </FeedbackRow>
        </form>
      </section>

      {/* Password */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-gold)]/10">
        <h2 className="font-display text-xl text-[var(--color-accent)] mb-5">Ubah Password</h2>

        <form onSubmit={changePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">
                Password Baru
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-all"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">
                Konfirmasi
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:ring-2 transition-all ${
                  confirmPassword && confirmPassword !== newPassword
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                }`}
              />
            </div>
          </div>

          <FeedbackRow state={passwordState} error={passwordError}>
            <button
              type="submit"
              disabled={passwordState === "saving"}
              className="px-6 py-2.5 bg-[var(--color-accent)] text-white font-body text-sm rounded-xl hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
            >
              {passwordState === "saving" ? "Mengubah..." : "Ubah Password"}
            </button>
          </FeedbackRow>
        </form>
      </section>

      {/* Account info */}
      <section className="bg-white/50 rounded-2xl p-5 border border-[var(--color-gold)]/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-sm font-medium text-[var(--color-accent)]">
              Bergabung sejak
            </p>
            <p className="font-body text-sm text-[var(--color-muted)]">
              {new Date(user.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`text-xs font-body font-medium px-3 py-1 rounded-full uppercase tracking-wide ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
            }`}
          >
            {user.role}
          </span>
        </div>
      </section>
    </div>
  );
}

function FeedbackRow({
  state,
  error,
  children,
}: {
  state: SaveState;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 pt-1">
      {children}
      <AnimatePresence>
        {state === "saved" && (
          <motion.p
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-sm text-green-600"
          >
            ✓ Tersimpan
          </motion.p>
        )}
        {(state === "error" || error) && (
          <motion.p
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-sm text-red-500"
          >
            {error ?? "Gagal menyimpan"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
