import type { MedusaProduct, MedusaVariant } from "./medusa";

/**
 * Flat shipping fee (IDR) charged once per order that contains at least one
 * physical item. Digital products (audio, e-books, workshops, services) ship
 * for free.
 */
export const SHIPPING_FEE = 10000;

// Only these product types are ever physically shipped.
const PHYSICAL_TYPES = new Set(["book", "merchandise"]);

/**
 * Whether a given product + selected variant needs physical shipping.
 * A physical-type product can still offer a digital variant (e.g. an "E-Book"
 * variant of a book), which ships for free.
 */
export function variantRequiresShipping(product: MedusaProduct, variant: MedusaVariant): boolean {
  const type = product.type?.value?.toLowerCase();
  if (!type || !PHYSICAL_TYPES.has(type)) return false;

  const title = variant.title?.toLowerCase() ?? "";
  if (title.includes("e-book") || title.includes("ebook") || title.includes("digital")) {
    return false;
  }
  return true;
}

/** Shipping cost for a cart: the flat fee if any item is physical, else 0. */
export function cartShippingCost(items: { requiresShipping?: boolean }[]): number {
  return items.some((i) => i.requiresShipping) ? SHIPPING_FEE : 0;
}
