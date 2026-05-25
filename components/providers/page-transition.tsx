"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ ease: easeOutExpo, duration: 0.45 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
