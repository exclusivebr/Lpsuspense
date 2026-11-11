import { handlePaymentNotification } from "@/lib/pmesp/billing";
import { mercadoPagoConfigured } from "@/lib/pmesp/payments";

/**
 * Notificações do Mercado Pago. O conteúdo da notificação não é confiável:
 * usamos apenas o ID para consultar o pagamento direto na API do Mercado Pago.
 */
export async function POST(req: Request) {
  if (!mercadoPagoConfigured()) return new Response("ok");
  const url = new URL(req.url);
  let body: { type?: string; action?: string; data?: { id?: string | number } } = {};
  try {
    body = await req.json();
  } catch {}
  const type = body.type ?? url.searchParams.get("type") ?? url.searchParams.get("topic");
  const id = String(body.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? "");
  if (type !== "payment" || !/^\d+$/.test(id)) return new Response("ignored");
  try {
    await handlePaymentNotification(id);
    return new Response("ok");
  } catch (e) {
    console.error("[pmesp] webhook", e);
    return new Response("error", { status: 500 });
  }
}

export function GET() {
  return new Response("ok");
}
