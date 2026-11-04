import { Redis } from "@upstash/redis";

export type Lead = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  createdAt: string;
  utm?: Record<string, string>;
  userAgent?: string;
};

const LEADS_KEY = "marcha:leads";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Fallback em memória só para desenvolvimento local sem banco configurado.
const g = globalThis as unknown as { __memLeads?: Lead[] };
const memory = (g.__memLeads ??= []);

export function storageConfigured() {
  return getRedis() !== null;
}

export async function saveLead(lead: Lead) {
  const redis = getRedis();
  if (!redis) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Banco de dados não configurado (KV_REST_API_URL / KV_REST_API_TOKEN).");
    }
    memory.unshift(lead);
    return;
  }
  await redis.lpush(LEADS_KEY, JSON.stringify(lead));
}

export async function listLeads(): Promise<Lead[]> {
  const redis = getRedis();
  if (!redis) return memory;
  const raw = await redis.lrange<Lead | string>(LEADS_KEY, 0, -1);
  return raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as Lead) : r));
}

export async function deleteLead(id: string) {
  const redis = getRedis();
  if (!redis) {
    const i = memory.findIndex((l) => l.id === id);
    if (i >= 0) memory.splice(i, 1);
    return;
  }
  const all = await redis.lrange<Lead | string>(LEADS_KEY, 0, -1);
  for (const item of all) {
    const lead = typeof item === "string" ? (JSON.parse(item) as Lead) : item;
    if (lead.id === id) {
      await redis.lrem(LEADS_KEY, 1, typeof item === "string" ? item : JSON.stringify(item));
      return;
    }
  }
}
