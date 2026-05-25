import type { Metadata } from "next";
import { Bebas_Neue, Dancing_Script, Inspiration, Instrument_Sans, Work_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { baseMetadata, siteConfig } from "@/lib/metadata";
import "./globals.css";

const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "900"],
  style: ["normal", "italic"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: "400",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const inspiration = Inspiration({
  variable: "--font-inspiration",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const playfairDisplay = localFont({
  src: [
    { path: "../public/fonts/PlayfairDisplay-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const malvian = localFont({
  src: "../public/fonts/Malvian.otf",
  variable: "--font-malvian",
  display: "swap",
  preload: true,
});

const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Extralight.otf", weight: "200", style: "normal" },
    { path: "../public/fonts/GeneralSans-Light.otf",      weight: "300", style: "normal" },
    { path: "../public/fonts/GeneralSans-Regular.otf",    weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-Medium.otf",     weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-Semibold.otf",   weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-Bold.otf",       weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = baseMetadata;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Zaenal Abidin",
  url: siteConfig.url,
  image: `${siteConfig.url}/ali-portrait.jpg`,
  description: siteConfig.description,
  jobTitle: "Life Transformation Coach",
  nationality: "Indonesian",
  sameAs: [
    "https://www.instagram.com/alizaenalabidin",
    "https://www.youtube.com/@alizaenalabidin",
    "https://www.tiktok.com/@alizaenalabidin",
  ],
  knowsAbout: ["Life Coaching", "Mindfulness", "Personal Development", "Life Design"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Life Transformation Coach",
  },
};

const upcomingEventJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Revisi Hidup Workshop",
    startDate: "2026-04-09",
    endDate: "2026-04-12",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Plaza 51",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bintaro",
        addressRegion: "Jakarta Selatan",
        addressCountry: "ID",
      },
    },
    description:
      "Workshop intensif 4 hari bersama Ali Zaenal Abidin. Redesign total hidupmu — clarity, tujuan, dan action plan nyata.",
    organizer: { "@type": "Person", name: "Ali Zaenal Abidin", url: siteConfig.url },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/revisi-hidup-workshop`,
      priceCurrency: "IDR",
      price: "3500000",
      availability: "https://schema.org/InStock",
    },
    url: `${siteConfig.url}/revisi-hidup`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Mindful Manifestation Workshop",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Plaza 51",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bintaro",
        addressRegion: "Jakarta Selatan",
        addressCountry: "ID",
      },
    },
    description:
      "Workshop 3 hari menggabungkan mindfulness dan manifestasi. Selaraskan pikiran, emosi, dan tindakanmu.",
    organizer: { "@type": "Person", name: "Ali Zaenal Abidin", url: siteConfig.url },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/mindful-manifestation-workshop`,
      priceCurrency: "IDR",
      price: "2750000",
      availability: "https://schema.org/InStock",
    },
    url: `${siteConfig.url}/mindful-manifestation`,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${interDisplay.variable} ${bebasNeue.variable} ${malvian.variable} ${generalSans.variable} ${dancingScript.variable} ${instrumentSans.variable} ${playfairDisplay.variable} ${workSans.variable} ${inspiration.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {upcomingEventJsonLd.map((event, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
          />
        ))}
      </head>
      <body className="bg-[#F5F0E8] text-[#1A1A1A] min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
