"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/use-lenis";

type Props = {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Footer nav link. Behaves like next/link, except that clicking a link to "/"
 * while already on the homepage smooth-scrolls to the top instead of being a
 * no-op (fixes the dead "Home" footer link).
 */
export function FooterNavLink({ href, className, style, children }: Props) {
  const pathname = usePathname();
  const { lenis } = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
