"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/upgrade";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError("Password dan konfirmasi tidak cocok."); return; }
    if (password.length < 8) { setError("Password minimal 8 karakter."); return; }

    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (err) {
      setError(err.message === "User already registered"
        ? "Email sudah terdaftar. Silakan login."
        : err.message);
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const passwordStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 8) return "weak";
    if (p.length < 12 || !/[0-9]/.test(p)) return "medium";
    return "strong";
  };
  const strength = passwordStrength(password);
  const strengthLabel = { weak: "Lemah", medium: "Sedang", strong: "Kuat" };
  const strengthColor = { weak: "bg-red-400", medium: "bg-amber-400", strong: "bg-green-500" };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className="text-center mb-8">
        <Link href="/" className="font-display text-2xl text-[var(--color-accent)] hover:text-[var(--color-gold)] transition-colors">
          Ali Zaenal Abidin
        </Link>
        <p className="font-body text-[var(--color-muted)] text-sm mt-1">Buat akun gratis — mulai bertanya kepada Ali</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[var(--color-gold)]/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[var(--color-accent)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-all"
              placeholder="Nama kamu"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[var(--color-accent)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-all"
              placeholder="kamu@email.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 font-body text-sm text-[var(--color-accent)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-all"
                placeholder="Minimal 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {strength && (
              <div className="mt-2">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${strengthColor[strength]}`}
                    initial={{ width: 0 }}
                    animate={{ width: strength === "weak" ? "33%" : strength === "medium" ? "66%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="font-body text-xs text-[var(--color-muted)] mt-1">
                  Kekuatan password: <span className="font-medium">{strengthLabel[strength]}</span>
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-[var(--color-accent)] mb-1.5">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full px-4 py-3 pr-12 rounded-xl border font-body text-sm text-[var(--color-accent)] placeholder:text-gray-300 focus:outline-none focus:ring-2 transition-all ${
                  confirm && confirm !== password
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)]"
                }`}
                placeholder="Ulangi password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-body text-red-600 bg-red-50 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[var(--color-accent)] text-white font-body font-medium rounded-xl hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mendaftarkan..." : "Buat Akun Gratis"}
          </button>
        </form>
      </div>

      <p className="text-center font-body text-sm text-[var(--color-muted)] mt-6">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-[var(--color-gold)] hover:underline font-medium">
          Masuk
        </Link>
      </p>
    </motion.div>
  );
}

