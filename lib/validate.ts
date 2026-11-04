export function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export function formatPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validateLead(input: { nome?: unknown; email?: unknown; telefone?: unknown }) {
  const nome = String(input.nome ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
  const email = String(input.email ?? "").trim().toLowerCase().slice(0, 160);
  const telefone = onlyDigits(String(input.telefone ?? "")).slice(0, 13);

  const errors: Record<string, string> = {};
  if (nome.length < 2) errors.nome = "Digite seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "E-mail inválido.";
  if (telefone.length < 10 || telefone.length > 13) errors.telefone = "WhatsApp inválido (com DDD).";

  return { ok: Object.keys(errors).length === 0, errors, data: { nome, email, telefone } };
}
