import { headers } from "next/headers";

export async function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dataBR = (iso: string, withTime = false) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: withTime ? "short" : "long",
    ...(withTime ? { timeStyle: "short" } : {}),
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
