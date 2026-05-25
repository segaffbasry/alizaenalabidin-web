"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface PriceTier { label: string; price: number; note: string; highlight: boolean }
interface EventPricingProps {
  event: { pricing: PriceTier[]; productHandle: string; accentColor: string; name: string };
}

export default function EventPricing({ event }: EventPricingProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body mb-3"
            style={{ color: event.accentColor }}
          >
            Investasi
          </p>
          <h2 className="font-display text-4xl text-[var(--color-accent)]">
            Pilih harga yang sesuai waktumu.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {event.pricing.map((tier, i) => (
            <SectionReveal key={tier.label} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-6 text-center border-2 transition-shadow ${
                  tier.highlight
                    ? "shadow-lg"
                    : "bg-white/50 border-[var(--color-gold)]/20"
                }`}
                style={
                  tier.highlight
                    ? { backgroundColor: event.accentColor, borderColor: event.accentColor }
                    : {}
                }
              >
                {tier.highlight && (
                  <span className="inline-block text-xs font-body font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    Paling Populer
                  </span>
                )}
                <p
                  className={`font-body text-sm mb-3 ${
                    tier.highlight ? "text-white/80" : "text-[var(--color-muted)]"
                  }`}
                >
                  {tier.label}
                </p>
                <p
                  className={`font-display text-3xl font-semibold mb-2 ${
                    tier.highlight ? "text-white" : "text-[var(--color-accent)]"
                  }`}
                >
                  {formatIDR(tier.price)}
                </p>
                <p
                  className={`font-body text-xs ${
                    tier.highlight ? "text-white/60" : "text-[var(--color-muted)]"
                  }`}
                >
                  {tier.note}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3} className="text-center">
          <Link
            href={`/products/${event.productHandle}`}
            className="inline-flex items-center justify-center px-10 py-4 font-body font-medium text-white rounded-xl text-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: event.accentColor }}
          >
            Daftar {event.name} →
          </Link>
          <p className="font-body text-xs text-[var(--color-muted)] mt-4">
            Pembayaran aman via Midtrans · Cicilan tersedia · Refund policy berlaku
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
