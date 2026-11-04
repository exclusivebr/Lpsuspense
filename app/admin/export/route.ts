import { isAdmin } from "@/lib/auth";
import { listLeads } from "@/lib/db";

export const dynamic = "force-dynamic";

function esc(v: string) {
  return /[",;\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Não autorizado", { status: 401 });

  const leads = await listLeads();
  const header = ["data", "nome", "email", "telefone", "utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const rows = leads.map((l) =>
    [
      l.createdAt,
      l.nome,
      l.email,
      l.telefone,
      l.utm?.utm_source ?? "",
      l.utm?.utm_medium ?? "",
      l.utm?.utm_campaign ?? "",
      l.utm?.utm_content ?? "",
    ]
      .map((v) => esc(String(v)))
      .join(";"),
  );
  // BOM para o Excel abrir acentos corretamente
  const csv = "﻿" + [header.join(";"), ...rows].join("\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-marcha-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
