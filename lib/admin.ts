import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pmesp_admin";

const tokenFor = (password: string) => createHash("sha256").update(`pmesp-admin::${password}`).digest("hex");

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkPassword(input: string) {
  const pwd = process.env.ADMIN_PASSWORD;
  return !!pwd && safeEqual(tokenFor(input), tokenFor(pwd));
}

export const sessionToken = () => tokenFor(process.env.ADMIN_PASSWORD ?? "");

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, sessionToken());
}
