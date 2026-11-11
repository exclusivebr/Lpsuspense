/**
 * Integração com o Mercado Pago (Checkout Pro: Pix, cartão e boleto) via API REST.
 * Variável necessária: MERCADOPAGO_ACCESS_TOKEN.
 */

const API = "https://api.mercadopago.com";

export function mercadoPagoConfigured() {
  return !!process.env.MERCADOPAGO_ACCESS_TOKEN;
}

export function productPrice() {
  const n = Number(String(process.env.PMESP_PRICE ?? "47").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 47;
}

export const PRODUCT_TITLE = process.env.PMESP_PRODUCT_NAME || "Missão PMESP — Simulados e Guia do Edital";

async function mp<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Mercado Pago ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as T;
}

export async function createCheckout(opts: { ref: string; nome: string; email: string; baseUrl: string }) {
  const pref = await mp<{ init_point: string }>("/checkout/preferences", {
    method: "POST",
    headers: { "X-Idempotency-Key": opts.ref },
    body: JSON.stringify({
      items: [{ id: "pmesp", title: PRODUCT_TITLE, quantity: 1, unit_price: productPrice(), currency_id: "BRL" }],
      payer: { email: opts.email, name: opts.nome },
      external_reference: opts.ref,
      back_urls: {
        success: `${opts.baseUrl}/obrigado?ref=${opts.ref}`,
        pending: `${opts.baseUrl}/obrigado?ref=${opts.ref}`,
        failure: `${opts.baseUrl}/obrigado?ref=${opts.ref}`,
      },
      auto_return: "approved",
      notification_url: `${opts.baseUrl}/api/webhook`,
      statement_descriptor: "MISSAO PMESP",
    }),
  });
  return pref.init_point;
}

export type MpPayment = { id: number; status: string; external_reference: string | null; transaction_amount: number };

export function getPayment(id: string) {
  return mp<MpPayment>(`/v1/payments/${encodeURIComponent(id)}`);
}

export async function findApprovedPayment(ref: string) {
  const res = await mp<{ results: MpPayment[] }>(
    `/v1/payments/search?external_reference=${encodeURIComponent(ref)}&sort=date_created&criteria=desc`,
  );
  return res.results.find((p) => p.status === "approved") ?? res.results[0] ?? null;
}
