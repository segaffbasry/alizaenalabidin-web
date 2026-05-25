import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import AboutHero from "@/components/about/about-hero";

export const metadata: Metadata = {
  title: "Tentang Ali",
  description:
    "Mengenal Ali Zaenal Abidin — life transformation coach, penulis bestseller, dan speaker yang telah membantu lebih dari 50.000 orang menemukan arah hidup mereka.",
  openGraph: {
    title: "Tentang Ali Zaenal Abidin",
    description:
      "12 tahun pengalaman, 50.000+ peserta, 19+ kota. Mengenal perjalanan dan misi Ali Zaenal Abidin.",
    images: [{ url: `${siteConfig.url}/og-about.jpg`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-primary)]">
      <AboutHero />
    </main>
  );
}
