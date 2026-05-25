import { Suspense } from "react";
import { listProducts, MedusaProduct } from "@/lib/medusa";
import ProductsGrid from "@/components/products/products-grid";
import ProductsFilter from "@/components/products/products-filter";

export const metadata = {
  title: "Products | Ali Zaenal Abidin",
  description:
    "Buku, workshop, dan sesi coaching bersama Ali Zaenal Abidin — life transformation coach Indonesia.",
};

const FILTER_TABS = [
  { label: "All", value: "" },
  { label: "Book", value: "book" },
  { label: "Event", value: "event" },
  { label: "Merchandise", value: "merchandise" },
];

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { type } = await searchParams;

  let products: MedusaProduct[] = [];

  try {
    const data = await listProducts({ limit: 50 });
    products = data.products ?? [];
  } catch {
    products = PLACEHOLDER_PRODUCTS;
  }

  // "event" in the UI maps to "workshop" in Medusa type values
  const typeValueMap: Record<string, string> = { event: "workshop" };
  const medusaType = type ? (typeValueMap[type] ?? type) : null;

  const filtered = medusaType
    ? products.filter((p) => p.type?.value === medusaType)
    : products;

  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20">

        {/* Mobile: horizontal pill filter */}
        <div className="flex sm:hidden gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const active = (type || "") === tab.value;
            return (
              <a
                key={tab.value}
                href={tab.value ? `/products?type=${tab.value}` : "/products"}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  whiteSpace: "nowrap",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `1.5px solid ${active ? "#262626" : "#ddd"}`,
                  backgroundColor: active ? "#262626" : "white",
                  color: active ? "white" : "#6c6c6c",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </a>
            );
          })}
        </div>

        <div className="flex gap-12">
          {/* Sidebar — desktop only */}
          <aside className="hidden sm:block w-44 shrink-0 pt-2">
            <ProductsFilter tabs={FILTER_TABS} currentType={type || ""} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid products={filtered} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/50 rounded-xl aspect-square animate-pulse" />
      ))}
    </div>
  );
}

const PLACEHOLDER_PRODUCTS: MedusaProduct[] = [
  {
    id: "ph-1",
    title: "Tumbler Stainless Steel 500ml REVISI HIDUP",
    handle: "tumbler-revisi-hidup",
    subtitle: "",
    type: { value: "merchandise" },
    thumbnail: "https://placehold.co/400x400/e8e3d9/1A1A1A?text=Tumbler",
    images: [],
    variants: [{ id: "ph-1-v1", title: "Default", prices: [{ amount: 12000000, currency_code: "idr" }] }],
    status: "published",
  },
  {
    id: "ph-2",
    title: 'Buku "Uncover Your Unique Purpose" oleh Ali Zaenal Abidin',
    handle: "uncover-your-unique-purpose",
    subtitle: "",
    type: { value: "book" },
    thumbnail: "https://placehold.co/400x400/d4e8e3/1A1A1A?text=UYUP",
    images: [],
    variants: [{ id: "ph-2-v1", title: "Buku Fisik", prices: [{ amount: 29400000, currency_code: "idr" }] }],
    status: "published",
  },
  {
    id: "ph-3",
    title: "Exclusive Jacket by REVISI HIDUP",
    handle: "exclusive-jacket-revisi-hidup",
    subtitle: "",
    type: { value: "merchandise" },
    thumbnail: "https://placehold.co/400x400/1A1A1A/ffffff?text=Jacket",
    images: [],
    variants: [{ id: "ph-3-v1", title: "Default", prices: [{ amount: 21200000, currency_code: "idr" }] }],
    status: "published",
  },
  {
    id: "ph-4",
    title: "Mindful Manifestation Workshop",
    handle: "mindful-manifestation-workshop",
    subtitle: "",
    type: { value: "event" },
    thumbnail: "https://placehold.co/400x400/f0ece4/1A1A1A?text=Mindful",
    images: [],
    variants: [{ id: "ph-4-v1", title: "Online", prices: [{ amount: 27500000, currency_code: "idr" }] }],
    status: "published",
  },
  {
    id: "ph-5",
    title: "Revisi Hidup Workshop",
    handle: "revisi-hidup-workshop",
    subtitle: "",
    type: { value: "event" },
    thumbnail: "https://placehold.co/400x400/C8A96E/ffffff?text=Revisi+Hidup",
    images: [],
    variants: [{ id: "ph-5-v1", title: "Offline", prices: [{ amount: 35000000, currency_code: "idr" }] }],
    status: "published",
  },
];
