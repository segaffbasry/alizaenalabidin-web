import type { Metadata } from "next";

export const siteConfig = {
  name: "Ali Zaenal Abidin",
  description:
    "Life transformation coach, penulis bestseller, dan speaker Indonesia. Membantu ribuan orang menemukan tujuan hidup, merevisi arah, dan hidup dengan disengaja.",
  url: "https://alizaenalabidin.com",
  ogImage: "https://alizaenalabidin.com/og-default.jpg",
  twitterHandle: "@alizaenalabidin",
  locale: "id_ID",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "life coach Indonesia",
    "transformasi hidup",
    "motivator Indonesia",
    "workshop life design",
    "buku self development",
    "Ali Zaenal Abidin",
    "revisi hidup",
    "mindful manifestation",
    "tujuan hidup",
    "coaching Indonesia",
  ],
  authors: [{ name: "Ali Zaenal Abidin", url: siteConfig.url }],
  creator: "Ali Zaenal Abidin",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ali Zaenal Abidin — Life Transformation Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/fav-dark.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/fav-light.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/images/fav-dark.png",
    apple: "/images/fav-dark.png",
  },
  alternates: {
    canonical: siteConfig.url,
    languages: { "id-ID": siteConfig.url },
  },
};
