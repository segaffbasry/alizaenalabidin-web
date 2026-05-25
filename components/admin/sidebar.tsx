"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, MessageSquare, Bot,
  ScrollText, Users, Settings, LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Knowledge Bank", href: "/admin/knowledge", icon: BookOpen },
  { label: "Q&A Pairs", href: "/admin/qa-pairs", icon: MessageSquare },
  { label: "Bot Persona", href: "/admin/persona", icon: Bot },
  { label: "Conversations", href: "/admin/conversations", icon: ScrollText },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

interface SidebarProps {
  adminName?: string;
}

export function Sidebar({ adminName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
            <span className="text-[9px] font-bold text-white">AZA</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">Admin Panel</p>
            <p className="text-[10px] text-[#6B6560]">alizaenalabidin.com</p>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-0.5">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group",
                    active
                      ? "bg-[#C8A96E]/10 text-[#1A1A1A] font-medium"
                      : "text-[#6B6560] hover:bg-gray-50 hover:text-[#1A1A1A]"
                  )}
                >
                  <Icon size={16} className={active ? "text-[#C8A96E]" : "text-current"} />
                  {label}
                  {active && <ChevronRight size={12} className="ml-auto text-[#C8A96E]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-medium text-white">
              {adminName?.charAt(0).toUpperCase() ?? "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#1A1A1A] truncate">{adminName ?? "Admin"}</p>
            <p className="text-[10px] text-[#6B6560]">Administrator</p>
          </div>
        </div>
        <button
          onClick={async () => { await createClient().auth.signOut(); router.push("/login"); }}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#6B6560] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 z-50 w-56 bg-white shadow-xl">
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}
