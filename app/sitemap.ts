import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

const MEDUSA_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

async function getProductHandles(): Promise<string[]> {
  try {
    const res = await fetch(`${MEDUSA_URL}/store/products?fields=handle&limit=100`, {
      headers: { "x-publishable-api-key": PUB_KEY },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return STATIC_PRODUCT_HANDLES;
    const data = await res.json();
    return (data.products ?? []).map((p: { handle: string }) => p.handle).filter(Boolean);
  } catch {
    return STATIC_PRODUCT_HANDLES;
  }
}

const STATIC_PRODUCT_HANDLES = [
  "uncover-your-unique-purpose",
  "hidup-mau-ngapain",
  "revisi-hidup-workshop",
  "mindful-manifestation-workshop",
  "1on1-coaching-session",
];

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/revisi-hidup", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/mindful-manifestation", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/products", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tanya", priority: 0.8, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const productHandles = await getProductHandles();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = productHandles.map((handle) => ({
    url: `${siteConfig.url}/products/${handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
