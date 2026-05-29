import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Life Transformation Coach & Penulis Bestseller`,
  },
  description:
    "Life transformation coach dan penulis bestseller Indonesia. Workshop Revisi Hidup, Mindful Manifestation, sesi coaching, dan buku self-development.",
  openGraph: {
    title: `${siteConfig.name} — Life Transformation Coach`,
    description:
      "Temukan tujuan hidupmu, revisi arahmu, dan hidup dengan disengaja bersama Ali Zaenal Abidin.",
    images: [{ url: `${siteConfig.url}/og-home.jpg`, width: 1200, height: 630 }],
  },
  alternates: { canonical: siteConfig.url },
};
import { EventsSection } from "@/components/home/events-section";
import { BooksSection } from "@/components/home/books-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { StatsSection } from "@/components/home/stats-section";
import { YouTubeSection } from "@/components/home/youtube-section";
import { ChatWidgetSection } from "@/components/home/chat-widget-section";
import { ScrollReset } from "@/components/ui/scroll-reset";
import { AboutSummary } from "@/components/home/about-summary";

export default function HomePage() {
  return (
    <>
      <ScrollReset />
      <HeroSection />
      <AboutSummary />
      <StatsSection />
      <ChatWidgetSection />
      <EventsSection />
      <BooksSection />
      <TestimonialsSection />
      <YouTubeSection />
    </>
  );
}
