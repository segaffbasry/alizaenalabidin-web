"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { normalizeImageUrl } from "@/lib/medusa";

const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(amount / 100) + "Rp";
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCartStore();

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const subtotal = total();
  const count = itemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-50 w-[420px] max-w-full bg-white flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: easeOut, duration: 0.35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-body font-medium text-base text-[#111]">Your cart</span>
                <span className="font-body text-sm text-[#888] bg-gray-100 rounded-full px-2 py-0.5 min-w-[24px] text-center">
                  {count}
                </span>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-[#888] hover:text-[#111] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="font-body text-sm text-[#888]">Your cart is empty</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-[72px] h-[72px] flex-shrink-0 bg-gray-100 rounded overflow-hidden relative">
                        {item.thumbnail ? (
                          <Image src={normalizeImageUrl(item.thumbnail) ?? item.thumbnail} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-body text-sm text-[#111] leading-snug line-clamp-2 flex-1">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-body text-sm font-medium text-[#111] whitespace-nowrap">
                              {formatIDR(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              aria-label="Remove item"
                              className="text-[#aaa] hover:text-[#111] transition-colors"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-[#111]">Subtotal</span>
                <span className="font-body text-sm font-medium text-[#111]">
                  {subtotal === 0 ? "0Rp" : formatIDR(subtotal)}
                </span>
              </div>
              <Link href="/checkout" onClick={closeCart}>
                <button
                  disabled={count === 0}
                  className="w-full h-12 rounded font-body text-sm font-medium transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-[#111] text-white hover:bg-[#333]"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
