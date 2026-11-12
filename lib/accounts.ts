import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { delKey, getJSON, listJSON, setJSON } from "./store";

export const STUDENT_COOKIE = "pmesp_aluno";
const SESSION_DAYS = 60;

export type Purchase = {
  ref: string;
  nome: string;
  /** WhatsApp (só dígitos, com DDD). É o login do aluno. */
  telefone: string;
  email?: string;
  cpf?: string;
  status: "pending" | "approved" | "rejected";
  source: "mercadopago" | "wiven" | "manual" | "demo";
  /** Cobrança Pix da Wiven. */
  pix?: { transactionId: string; webhookToken?: string; code: string; image?: string; expiresAt?: string };
  /** Última consulta direta ao gateway (limitada para não virar polling). */
  checkedAt?: string;
  amount?: number;
  paymentId?: string;
  createdAt: string;
  approvedAt?: string;
  /** Afiliado que indicou a venda (porcentagem e comissão gravadas no momento da compra). */
  afiliado?: { codigo: string; nome: string; percentual: number; comissao: number };
  /** Quando a comissão desta venda foi paga ao afiliado. */
  comissaoPagaEm?: string;
};

export type Student = {
  /** Telefone normalizado (só dígitos, com DDD). */
  id: string;
  nome: string;
  ref: string;
  createdAt: string;
  /** Acesso cortado (ex.: Pix estornado ou contestado). */
  bloqueado?: boolean;
};

/** Normaliza para DDD + número (10 ou 11 dígitos). Retorna "" se inválido. */
export function normalizePhone(v: string) {
  let d = String(v ?? "").replace(/\D/g, "");
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  if (d.length === 11 && d[2] !== "9") return "";
  return d.length === 10 || d.length === 11 ? d : "";
}

export function formatPhone(d: string) {
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : d;
}

export function idKey(id: string) {
  return createHash("sha256").update(id).digest("hex").slice(0, 32);
}

export function newRef() {
  return randomBytes(16).toString("hex");
}

/* ---------------- Alunos ---------------- */

export const getStudent = (telefone: string) => {
  const id = normalizePhone(telefone);
  return id ? getJSON<Student>(`students/${idKey(id)}`) : Promise.resolve(null);
};
export const listStudents = () => listJSON<Student>("students/");

/** Garante que a conta do aluno acompanha o status da compra (cria ao aprovar, bloqueia ao estornar). */
async function syncStudent(p: Purchase) {
  const id = normalizePhone(p.telefone);
  if (!id) return;
  const atual = await getJSON<Student>(`students/${idKey(id)}`);
  if (p.status === "approved") {
    if (!atual || atual.bloqueado) {
      await setJSON(`students/${idKey(id)}`, {
        ...(atual ?? {}),
        id,
        nome: atual?.nome ?? p.nome,
        ref: p.ref,
        createdAt: atual?.createdAt ?? new Date().toISOString(),
        bloqueado: false,
      } satisfies Student);
    }
  } else if (p.status === "rejected" && p.approvedAt && atual && atual.ref === p.ref && !atual.bloqueado) {
    await setJSON(`students/${idKey(id)}`, { ...atual, bloqueado: true });
  }
}

/* ---------------- Compras ---------------- */

export const getPurchase = (ref: string) =>
  /^[a-f0-9]{32}$/.test(ref) ? getJSON<Purchase>(`purchases/${ref}`) : Promise.resolve(null);
export async function savePurchase(p: Purchase) {
  await setJSON(`purchases/${p.ref}`, p);
  await syncStudent(p);
}
/** Exclui a venda. Se ela é a que liberou o acesso do aluno, o acesso também é removido. */
export async function deletePurchase(ref: string) {
  const p = await getPurchase(ref);
  if (!p) return;
  await delKey(`purchases/${p.ref}`);
  const id = normalizePhone(p.telefone);
  if (!id) return;
  const s = await getJSON<Student>(`students/${idKey(id)}`);
  if (s && s.ref === p.ref) await delKey(`students/${idKey(id)}`);
}

export const listPurchases = async () =>
  (await listJSON<Purchase>("purchases/")).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/* ---------------- Sessão (cookie assinado) ---------------- */

function secret() {
  const s = process.env.PMESP_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) {
    if (process.env.NODE_ENV === "production") throw new Error("Defina PMESP_SESSION_SECRET.");
    return "dev-secret-pmesp";
  }
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function startSession(id: string) {
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = Buffer.from(JSON.stringify({ t: id, x: exp })).toString("base64url");
  const jar = await cookies();
  jar.set(STUDENT_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  (await cookies()).delete(STUDENT_COOKIE);
}

export async function currentStudent(): Promise<Student | null> {
  const raw = (await cookies()).get(STUDENT_COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const got = Buffer.from(sig);
  if (expected.length !== got.length || !timingSafeEqual(expected, got)) return null;
  try {
    const { t, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { t: string; x: number };
    if (!t || Date.now() > x) return null;
    const s = await getStudent(t);
    return s && !s.bloqueado ? s : null;
  } catch {
    return null;
  }
}

export async function requireStudent() {
  const s = await currentStudent();
  if (!s) redirect("/entrar");
  return s;
}
