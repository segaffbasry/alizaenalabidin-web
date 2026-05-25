"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface QuotaModalProps {
  open: boolean;
  onClose: () => void;
}

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

export function QuotaModal({ open, onClose }: QuotaModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 z-50 w-full md:w-[440px] bg-[#F5F0E8] md:-translate-x-1/2 md:-translate-y-1/2 p-8 md:rounded-sm shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center mb-5">
              <span className="text-xl">✨</span>
            </div>

            {/* Copy */}
            <h2 className="font-display text-2xl text-[#1A1A1A] mb-3 leading-snug">
              You&rsquo;ve used your 10 free questions
            </h2>
            <p className="text-sm text-[#6B6560] leading-relaxed mb-7">
              Thank you for exploring with Ali. To continue the conversation — and unlock
              unlimited access — create a free account or explore Ali&rsquo;s transformation packages.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <Link href="/register" onClick={onClose}>
                <motion.span
                  className="flex items-center justify-center h-12 w-full text-sm font-medium bg-[#1A1A1A] text-[#F5F0E8] cursor-pointer select-none"
                  whileHover={{ backgroundColor: "#C8A96E", color: "#1A1A1A" }}
                  transition={{ duration: 0.2 }}
                >
                  Create Free Account
                </motion.span>
              </Link>
              <Link href="/products" onClick={onClose}>
                <motion.span
                  className="flex items-center justify-center h-12 w-full text-sm font-medium border border-[#1A1A1A]/20 text-[#1A1A1A] cursor-pointer select-none"
                  whileHover={{ borderColor: "#C8A96E", color: "#C8A96E" }}
                  transition={{ duration: 0.2 }}
                >
                  See Packages
                </motion.span>
              </Link>
            </div>

            {/* Fine print */}
            <p className="mt-5 text-center text-[10px] text-[#6B6560]/60 leading-relaxed">
              Your conversation history is saved for 30 days.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
