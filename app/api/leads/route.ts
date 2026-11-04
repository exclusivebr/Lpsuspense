import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { saveLead } from "@/lib/db";
import { validateLead } from "@/lib/validate";

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

  return NextResponse.json({ ok: true });
}
