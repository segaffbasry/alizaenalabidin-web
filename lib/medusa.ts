const MEDUSA_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

async function medusaFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}/store${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  images?: { url: string }[];
  type?: { value: string };
  tags?: { value: string }[];
  variants: MedusaVariant[];
  status: string;
}

export interface MedusaVariant {
  id: string;
  title: string;
  sku?: string;
  inventory_quantity?: number;
  prices: { amount: number; currency_code: string }[];
  options?: Record<string, string>;
  calculated_price?: { calculated_amount: number; original_amount: number; currency_code: string };
}

export function normalizeImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  // Convert absolute localhost URLs to relative paths for Next.js Image
  return url.replace(/^https?:\/\/localhost:\d+/, "");
}

export function getVariantPrice(variant: MedusaVariant): number {
  if (variant.calculated_price?.calculated_amount) return variant.calculated_price.calculated_amount;
  return variant.prices?.[0]?.amount ?? 0;
}

export interface MedusaCart {
  id: string;
  items: MedusaLineItem[];
  total: number;
  subtotal: number;
  region_id: string;
}

export interface MedusaLineItem {
  id: string;
  title: string;
  variant_title: string;
  variant_id: string;
  product_id: string;
  thumbnail?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

// ── Products ───────────────────────────────────────────────────────────────

export async function listProducts(params?: {
  type?: string;
  limit?: number;
  offset?: number;
}): Promise<{ products: MedusaProduct[]; count: number }> {
  const qs = new URLSearchParams();
  // type filtering done client-side; store API only supports type_id[]
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.offset) qs.set("offset", String(params.offset));
  qs.set("fields", "id,title,handle,subtitle,description,thumbnail,*images,*type,tags,variants,variants.prices,variants.calculated_price,status");
  qs.set("region_id", "reg_01KSWS4EA9T96SWYGQ7HQRTHK5");

  return medusaFetch(`/products?${qs.toString()}`);
}

export async function getProduct(handle: string): Promise<{ product: MedusaProduct }> {
  const fields = "id,title,handle,subtitle,description,thumbnail,*images,*type,tags,variants,variants.prices,variants.calculated_price,status";
  const res = await medusaFetch<{ products: MedusaProduct[]; count: number }>(
    `/products?handle=${handle}&fields=${fields}&region_id=reg_01KSWS4EA9T96SWYGQ7HQRTHK5`
  );
  const product = res.products?.[0];
  if (!product) throw new Error(`Product not found: ${handle}`);
  return { product };
}

// ── Cart ───────────────────────────────────────────────────────────────────

export async function createCart(regionId: string): Promise<{ cart: MedusaCart }> {
  return medusaFetch("/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: regionId }),
    next: { revalidate: 0 },
  });
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  return medusaFetch(`/carts/${cartId}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, quantity }),
    next: { revalidate: 0 },
  });
}
