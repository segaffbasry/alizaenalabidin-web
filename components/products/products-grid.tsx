"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { MedusaProduct, getVariantPrice, normalizeImageUrl } from "@/lib/medusa";
import { formatIDR, useCartStore } from "@/lib/store/cart-store";

interface ProductsGridProps {
  products: MedusaProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-[var(--color-muted)]" style={{ fontFamily: "Inter, sans-serif" }}>
        Tidak ada produk tersedia.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))", gap: "clamp(16px, 3vw, 32px)" }}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: MedusaProduct; index: number }) {
  const { addItem, openCart } = useCartStore();
  const [hovered, setHovered] = useState(false);

  const allImages = [
    ...(product.thumbnail ? [normalizeImageUrl(product.thumbnail)!] : []),
    ...(product.images ?? [])
      .filter((img) => img.url !== product.thumbnail)
      .map((img) => normalizeImageUrl(img.url)!),
  ];
  const primaryImage = allImages[0];
  const hoverImage = allImages[1];

  const lowestPrice = product.variants.reduce(
    (min, v) => {
      const price = getVariantPrice(v);
      return price > 0 && price < min ? price : min;
    },
    Infinity
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const firstVariant = product.variants[0];
    if (!firstVariant) return;
    addItem({
      id: `${product.id}-${firstVariant.id}`,
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: getVariantPrice(firstVariant),
      thumbnail: normalizeImageUrl(product.thumbnail) ?? undefined,
    });
    openCart();
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      {/* Image */}
      <div
        className="relative overflow-hidden mb-3"
        style={{ borderRadius: "12px", aspectRatio: "1/1", backgroundColor: "#e8e3da" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {primaryImage ? (
          <>
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className="object-cover transition-opacity duration-500"
              style={{ opacity: hovered && hoverImage ? 0 : 1 }}
            />
            {hoverImage && (
              <Image
                src={hoverImage}
                alt={`${product.title} alternate`}
                fill
                className="object-cover transition-opacity duration-500"
                style={{ opacity: hovered ? 1 : 0 }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm p-4 text-center" style={{ color: "#6B6560", fontFamily: "Inter, sans-serif" }}>
            {product.title}
          </div>
        )}
        {/* Add button */}
        <button
          onClick={handleAdd}
          className="absolute top-3 left-3 flex items-center gap-1.5 text-white hover:opacity-90 active:scale-95 transition-all"
          style={{ backgroundColor: "#724233", fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 500, padding: "6px 12px", borderRadius: "6px", lineHeight: "16px" }}
        >
          <ShoppingCart size={14} />
          Add
        </button>
      </div>

      {/* Title */}
      <p
        className="line-clamp-2 mb-1 group-hover:opacity-70 transition-opacity"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: 600, color: "#262626", lineHeight: "28px" }}
      >
        {product.title}
      </p>

      {/* Price */}
      {lowestPrice < Infinity && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: 500, color: "#724233", lineHeight: "22px" }}>
          {formatIDR(lowestPrice)}
        </p>
      )}
    </Link>
  );
}
