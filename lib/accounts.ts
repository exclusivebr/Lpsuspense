import { createHash, createHmac, randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getJSON, listJSON, setJSON } from "./store";

const scrypt = promisify(_scrypt) as (pwd: string, salt: string, len: number) => Promise<Buffer>;

export const STUDENT_COOKIE = "pmesp_aluno";
const SESSION_DAYS = 60;

export type Purchase = {
  ref: string;
  nome: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  source: "mercadopago" | "wiven" | "manual" | "demo";
  telefone?: string;
  cpf?: string;
  /** Cobrança Pix da Wiven. */
  pix?: { transactionId: string; webhookToken?: string; code: string; image?: string; expiresAt?: string };
  /** Última consulta direta ao gateway (limitada para não virar polling). */
  checkedAt?: string;
  amount?: number;
  paymentId?: string;
  createdAt: string;
  approvedAt?: string;
  /** Preenchido quando o aluno cria a senha (o link de primeiro acesso deixa de valer). */
  claimedAt?: string;
};

export type Student = {
  email: string;
  nome: string;
  passwordHash: string;
  salt: string;
  ref: string;
  createdAt: string;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function emailKey(email: string) {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 32);
}

export function newRef() {
  return randomBytes(16).toString("hex");
}

/* ---------------- Compras ---------------- */

export const getPurchase = (ref: string) =>
  /^[a-f0-9]{32}$/.test(ref) ? getJSON<Purchase>(`purchases/${ref}`) : Promise.resolve(null);
export const savePurchase = (p: Purchase) => setJSON(`purchases/${p.ref}`, p);
export const listPurchases = async () =>
  (await listJSON<Purchase>("purchases/")).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/* ---------------- Alunos ---------------- */

export const getStudent = (email: string) => getJSON<Student>(`students/${emailKey(email)}`);
export const listStudents = () => listJSON<Student>("students/");

async function hashPassword(password: string, salt: string) {
  return (await scrypt(password, salt, 64)).toString("hex");
}

export async function createStudent(p: Purchase, password: string) {
  const salt = randomBytes(16).toString("hex");
  const student: Student = {
    email: normalizeEmail(p.email),
    nome: p.nome,
    salt,
    passwordHash: await hashPassword(password, salt),
    ref: p.ref,
    createdAt: new Date().toISOString(),
  };
  await setJSON(`students/${emailKey(p.email)}`, student);
  return student;
}

export async function verifyStudent(email: string, password: string) {
  const s = await getStudent(email);
  if (!s) return null;
  const h = Buffer.from(await hashPassword(password, s.salt), "hex");
  const ok = Buffer.from(s.passwordHash, "hex");
  return h.length === ok.length && timingSafeEqual(h, ok) ? s : null;
}

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

export async function startSession(email: string) {
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = Buffer.from(JSON.stringify({ e: normalizeEmail(email), x: exp })).toString("base64url");
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
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; x: number };
    if (Date.now() > x) return null;
    return await getStudent(e);
  } catch {
    return null;
  }
}

export async function requireStudent() {
  const s = await currentStudent();
  if (!s) redirect("/entrar");
  return s;
}
