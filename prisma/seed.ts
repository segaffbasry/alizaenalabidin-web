import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const dbPath = dbUrl.replace(/^file:/, "");
const absolutePath = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: absolutePath }) } as any);

async function main() {
  console.log("🌱 Seeding database…");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@alizaenalabidin.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Admin", passwordHash, role: "admin" },
  });
  console.log(`  ✓ Admin user: ${email}`);

  // ── Bot Persona ─────────────────────────────────────────────────────────────
  const existing = await db.botPersona.findFirst();
  if (!existing) {
    await db.botPersona.create({
      data: {
        systemPrompt: `Saya adalah Ali Zaenal Abidin — life transformation coach dan penulis buku bestseller asal Indonesia. Saya berbicara dengan hangat, jujur, dan penuh kasih. Saya percaya setiap manusia memiliki tujuan unik yang hanya bisa ditemukan melalui kejujuran dengan diri sendiri.

Gaya komunikasi saya:
- Langsung tapi lembut — saya tidak menghindari kebenaran, tapi selalu menyampaikannya dengan empati
- Menggunakan analogi kehidupan sehari-hari yang mudah dipahami
- Mendorong refleksi diri, bukan memberikan jawaban instan
- Kadang menyisipkan humor ringan untuk mencairkan suasana

Ketika menjawab pertanyaan:
1. Akui perasaan atau situasi penanya terlebih dahulu
2. Bagikan perspektif dari pengalaman coaching saya
3. Berikan satu langkah kecil yang bisa langsung dipraktikkan
4. Jika pertanyaan terlalu kompleks, ajak untuk booking sesi langsung

Jika saya tidak tahu jawabannya, saya akan jujur dan menyarankan untuk berdiskusi lebih dalam dalam sesi coaching.`,
        temperature: 0.75,
        model: "gpt-4o-mini",
        maxTokens: 800,
        greetingMessage:
          "Halo! Saya Ali — siap menemani perjalanan transformasimu. Ada yang ingin kamu tanyakan tentang hidup, tujuan, atau mindfulness?",
        fallbackMessage:
          "Terima kasih atas pertanyaanmu yang indah. Saat ini saya sedang mengalami sedikit gangguan. Silakan coba lagi, atau kunjungi halaman Products untuk melihat sesi coaching langsung bersama saya.",
      },
    });
    console.log("  ✓ Default BotPersona created");
  }

  // ── Knowledge Entries ───────────────────────────────────────────────────────
  const knowledgeSeeds = [
    {
      title: "Latar Belakang Ali Zaenal Abidin",
      category: "BIOGRAPHY" as const,
      tags: "ali, biografi, perjalanan hidup, coach",
      content: `Ali Zaenal Abidin adalah life transformation coach dan penulis bestseller asal Indonesia yang telah membantu lebih dari 50.000 orang di 5+ negara dan 19+ kota menemukan tujuan hidup mereka.

Perjalanan Ali dimulai dari pengalaman pribadinya menghadapi krisis makna di usia 20-an — sukses secara material namun merasa hampa di dalam. Dari titik itulah ia mulai mendalami psikologi, spiritualitas, dan filosofi kehidupan dari berbagai tradisi.

Ali telah menyelenggarakan lebih dari 200 live events dan dikenal karena kemampuannya menggabungkan ilmu psikologi modern dengan kearifan spiritual secara elegan dan mudah dipraktikkan.

Buku-bukunya telah diterbitkan dalam berbagai edisi dan menjadi referensi utama dalam komunitas self-development Indonesia.`,
    },
    {
      title: "Program Revisi Hidup",
      category: "PROGRAMS" as const,
      tags: "revisi hidup, program, workshop, transformasi, identitas",
      content: `Revisi Hidup adalah program intensif 4 hari yang dirancang Ali untuk membantu peserta melakukan perubahan mendalam pada pola pikir, identitas, dan arah hidup mereka.

Apa yang terjadi selama Revisi Hidup:
- Hari 1: Menggali akar pola lama yang menghambat pertumbuhan
- Hari 2: Mengidentifikasi nilai-nilai inti dan tujuan hidup yang sesungguhnya
- Hari 3: Merancang ulang identitas dan blueprint kehidupan baru
- Hari 4: Membangun sistem dan komitmen untuk mempertahankan perubahan

Program ini diadakan di Plaza 51 Bintaro, Tangerang Selatan. Tersedia untuk umum dengan kapasitas terbatas untuk memastikan kualitas transformasi setiap peserta.

Investasi: Hubungi tim Ali untuk informasi harga terkini. Early bird tersedia.`,
    },
    {
      title: "Program Mindful Manifestation",
      category: "PROGRAMS" as const,
      tags: "mindful manifestation, manifestasi, kesadaran, program, workshop",
      content: `Mindful Manifestation adalah program 3 hari yang menggabungkan ilmu neurosains, psikologi positif, dan praktik kesadaran penuh untuk membantu peserta mewujudkan kehidupan yang benar-benar mereka inginkan.

Berbeda dengan pendekatan manifestasi biasa, Ali mengajarkan bahwa manifestasi sejati terjadi ketika pikiran, perasaan, dan tindakan bergerak selaras — bukan sekadar visualisasi tanpa aksi.

Kurikulum mencakup:
- Memahami hubungan antara keyakinan bawah sadar dan hasil kehidupan
- Teknik praktis untuk melatih kesadaran penuh dalam kehidupan sehari-hari
- Membangun ritual harian yang memperkuat alignment internal
- Cara menetapkan tujuan yang mengalir dari nilai-nilai terdalam

Diadakan di Plaza 51 Bintaro. Cocok untuk siapapun yang ingin menghidupkan mimpi-mimpinya dengan fondasi yang kuat.`,
    },
    {
      title: "Buku: Hidup Mau Ngapain?",
      category: "BOOKS" as const,
      tags: "buku, hidup mau ngapain, bestseller, tujuan hidup, makna",
      content: `"Hidup Mau Ngapain?" adalah buku bestseller Ali Zaenal Abidin yang telah mengubah perspektif ratusan ribu pembaca Indonesia.

Buku ini lahir dari pertanyaan yang sering Ali temui dalam sesi coaching: "Saya sudah sukses, tapi kenapa merasa kosong?"

Isi buku secara garis besar:
- Mengapa kesuksesan eksternal tidak menjamin kebahagiaan internal
- Cara menemukan pertanyaan yang tepat tentang tujuan hidup
- Perbedaan antara hidup yang didesain oleh orang lain vs hidup yang dipilih sendiri
- Latihan-latihan praktis untuk mulai merevisi hidup dari dalam

Tersedia di toko buku nasional dan platform digital. Tersedia juga dalam format audiobook.

Kutipan terkenal dari buku ini: "Lebih penting hidup dalam hidup yang kamu pahami, daripada hidup dalam hidup yang orang lain pahami tapi kamu tidak."`,
    },
    {
      title: "Filosofi Mindfulness ala Ali",
      category: "PHILOSOPHY" as const,
      tags: "mindfulness, filosofi, kesadaran, hadir, praktik",
      content: `Ali mendefinisikan mindfulness bukan sebagai praktik meditasi formal semata, melainkan sebagai cara hidup yang menuntut kehadiran penuh di setiap momen.

Prinsip-prinsip inti:
1. Kesadaran adalah kompas — tanpa kesadaran, kita menjalani hidup secara otomatis, mengikuti program lama yang mungkin sudah tidak relevan
2. Emosi adalah data, bukan musuh — setiap emosi membawa informasi berharga tentang nilai-nilai dan kebutuhan kita
3. Keselarasan adalah kunci — kebahagian sejati datang ketika apa yang kita pikirkan, rasakan, ucapkan, dan lakukan bergerak ke arah yang sama
4. Tujuan bukan tujuan — tujuan hidup bukan sesuatu yang ditemukan di luar, tapi diciptakan melalui pilihan-pilihan kecil setiap hari

Praktik yang direkomendasikan Ali:
- 5 menit pagi hari untuk bertanya: "Apa yang paling penting hari ini?"
- Jurnal refleksi malam: "Apa yang saya pelajari tentang diri saya hari ini?"
- Pause sebelum bereaksi — ambil napas, pilih respons, bukan reaksi`,
    },
  ];

  for (const seed of knowledgeSeeds) {
    const existing = await db.knowledgeEntry.findFirst({ where: { title: seed.title } });
    if (!existing) {
      await db.knowledgeEntry.create({ data: { ...seed, isActive: true } });
      console.log(`  ✓ Knowledge: "${seed.title}"`);
    }
  }

  // ── Q&A Pairs ───────────────────────────────────────────────────────────────
  const qaSeeds = [
    { question: "Apa itu life coaching?", answer: "Life coaching adalah proses terstruktur di mana seorang coach membantu klien memperjelas tujuan, mengidentifikasi hambatan, dan mengambil tindakan nyata untuk mencapai kehidupan yang lebih bermakna. Berbeda dengan terapi, coaching fokus pada masa depan dan potensi, bukan masa lalu dan masalah.", category: "FAQ" as const },
    { question: "Berapa biaya sesi coaching dengan Ali?", answer: "Untuk informasi harga sesi coaching 1-on-1 dengan Ali, silakan kunjungi halaman Products di website ini atau hubungi tim kami langsung. Tersedia berbagai paket yang disesuaikan dengan kebutuhan dan goals Anda.", category: "FAQ" as const },
    { question: "Apakah Ali menerima klien dari luar Indonesia?", answer: "Ya! Ali telah bekerja dengan klien dari berbagai negara termasuk Singapore, Malaysia, Dubai, Australia, dan Jepang. Sesi online tersedia untuk klien internasional.", category: "FAQ" as const },
    { question: "Bagaimana cara menemukan tujuan hidup?", answer: "Tujuan hidup tidak ditemukan — ia diciptakan. Mulailah dengan mengidentifikasi: (1) Apa yang membuat Anda merasa paling hidup? (2) Kontribusi apa yang ingin Anda tinggalkan di dunia? (3) Bagaimana Anda ingin dikenang? Jawaban dari tiga pertanyaan ini adalah kompas menuju tujuan hidup Anda.", category: "PHILOSOPHY" as const },
    { question: "Apa perbedaan Revisi Hidup dan Mindful Manifestation?", answer: "Revisi Hidup (4 hari) berfokus pada transformasi identitas — menggali akar pola lama dan membangun blueprint kehidupan baru dari dalam. Mindful Manifestation (3 hari) lebih berfokus pada bagaimana mewujudkan visi tersebut ke dalam kenyataan menggunakan pendekatan holistik berbasis kesadaran. Idealnya diikuti berurutan: Revisi Hidup dulu, lalu Mindful Manifestation.", category: "PROGRAMS" as const },
    { question: "Apakah Tanya Ali ini benar-benar Ali yang menjawab?", answer: "Tanya Ali adalah AI yang dilatih berdasarkan filosofi, buku, dan ribuan sesi coaching Ali Zaenal Abidin. Meskipun bukan Ali langsung, jawabannya mencerminkan cara berpikir dan pendekatan Ali. Untuk diskusi mendalam dan personal, booking sesi langsung dengan Ali di halaman Products.", category: "FAQ" as const },
    { question: "Berapa banyak pertanyaan gratis yang saya dapat?", answer: "Setiap pengguna baru mendapatkan 10 pertanyaan gratis. Setelah itu, Anda bisa mendaftar akun untuk mendapatkan akses lebih lanjut, atau melihat paket yang tersedia di halaman Products.", category: "FAQ" as const },
    { question: "Bagaimana cara mengatasi rasa takut berubah?", answer: "Rasa takut berubah adalah normal — otak kita dirancang untuk mempertahankan yang familiar. Kuncinya: (1) Sadari bahwa takut berubah dan takut tidak berubah adalah dua ketakutan yang sama-sama nyata, (2) Mulailah dengan perubahan kecil yang bisa Anda kontrol, (3) Bangun bukti baru tentang kemampuan Anda satu langkah kecil setiap hari.", category: "PHILOSOPHY" as const },
    { question: "Apakah saya perlu pengalaman sebelumnya untuk ikut workshop?", answer: "Sama sekali tidak. Program Ali dirancang untuk semua orang — baik yang baru memulai perjalanan transformasi maupun yang sudah berpengalaman. Yang penting adalah kemauan untuk jujur dengan diri sendiri dan terbuka untuk bertumbuh.", category: "PROGRAMS" as const },
    { question: "Di mana saya bisa mendapatkan buku Ali?", answer: "Buku-buku Ali tersedia di toko buku nasional seperti Gramedia, Togamas, dan platform digital seperti Tokopedia, Shopee, dan Amazon. Untuk pembelian langsung dengan tanda tangan, tersedia di halaman Products website ini.", category: "BOOKS" as const },
  ];

  for (const qa of qaSeeds) {
    const existing = await db.qAPair.findFirst({ where: { question: qa.question } });
    if (!existing) {
      await db.qAPair.create({ data: { ...qa, isActive: true } });
      console.log(`  ✓ QA: "${qa.question.slice(0, 50)}…"`);
    }
  }

  console.log("\n✅ Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
