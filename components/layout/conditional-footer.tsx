"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  // Pages that use their own footer via segment layout
  if (pathname.startsWith("/revisi-hidup")) return null;
  return <Footer />;
}
