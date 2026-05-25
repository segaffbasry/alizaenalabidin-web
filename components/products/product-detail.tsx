"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { MedusaProduct, MedusaVariant, getVariantPrice, normalizeImageUrl } from "@/lib/medusa";
import { useCartStore, formatIDR } from "@/lib/store/cart-store";

interface ProductDetailProps {
  product: MedusaProduct;
}

const TYPE_LABEL: Record<string, string> = {
  book: "Book",
  event: "Event",
  merchandise: "Merchandise",
  workshop: "Event",
  service: "Service",
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const allImages = [
    ...(product.thumbnail ? [{ url: normalizeImageUrl(product.thumbnail)! }] : []),
    ...(product.images ?? [])
      .filter((img) => img.url !== product.thumbnail)
      .map((img) => ({ url: normalizeImageUrl(img.url)! })),
  ];

  const [activeImage, setActiveImage] = useState(allImages[0]?.url ?? "");
  const [selectedVariant, setSelectedVariant] = useState<MedusaVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const price = getVariantPrice(selectedVariant);
  const typeLabel = product.type?.value ? (TYPE_LABEL[product.type.value] ?? product.type.value) : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price,
        thumbnail: normalizeImageUrl(product.thumbnail),
      });
    }
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const descLines = (product.description ?? "").split("\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Mobile layout: stacked */}
        <div className="flex flex-col sm:hidden gap-6 pt-6">
          {/* Mobile image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#e8e3da]">
            {activeImage ? (
              <Image src={activeImage} alt={product.title} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif", color: "#6B6560" }}>{product.title}</div>
            )}
          </div>
          {/* Mobile thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex flex-row gap-2 overflow-x-auto">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(img.url)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${activeImage === img.url ? "border-[#724233]" : "border-transparent"}`}>
                  <Image src={img.url} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Mobile info */}
          <MobileInfo product={product} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant}
            quantity={quantity} setQuantity={setQuantity} price={price} typeLabel={typeLabel}
            descLines={descLines} handleAddToCart={handleAddToCart} added={added} />
        </div>

        {/* Desktop layout: side by side */}
        <div className="hidden sm:flex gap-8 items-start">

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex flex-col gap-2 shrink-0 w-16 pt-1">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === img.url ? "border-[#724233]" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="shrink-0 w-[450px]">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#e8e3da]">
              {activeImage ? (
                <Image src={activeImage} alt={product.title} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif", color: "#6B6560" }}>
                  {product.title}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6c6c6c" }}>
              <Link href="/products" className="hover:text-[#724233] transition-colors">Store</Link>
              {typeLabel && (
                <>
                  <span>/</span>
                  <span style={{ color: "#262626" }}>{typeLabel}</span>
                </>
              )}
            </nav>

            {/* Title */}
            <h1 className="mb-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", fontWeight: 700, color: "#262626", lineHeight: "1.2" }}>
              {product.title}
            </h1>

            {/* Price */}
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 500, color: "#262626" }}>
              {formatIDR(price)}
            </p>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="mb-5">
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className="px-4 py-2 rounded-lg border transition-all"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        backgroundColor: selectedVariant.id === v.id ? "#262626" : "white",
                        color: selectedVariant.id === v.id ? "white" : "#262626",
                        borderColor: selectedVariant.id === v.id ? "#262626" : "#e0e0e0",
                      }}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-0 mb-6 border border-[#e0e0e0] rounded-xl w-fit overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                style={{ color: "#262626" }}
              >
                <Minus size={16} />
              </button>
              <span className="w-11 h-11 flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 500, color: "#262626" }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                style={{ color: "#262626" }}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mb-8 transition-opacity hover:opacity-90 active:scale-[0.99]"
              style={{
                backgroundColor: added ? "#4a7c59" : "#724233",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "white",
              }}
            >
              <ShoppingCart size={18} />
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            {/* Description */}
            {descLines.length > 0 && (
              <div className="space-y-1.5">
                {descLines.map((line, i) => (
                  <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: "1.6" }}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>{/* end desktop flex */}

      </div>
    </main>
  );
}

/* ── shared info block used for mobile ── */
function MobileInfo({ product, selectedVariant, setSelectedVariant, quantity, setQuantity, price, typeLabel, descLines, handleAddToCart, added }: {
  product: MedusaProduct;
  selectedVariant: MedusaVariant;
  setSelectedVariant: (v: MedusaVariant) => void;
  quantity: number;
  setQuantity: (n: number) => void;
  price: number;
  typeLabel: string | null;
  descLines: string[];
  handleAddToCart: () => void;
  added: boolean;
}) {
  return (
    <div className="pt-1 pb-8">
      <nav className="flex items-center gap-2 mb-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6c6c6c" }}>
        <Link href="/products" className="hover:text-[#724233] transition-colors">Store</Link>
        {typeLabel && (<><span>/</span><span style={{ color: "#262626" }}>{typeLabel}</span></>)}
      </nav>
      <h1 className="mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 700, color: "#262626", lineHeight: "1.2" }}>
        {product.title}
      </h1>
      <p className="mb-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 500, color: "#262626" }}>
        {formatIDR(price)}
      </p>
      {product.variants.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button key={v.id} onClick={() => setSelectedVariant(v)}
              className="px-4 py-2 rounded-lg border transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
                backgroundColor: selectedVariant.id === v.id ? "#262626" : "white",
                color: selectedVariant.id === v.id ? "white" : "#262626",
                borderColor: selectedVariant.id === v.id ? "#262626" : "#e0e0e0" }}>
              {v.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-0 mb-5 border border-[#e0e0e0] rounded-xl w-fit overflow-hidden bg-white">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f5]" style={{ color: "#262626" }}><Minus size={16} /></button>
        <span className="w-11 h-11 flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 500, color: "#262626" }}>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f5]" style={{ color: "#262626" }}><Plus size={16} /></button>
      </div>
      <button onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mb-6 transition-opacity hover:opacity-90"
        style={{ backgroundColor: added ? "#4a7c59" : "#724233", fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 500, color: "white" }}>
        <ShoppingCart size={18} />
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
      {descLines.length > 0 && (
        <div className="space-y-1.5">
          {descLines.map((line, i) => (
            <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: "1.6" }}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
