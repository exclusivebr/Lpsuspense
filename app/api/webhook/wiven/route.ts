import { handleWivenWebhook, type WivenWebhook } from "@/lib/billing";

/** Avisos de pagamento da Wiven (callbackUrl de cada cobrança Pix). */
export async function POST(req: Request) {
  let body: WivenWebhook;
  try {
    body = await req.json();
  } catch {
    return new Response("invalid", { status: 400 });
  }
  try {
    const ok = await handleWivenWebhook(body);
    return new Response(ok ? "ok" : "unauthorized", { status: ok ? 200 : 401 });
  } catch (e) {
    console.error("[wiven] webhook", e instanceof Error ? e.message : e);
    return new Response("error", { status: 500 });
  }
}

export function GET() {
  return new Response("ok");
}
