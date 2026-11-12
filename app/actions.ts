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
} from "@/lib/accounts";
import { createCheckout, mercadoPagoConfigured, PRODUCT_TITLE, productPrice } from "@/lib/payments";
import { criarPix, wivenConfigured } from "@/lib/wiven";
import { siteUrl } from "@/lib/site";

export type FormState = { erro?: string; nome?: string; email?: string; telefone?: string; cpf?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cpfValido(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const dig = (n: number) => {
    let s = 0;
    for (let i = 0; i < n; i++) s += Number(d[i]) * (n + 1 - i);
    const r = (s * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dig(9) === Number(d[9]) && dig(10) === Number(d[10]);
}

export async function iniciarCompra(_: FormState, formData: FormData): Promise<FormState> {
  const nome = String(formData.get("nome") ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
  const email = normalizeEmail(String(formData.get("email") ?? "")).slice(0, 160);
  const telefone = String(formData.get("telefone") ?? "").replace(/\D/g, "").slice(0, 13);
  const cpf = String(formData.get("cpf") ?? "").replace(/\D/g, "").slice(0, 11);
  const voltar = { nome, email, telefone, cpf };
  if (nome.length < 2) return { erro: "Digite seu nome.", ...voltar };
  if (!EMAIL_RE.test(email)) return { erro: "E-mail inválido.", ...voltar };

  const wiven = wivenConfigured();
  if (wiven) {
    if (telefone.length < 10 || telefone.length > 11) return { erro: "WhatsApp inválido (com DDD).", ...voltar };
    if (!cpfValido(cpf)) return { erro: "CPF inválido.", ...voltar };
  }

  const externo = process.env.PMESP_CHECKOUT_URL;
  const temGateway = wiven || mercadoPagoConfigured() || !!externo;
  // Modo demonstração: libera o acesso sem pagamento enquanto nenhum checkout estiver configurado.
  // Em produção só vale com PMESP_DEMO=1 (remova essa variável antes de começar a vender).
  const demo = !temGateway && (process.env.NODE_ENV !== "production" || process.env.PMESP_DEMO === "1");
  if (!temGateway && !demo) return { erro: "O pagamento ainda não foi configurado. Fale com o suporte.", ...voltar };

  const purchase: Purchase = {
    ref: newRef(),
    nome,
    email,
    ...(wiven ? { telefone, cpf } : {}),
    status: demo ? "approved" : "pending",
    source: demo ? "demo" : wiven ? "wiven" : mercadoPagoConfigured() ? "mercadopago" : "manual",
    amount: productPrice(),
    createdAt: new Date().toISOString(),
    ...(demo ? { approvedAt: new Date().toISOString() } : {}),
  };
  let destino: string;
  try {
    if (wiven) {
      purchase.pix = await criarPix({
        ref: purchase.ref,
        valor: productPrice(),
        produto: PRODUCT_TITLE,
        nome,
        email,
        telefone,
        cpf,
        baseUrl: await siteUrl(),
      });
      await savePurchase(purchase);
      destino = `/obrigado?ref=${purchase.ref}`;
    } else {
      await savePurchase(purchase);
      if (mercadoPagoConfigured()) {
        destino = await createCheckout({ ref: purchase.ref, nome, email, baseUrl: await siteUrl() });
      } else if (externo) {
        const u = new URL(externo);
        u.searchParams.set("email", email);
        u.searchParams.set("name", nome);
        destino = u.toString();
      } else {
        destino = `/obrigado?ref=${purchase.ref}`;
      }
    }
  } catch (e) {
    console.error("[pmesp] checkout", e instanceof Error ? e.message : e);
    return { erro: "Não foi possível gerar o pagamento agora. Confira seus dados e tente novamente.", ...voltar };
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
  redirect("/area");
}

export async function entrar(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const senha = String(formData.get("senha") ?? "");
  const aluno = await verifyStudent(email, senha);
  if (!aluno) return { erro: "E-mail ou senha incorretos.", email };
  await startSession(aluno.email);
  redirect("/area");
}

export async function sair() {
  await endSession();
  redirect("/entrar");
}
