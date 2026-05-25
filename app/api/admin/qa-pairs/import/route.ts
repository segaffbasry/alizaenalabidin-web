import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import Papa from "papaparse";
import type { KnowledgeCategory } from "@/lib/generated/prisma/client";

interface CSVRow {
  question: string;
  answer: string;
  category?: string;
}

const VALID_CATEGORIES = new Set(["BIOGRAPHY", "PHILOSOPHY", "PROGRAMS", "BOOKS", "FAQ", "QA_PAIRS"]);

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const text = await file.text();
  const { data, errors } = Papa.parse<CSVRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  if (errors.length && !data.length) {
    return NextResponse.json({ error: "CSV parse failed", details: errors }, { status: 400 });
  }

  const valid = data.filter((r) => r.question?.trim() && r.answer?.trim());
  if (!valid.length) {
    return NextResponse.json({ error: "No valid rows found. CSV needs: question, answer, category" }, { status: 400 });
  }

  const created = await db.$transaction(
    valid.map((row) =>
      db.qAPair.create({
        data: {
          question: row.question.trim(),
          answer: row.answer.trim(),
          category: (VALID_CATEGORIES.has(row.category?.toUpperCase() ?? "")
            ? row.category!.toUpperCase()
            : "FAQ") as KnowledgeCategory,
          isActive: true,
        },
      })
    )
  );

  return NextResponse.json({ imported: created.length, skipped: data.length - valid.length });
}
