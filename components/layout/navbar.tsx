"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type Variants, motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";
import { useLenis } from "@/hooks/use-lenis";

const BASE_NAV_LINKS = [
  { label: "About Ali", href: "/about" },
  { label: "Chat with Ali", href: "https://tanyaalizaenalabidin.vercel.app" },
  { label: "Revisi Hidup", href: "/revisi-hidup" },
  { label: "Mindful Manifestation", href: "/mindful-manifestation" },
  { label: "Store", href: "/products" },
] as const;

const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t);

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { ease: easeOutExpo, duration: 0.5 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mobileOpen) setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById("chat");
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        else el.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return;
    }
    const el = document.getElementById("chat");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }
    // When navigating away from current page to "/", ScrollReset on homepage handles it
  };
  const itemCount = useCartStore((s) => s.itemCount);
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setIsAuthed(!!data.user));
  }, []);

  const NAV_LINKS = [
    ...BASE_NAV_LINKS,
    isAuthed
      ? { label: "Dashboard", href: "/dashboard" }
      : { label: "Member", href: "/login" },
  ] as { label: string; href: string }[];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setMobileOpen(false);
    }
  }, [pathname]);

  return (
    <>
      {/* Floating pill navbar */}
      <header className="fixed top-4 sm:top-[30px] left-4 right-4 sm:left-0 sm:right-0 z-50 flex justify-center sm:px-6">
        <nav className="flex items-center bg-black/80 backdrop-blur-md w-full sm:w-auto rounded-full px-4 sm:pl-3 sm:pr-[18px] py-3 sm:py-2 shadow-xl shadow-black/20">
          {/* Logo */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="text-xl sm:text-[1.35rem] text-white px-2 sm:px-3 py-1" style={{ fontFamily: "var(--font-logo)" }}
          >
            Ali
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center ml-1">
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 + i * 0.06 }}
              >
                {href.startsWith("http") ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 xl:px-3 py-1.5 whitespace-nowrap font-body font-medium text-white"
                    style={{ fontSize: "clamp(14px, 1.5vw, 21px)", lineHeight: "29px" }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="px-2.5 xl:px-3 py-1.5 whitespace-nowrap font-body font-medium text-white"
                    style={{ fontSize: "clamp(14px, 1.5vw, 21px)", lineHeight: "29px" }}
                  >
                    {label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Spacer — pushes cart & burger to the right on mobile */}
          <div className="flex-1 lg:hidden" />

          {/* Cart */}
          <button
            onClick={() => useCartStore.getState().openCart()}
            aria-label="Keranjang belanja"
            className="relative flex items-center justify-center w-9 h-9 text-white ml-1"
          >
            <ShoppingCart size={22} />
            {itemCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8A96E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {itemCount()}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-9 h-9 text-white ml-1"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-[#1A1A1A] flex flex-col justify-center px-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ ease: easeOutExpo, duration: 0.5 }}
          >
            <motion.ul
              className="flex flex-col gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.li key={href} variants={itemVariants}>
                  {href.startsWith("http") ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-4xl sm:text-5xl leading-none transition-colors hover:text-[#C8A96E] text-white"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={cn(
                        "font-display text-4xl sm:text-5xl leading-none transition-colors hover:text-[#C8A96E]",
                        pathname === href ? "text-[#C8A96E]" : "text-white"
                      )}
                    >
                      {label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
