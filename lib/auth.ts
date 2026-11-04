import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "marcha_admin";

function tokenFor(password: string) {
  return createHash("sha256").update(`marcha::${password}`).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkPassword(input: string) {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return false;
  return safeEqual(tokenFor(input), tokenFor(pwd));
}

export function sessionToken() {
  return tokenFor(process.env.ADMIN_PASSWORD ?? "");
}

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, sessionToken());
}
