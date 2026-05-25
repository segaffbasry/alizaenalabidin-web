import { notFound } from "next/navigation";
import { getProduct, MedusaProduct } from "@/lib/medusa";
import ProductDetail from "@/components/products/product-detail";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  try {
    const { product } = await getProduct(handle);
    return {
      title: `${product.title} | Ali Zaenal Abidin`,
      description: product.description ?? product.subtitle,
    };
  } catch {
    return { title: "Produk | Ali Zaenal Abidin" };
  }
}

// Placeholder lookup for offline dev
const PLACEHOLDERS: Record<string, MedusaProduct> = {
  "uncover-your-unique-purpose": {
    id: "ph-1",
    title: "Uncover Your Unique Purpose",
    handle: "uncover-your-unique-purpose",
    subtitle: "Temukan Tujuan Hidupmu yang Sesungguhnya",
    description:
      "Buku transformatif karya Ali Zaenal Abidin yang memandu Anda menemukan tujuan hidup yang autentik. Melalui latihan praktis dan wawasan mendalam, buku ini membantu Anda keluar dari kebingungan dan menemukan arah yang benar-benar bermakna.\n\nDilengkapi dengan worksheet interaktif, journaling prompts, dan kerangka kerja PURPOSE yang telah terbukti membantu ribuan pembaca menemukan clarity dalam hidupnya.",
    type: { value: "book" },
    thumbnail: "https://placehold.co/400x600/C8A96E/1A1A1A?text=UYUP",
    images: [{ url: "https://placehold.co/400x600/C8A96E/1A1A1A?text=UYUP" }],
    tags: [{ value: "bestseller" }],
    variants: [
      { id: "ph-1-v1", title: "Buku Fisik", sku: "UYUP-PHYSICAL", prices: [{ amount: 15000000, currency_code: "idr" }], inventory_quantity: 100 },
      { id: "ph-1-v2", title: "E-Book", sku: "UYUP-EBOOK", prices: [{ amount: 7900000, currency_code: "idr" }] },
    ],
    status: "published",
  },
  "hidup-mau-ngapain": {
    id: "ph-2",
    title: "Hidup Mau Ngapain?",
    handle: "hidup-mau-ngapain",
    subtitle: "Panduan Praktis Merancang Hidup Bermakna",
    description:
      "Buku bestseller Ali Zaenal Abidin yang menjawab pertanyaan paling fundamental: apa sebenarnya yang ingin kamu lakukan dengan hidupmu? Dengan bahasa yang ringan namun mengena, buku ini mengajak Anda merefleksikan nilai, impian, dan langkah nyata menuju kehidupan yang Anda inginkan.",
    type: { value: "book" },
    thumbnail: "https://placehold.co/400x600/1A1A1A/C8A96E?text=HMN",
    images: [{ url: "https://placehold.co/400x600/1A1A1A/C8A96E?text=HMN" }],
    tags: [{ value: "bestseller" }, { value: "life-design" }],
    variants: [
      { id: "ph-2-v1", title: "Buku Fisik", prices: [{ amount: 13900000, currency_code: "idr" }], inventory_quantity: 150 },
      { id: "ph-2-v2", title: "E-Book", prices: [{ amount: 6900000, currency_code: "idr" }] },
    ],
    status: "published",
  },
  "revisi-hidup-workshop": {
    id: "ph-3",
    title: "Revisi Hidup Workshop",
    handle: "revisi-hidup-workshop",
    subtitle: "4-Day Intensive Life Redesign Experience",
    description:
      "Workshop intensif 4 hari bersama Ali Zaenal Abidin untuk me-redesign total hidup Anda. Melalui sesi deep-dive, journaling, dan peer group coaching, Anda akan keluar dengan clarity penuh tentang arah hidup, nilai inti, dan rencana aksi yang konkret.\n\nTermasuk: workbook eksklusif, akses komunitas alumni, dan follow-up session 30 hari setelah workshop.",
    type: { value: "workshop" },
    thumbnail: "https://placehold.co/800x500/F5F0E8/1A1A1A?text=Revisi+Hidup",
    images: [{ url: "https://placehold.co/800x500/F5F0E8/1A1A1A?text=Revisi+Hidup" }],
    variants: [
      { id: "ph-3-v1", title: "9-12 April 2026", prices: [{ amount: 350000000, currency_code: "idr" }], inventory_quantity: 30 },
      { id: "ph-3-v2", title: "7-10 Juli 2026", prices: [{ amount: 350000000, currency_code: "idr" }], inventory_quantity: 30 },
      { id: "ph-3-v3", title: "6-9 Oktober 2026", prices: [{ amount: 350000000, currency_code: "idr" }], inventory_quantity: 30 },
    ],
    status: "published",
  },
  "mindful-manifestation-workshop": {
    id: "ph-4",
    title: "Mindful Manifestation Workshop",
    handle: "mindful-manifestation-workshop",
    subtitle: "3-Day Manifestation & Mindfulness Retreat",
    description:
      "Workshop 3 hari yang menggabungkan praktik mindfulness dengan teknik manifestasi yang terbukti efektif. Pelajari cara menyelaraskan pikiran, emosi, dan tindakan untuk mewujudkan kehidupan yang Anda impikan — dengan pendekatan yang sadar dan autentik.",
    type: { value: "workshop" },
    thumbnail: "https://placehold.co/800x500/EEF2EC/1A1A1A?text=Mindful+Manifestation",
    images: [{ url: "https://placehold.co/800x500/EEF2EC/1A1A1A?text=Mindful+Manifestation" }],
    variants: [
      { id: "ph-4-v1", title: "1-3 Mei 2026", prices: [{ amount: 275000000, currency_code: "idr" }], inventory_quantity: 25 },
      { id: "ph-4-v2", title: "14-16 Agustus 2026", prices: [{ amount: 275000000, currency_code: "idr" }], inventory_quantity: 25 },
    ],
    status: "published",
  },
  "1on1-coaching-session": {
    id: "ph-5",
    title: "1-on-1 Coaching Session with Ali",
    handle: "1on1-coaching-session",
    subtitle: "Sesi Coaching Pribadi Bersama Ali Zaenal Abidin",
    description:
      "Sesi coaching pribadi eksklusif bersama Ali Zaenal Abidin selama 60 menit via Zoom. Dapatkan panduan langsung, clarity, dan action plan yang dipersonalisasi sesuai situasi dan tujuan hidup Anda. Kuota sangat terbatas — hanya 8 slot per bulan.",
    type: { value: "service" },
    thumbnail: "https://placehold.co/800x500/C8A96E/1A1A1A?text=1on1+Coaching",
    images: [{ url: "https://placehold.co/800x500/C8A96E/1A1A1A?text=1on1+Coaching" }],
    variants: [
      { id: "ph-5-v1", title: "60 Menit via Zoom", prices: [{ amount: 150000000, currency_code: "idr" }], inventory_quantity: 8 },
    ],
    status: "published",
  },
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;

  let product: MedusaProduct;

  try {
    const res = await getProduct(handle);
    product = res.product;
  } catch {
    product = PLACEHOLDERS[handle];
    if (!product) notFound();
  }

  return <ProductDetail product={product} />;
}
