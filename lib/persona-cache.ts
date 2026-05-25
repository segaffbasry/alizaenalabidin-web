import { db } from "./db";
import type { BotPersona } from "./generated/prisma/client";

interface CacheEntry {
  persona: BotPersona;
  fetchedAt: number;
}

const TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry>();
const CACHE_KEY = "default";

export async function getPersona(): Promise<BotPersona | null> {
  const cached = cache.get(CACHE_KEY);
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) return cached.persona;

  const persona = await db.botPersona.findFirst();
  if (!persona) return null;

  cache.set(CACHE_KEY, { persona, fetchedAt: Date.now() });
  return persona;
}

export function invalidatePersonaCache() {
  cache.delete(CACHE_KEY);
}
