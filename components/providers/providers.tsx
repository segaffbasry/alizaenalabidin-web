"use client";

import { LenisProvider } from "./lenis-provider";
import { PageTransition } from "./page-transition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <PageTransition>{children}</PageTransition>
    </LenisProvider>
  );
}
