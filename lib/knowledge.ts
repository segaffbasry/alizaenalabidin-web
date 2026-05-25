import { db } from "./db";
import type { KnowledgeEntry, QAPair } from "./generated/prisma/client";

export interface RelevantContext {
  entries: KnowledgeEntry[];
  qaPairs: QAPair[];
}

function wordScore(text: string, words: string[]): number {
  const lower = text.toLowerCase();
  return words.reduce((score, w) => score + (lower.includes(w) ? 1 : 0), 0);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ""))
    .filter((w) => w.length > 3); // skip stop words by length
}

export async function retrieveContext(userMessage: string): Promise<RelevantContext> {
  const words = tokenize(userMessage);
  if (!words.length) return { entries: [], qaPairs: [] };

  // Fetch all active entries — SQLite lacks full-text search; filter in JS
  const [allEntries, allQA] = await Promise.all([
    db.knowledgeEntry.findMany({ where: { isActive: true } }),
    db.qAPair.findMany({ where: { isActive: true } }),
  ]);

  // Score and sort knowledge entries
  const scoredEntries = allEntries
    .map((e) => ({
      entry: e,
      score: wordScore(e.title + " " + e.content + " " + e.tags, words),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.entry);

  // Score and sort QA pairs
  const scoredQA = allQA
    .map((q) => ({
      pair: q,
      score: wordScore(q.question + " " + q.answer, words),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.pair);

  return { entries: scoredEntries, qaPairs: scoredQA };
}

export function formatContextBlock(ctx: RelevantContext): string {
  if (!ctx.entries.length && !ctx.qaPairs.length) return "";

  const parts: string[] = ["=== KNOWLEDGE CONTEXT ==="];

  for (const e of ctx.entries) {
    parts.push(`[${e.category}] ${e.title}\n${e.content}`);
  }

  for (const q of ctx.qaPairs) {
    parts.push(`Q: ${q.question}\nA: ${q.answer}`);
  }

  parts.push("=== END CONTEXT ===");
  return parts.join("\n\n");
}

export async function incrementQAUsage(qaPairIds: string[]): Promise<void> {
  await Promise.all(
    qaPairIds.map((id) =>
      db.qAPair.update({ where: { id }, data: { usageCount: { increment: 1 } } })
    )
  );
}
