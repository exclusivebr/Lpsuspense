"use server";

import { redirect } from "next/navigation";
import {
  createStudent,
  endSession,
  getPurchase,
  getStudent,
  newRef,
  normalizeEmail,
  savePurchase,
  startSession,
  verifyStudent,
  type Purchase,
} from "@/lib/pmesp/accounts";
import { createCheckout, mercadoPagoConfigured, productPrice } from "@/lib/pmesp/payments";
import { siteUrl } from "@/lib/pmesp/site";

export type FormState = { erro?: string; nome?: string; email?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function iniciarCompra(_: FormState, formData: FormData): Promise<FormState> {
  const nome = String(formData.get("nome") ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
  const email = normalizeEmail(String(formData.get("email") ?? "")).slice(0, 160);
  if (nome.length < 2) return { erro: "Digite seu nome.", nome, email };
  if (!EMAIL_RE.test(email)) return { erro: "E-mail inválido.", nome, email };

  const externo = process.env.PMESP_CHECKOUT_URL;
  const demo = !mercadoPagoConfigured() && !externo && process.env.NODE_ENV !== "production";
  if (!mercadoPagoConfigured() && !externo && !demo) {
    return { erro: "O pagamento ainda não foi configurado. Fale com o suporte.", nome, email };
  }

  const purchase: Purchase = {
    ref: newRef(),
    nome,
    email,
    status: demo ? "approved" : "pending",
    source: demo ? "demo" : mercadoPagoConfigured() ? "mercadopago" : "manual",
    amount: productPrice(),
    createdAt: new Date().toISOString(),
    ...(demo ? { approvedAt: new Date().toISOString() } : {}),
  };
  let destino: string;
  try {
    await savePurchase(purchase);
    if (mercadoPagoConfigured()) {
      destino = await createCheckout({ ref: purchase.ref, nome, email, baseUrl: await siteUrl() });
    } else if (externo) {
      const u = new URL(externo);
      u.searchParams.set("email", email);
      u.searchParams.set("name", nome);
      destino = u.toString();
    } else {
      destino = `/pmesp/obrigado?ref=${purchase.ref}`;
    }
  } catch (e) {
    console.error("[pmesp] checkout", e);
    return { erro: "Não foi possível abrir o pagamento agora. Tente novamente em instantes.", nome, email };
  }
  redirect(destino);
}

export async function criarAcesso(_: FormState, formData: FormData): Promise<FormState> {
  const ref = String(formData.get("ref") ?? "");
  const senha = String(formData.get("senha") ?? "");
  const confirmar = String(formData.get("confirmar") ?? "");
  const p = await getPurchase(ref);
  if (!p || p.status !== "approved") return { erro: "Compra não encontrada ou ainda não aprovada." };
  if (p.claimedAt) return { erro: "Este acesso já foi criado. Entre com seu e-mail e senha." };
  if (senha.length < 6) return { erro: "A senha precisa ter pelo menos 6 caracteres." };
  if (senha !== confirmar) return { erro: "As senhas não conferem." };
  if (await getStudent(p.email)) {
    await savePurchase({ ...p, claimedAt: new Date().toISOString() });
    return { erro: "Já existe uma conta com este e-mail. Use a página Entrar." };
  }
  await createStudent(p, senha);
  await savePurchase({ ...p, claimedAt: new Date().toISOString() });
  await startSession(p.email);
  redirect("/pmesp/area");
}

export async function entrar(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const senha = String(formData.get("senha") ?? "");
  const aluno = await verifyStudent(email, senha);
  if (!aluno) return { erro: "E-mail ou senha incorretos.", email };
  await startSession(aluno.email);
  redirect("/pmesp/area");
}

export async function sair() {
  await endSession();
  redirect("/pmesp/entrar");
}
