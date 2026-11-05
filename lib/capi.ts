import { createHash } from "node:crypto";
import { PIXEL_ID } from "@/lib/pixel";

// API de Conversões da Meta (envio pelo servidor). Só funciona se META_CAPI_TOKEN estiver definido.
const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export type CapiLead = {
  eventId: string;
  nome: string;
  email: string;
  telefone: string; // só dígitos
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  sourceUrl?: string;
};

export async function sendCapiLead(lead: CapiLead) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return { skipped: true };

  const phone = lead.telefone.length <= 11 ? `55${lead.telefone}` : lead.telefone;
  const [first, ...rest] = lead.nome.split(" ");
  const user_data: Record<string, unknown> = {
    em: [sha256(lead.email)],
    ph: [sha256(phone)],
    fn: [sha256(first)],
    external_id: [sha256(lead.email)],
    country: [sha256("br")],
  };
  if (rest.length) user_data.ln = [sha256(rest[rest.length - 1])];
  if (lead.ip) user_data.client_ip_address = lead.ip;
  if (lead.userAgent) user_data.client_user_agent = lead.userAgent;
  if (lead.fbp) user_data.fbp = lead.fbp;
  if (lead.fbc) user_data.fbc = lead.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.sourceUrl,
        user_data,
        custom_data: { content_name: "Lista Arquivo 00X", content_category: "trafego-pago" },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  const version = process.env.META_GRAPH_VERSION || "v23.0";
  const res = await fetch(`https://graph.facebook.com/${version}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) console.error("[capi] erro", res.status, await res.text().catch(() => ""));
  return { ok: res.ok };
}
