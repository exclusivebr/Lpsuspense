import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { saveLead } from "@/lib/db";
import { validateLead } from "@/lib/validate";
import { sendCapiLead } from "@/lib/capi";

export const runtime = "nodejs";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot anti-bot: humanos não preenchem esse campo invisível.
  if (typeof body.empresa === "string" && body.empresa.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { ok, errors, data } = validateLead(body);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const utm: Record<string, string> = {};
  const rawUtm = (body.utm ?? {}) as Record<string, unknown>;
  for (const k of UTM_KEYS) {
    if (typeof rawUtm[k] === "string" && rawUtm[k]) utm[k] = String(rawUtm[k]).slice(0, 100);
  }

  try {
    await saveLead({
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      utm: Object.keys(utm).length ? utm : undefined,
      userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? undefined,
    });
  } catch (err) {
    console.error("[leads] erro ao salvar", err);
    return NextResponse.json({ ok: false, error: "Não foi possível salvar agora. Tente de novo." }, { status: 500 });
  }

  // API de Conversões (servidor) — mesmo eventId do Pixel para deduplicar. Não bloqueia o lead se falhar.
  const eventId = typeof body.eventId === "string" ? body.eventId.slice(0, 64) : undefined;
  if (eventId) {
    const cookie = req.headers.get("cookie") ?? "";
    const getCookie = (name: string) => cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1];
    const fbclid = typeof body.fbclid === "string" ? body.fbclid.slice(0, 500) : undefined;
    const fbc = getCookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);
    try {
      await sendCapiLead({
        eventId,
        ...data,
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
        userAgent: req.headers.get("user-agent") ?? undefined,
        fbp: getCookie("_fbp"),
        fbc,
        sourceUrl: typeof body.sourceUrl === "string" ? body.sourceUrl.slice(0, 500) : undefined,
      });
    } catch (err) {
      console.error("[capi] falhou", err);
    }
  }

  return NextResponse.json({ ok: true });
}
