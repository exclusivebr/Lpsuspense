import { Redis } from "@upstash/redis";
import { put, list, get, del } from "@vercel/blob";

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
const BLOB_PREFIX = "leads/";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function hasBlob() {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

// Fallback em memória só para desenvolvimento local sem banco configurado.
const g = globalThis as unknown as { __memLeads?: Lead[] };
const memory = (g.__memLeads ??= []);

export function storageConfigured() {
  return getRedis() !== null || hasBlob();
}

/* ---------------- Vercel Blob (privado): 1 arquivo JSON por lead ---------------- */

async function blobListAll() {
  const blobs: { pathname: string }[] = [];
  let cursor: string | undefined;
  do {
    const res = await list({ prefix: BLOB_PREFIX, cursor, limit: 1000 });
    blobs.push(...res.blobs);
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function blobRead(pathname: string): Promise<Lead | null> {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || !res.stream) return null;
  const text = await new Response(res.stream).text();
  try {
    return JSON.parse(text) as Lead;
  } catch {
    return null;
  }
}

/* ---------------- API ---------------- */

export async function saveLead(lead: Lead) {
  const redis = getRedis();
  if (redis) {
    await redis.lpush(LEADS_KEY, JSON.stringify(lead));
    return;
  }
  if (hasBlob()) {
    await put(`${BLOB_PREFIX}${Date.parse(lead.createdAt)}-${lead.id}.json`, JSON.stringify(lead), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("Banco de dados não configurado (Vercel Blob ou Upstash Redis).");
  }
  memory.unshift(lead);
}

export async function listLeads(): Promise<Lead[]> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.lrange<Lead | string>(LEADS_KEY, 0, -1);
    return raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as Lead) : r));
  }
  if (hasBlob()) {
    const blobs = await blobListAll();
    const out: Lead[] = [];
    for (let i = 0; i < blobs.length; i += 20) {
      const chunk = await Promise.all(blobs.slice(i, i + 20).map((b) => blobRead(b.pathname)));
      for (const l of chunk) if (l) out.push(l);
    }
    return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return memory;
}

export async function deleteLead(id: string) {
  if (!id) return;
  const redis = getRedis();
  if (redis) {
    const all = await redis.lrange<Lead | string>(LEADS_KEY, 0, -1);
    for (const item of all) {
      const lead = typeof item === "string" ? (JSON.parse(item) as Lead) : item;
      if (lead.id === id) {
        await redis.lrem(LEADS_KEY, 1, typeof item === "string" ? item : JSON.stringify(item));
        return;
      }
    }
    return;
  }
  if (hasBlob()) {
    const match = (await blobListAll()).find((b) => b.pathname.endsWith(`-${id}.json`));
    if (match) await del(match.pathname);
    return;
  }
  const i = memory.findIndex((l) => l.id === id);
  if (i >= 0) memory.splice(i, 1);
}
