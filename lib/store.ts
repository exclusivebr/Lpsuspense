import { Redis } from "@upstash/redis";
import { put, list, get, del } from "@vercel/blob";

/**
 * Armazenamento chave → JSON do produto PMESP.
 * Usa o mesmo banco da landing page: Upstash Redis (se configurado) ou Vercel Blob privado.
 * Sem banco, em desenvolvimento, os dados ficam só na memória.
 */

const NS = "pmesp/";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function hasBlob() {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

const g = globalThis as unknown as { __pmespMem?: Map<string, string> };
const memory = (g.__pmespMem ??= new Map());

export function storeConfigured() {
  return getRedis() !== null || hasBlob();
}

function assertStore() {
  if (!storeConfigured() && process.env.NODE_ENV === "production") {
    throw new Error("Banco de dados não configurado (Vercel Blob ou Upstash Redis).");
  }
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const full = NS + key;
  const redis = getRedis();
  if (redis) {
    const v = await redis.get<T | string>(full);
    if (v == null) return null;
    return (typeof v === "string" ? JSON.parse(v) : v) as T;
  }
  if (hasBlob()) {
    const res = await get(`${full}.json`, { access: "private", useCache: false }).catch(() => null);
    if (!res || !res.stream) return null;
    try {
      return JSON.parse(await new Response(res.stream).text()) as T;
    } catch {
      return null;
    }
  }
  assertStore();
  const v = memory.get(full);
  return v ? (JSON.parse(v) as T) : null;
}

export async function setJSON(key: string, value: unknown) {
  const full = NS + key;
  const body = JSON.stringify(value);
  const redis = getRedis();
  if (redis) {
    await redis.set(full, body);
    return;
  }
  if (hasBlob()) {
    await put(`${full}.json`, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  assertStore();
  memory.set(full, body);
}

export async function delKey(key: string) {
  const full = NS + key;
  const redis = getRedis();
  if (redis) {
    await redis.del(full);
    return;
  }
  if (hasBlob()) {
    await del(`${full}.json`).catch(() => undefined);
    return;
  }
  memory.delete(full);
}

/** Lista todos os valores cujas chaves começam com `prefix`. */
export async function listJSON<T>(prefix: string): Promise<T[]> {
  const full = NS + prefix;
  const redis = getRedis();
  if (redis) {
    const keys: string[] = [];
    let cursor = "0";
    do {
      const [next, batch] = await redis.scan(cursor, { match: `${full}*`, count: 500 });
      cursor = String(next);
      keys.push(...(batch as string[]));
    } while (cursor !== "0");
    const out: T[] = [];
    for (let i = 0; i < keys.length; i += 100) {
      const vals = await redis.mget<(T | string | null)[]>(...keys.slice(i, i + 100));
      for (const v of vals) if (v != null) out.push((typeof v === "string" ? JSON.parse(v) : v) as T);
    }
    return out;
  }
  if (hasBlob()) {
    const paths: string[] = [];
    let cursor: string | undefined;
    do {
      const res = await list({ prefix: full, cursor, limit: 1000 });
      paths.push(...res.blobs.map((b) => b.pathname));
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);
    const out: T[] = [];
    for (let i = 0; i < paths.length; i += 20) {
      const chunk = await Promise.all(
        paths.slice(i, i + 20).map(async (p) => {
          const res = await get(p, { access: "private", useCache: false }).catch(() => null);
          if (!res || !res.stream) return null;
          try {
            return JSON.parse(await new Response(res.stream).text()) as T;
          } catch {
            return null;
          }
        }),
      );
      for (const v of chunk) if (v) out.push(v);
    }
    return out;
  }
  assertStore();
  const out: T[] = [];
  for (const [k, v] of memory) if (k.startsWith(full)) out.push(JSON.parse(v) as T);
  return out;
}
