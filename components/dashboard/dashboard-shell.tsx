"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import DashboardOverview from "./dashboard-overview";
import DashboardOrders from "./dashboard-orders";
import DashboardSettings from "./dashboard-settings";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

type Tab = "overview" | "orders" | "settings";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◉" },
  // { id: "orders", label: "Pesanan Saya", icon: "📦" },
  { id: "settings", label: "Pengaturan", icon: "⚙️" },
];

export interface DashboardUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  plan: string;
  plan_expires_at: string | null;
  createdAt: string;
}

interface DashboardShellProps {
  user: DashboardUser;
}

export default function DashboardShell({ user }: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pt-6">
        <div>
          <p className="font-body text-xs text-[var(--color-gold)] uppercase tracking-widest mb-1">
            Dashboard
          </p>
          <h1 className="font-display text-3xl text-[var(--color-accent)]">
            Halo, {user.name?.split(" ")[0] ?? "Kamu"} 👋
          </h1>
          <p className="font-body text-sm text-[var(--color-muted)] mt-1">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://tanyaalizaenalabidin.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-body text-sm rounded-xl hover:bg-[var(--color-gold)] transition-colors"
          >
            Tanya Ali →
          </a>
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="px-4 py-2 border border-gray-200 text-[var(--color-muted)] font-body text-sm rounded-xl hover:border-red-200 hover:text-red-500 transition-colors"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white/60 rounded-2xl p-1 mb-6 w-fit border border-[var(--color-gold)]/10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ duration: 0.2, ease: easeOut }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="text-base leading-none">{tab.icon}</span>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: easeOut }}
        >
          {activeTab === "overview" && (
            <DashboardOverview user={user} />
          )}
          {activeTab === "orders" && <DashboardOrders userEmail={user.email} />}
          {activeTab === "settings" && <DashboardSettings user={user} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
