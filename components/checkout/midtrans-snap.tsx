"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface MidtransSnapProps {
  snapToken: string;
  onClose?: () => void;
}

const SNAP_JS_URL = "https://app.midtrans.com/snap/snap.js";
const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";

export default function MidtransSnap({ snapToken, onClose }: MidtransSnapProps) {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    const loadAndPay = () => {
      // Remove any previously loaded snap script to avoid sandbox/production mismatch
      const existing = document.querySelector(`script[src*="midtrans"]`);
      if (existing) existing.remove();
      delete window.snap;

      const script = document.createElement("script");
      script.src = SNAP_JS_URL;
      script.setAttribute("data-client-key", CLIENT_KEY);
      script.onload = triggerSnap;
      document.head.appendChild(script);
    };

    const triggerSnap = () => {
      window.snap?.pay(snapToken, {
        onSuccess: () => {
          clearCart();
          router.push("/checkout/success");
        },
        onPending: () => {
          router.push("/checkout/pending");
        },
        onError: () => {
          router.push("/checkout/error");
        },
        onClose: () => {
          onClose?.();
        },
      });
    };

    loadAndPay();
  }, [snapToken, clearCart, router, onClose]);

  // Snap renders its own popup; this component has no visible DOM
  return null;
}
