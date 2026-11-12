"use server";

import { redirect } from "next/navigation";
import { endSession, formatPhone, getPurchase, getStudent, newRef, normalizePhone, savePurchase, startSession, type Purchase } from "@/lib/accounts";
import { pedirCpf } from "@/lib/config";
import { createCheckout, mercadoPagoConfigured, PRODUCT_TITLE, productPrice } from "@/lib/payments";
import { siteUrl } from "@/lib/site";
import { criarPix, wivenConfigured } from "@/lib/wiven";

export type FormState = { erro?: string; nome?: string; telefone?: string; cpf?: string };

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

/** A Wiven exige e-mail: quando o cliente não informa, geramos um a partir do WhatsApp. */
async function emailAutomatico(telefone: string) {
  const host = new URL(await siteUrl()).hostname.replace(/^www\./, "");
  return `${telefone}@${host.includes(".") ? host : "missao-pmesp.vercel.app"}`;
}

export async function iniciarCompra(_: FormState, formData: FormData): Promise<FormState> {
  const nome = String(formData.get("nome") ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
  const telefoneBruto = String(formData.get("telefone") ?? "").slice(0, 25);
  const cpfBruto = String(formData.get("cpf") ?? "").slice(0, 20);
  const voltar = { nome, telefone: telefoneBruto, cpf: cpfBruto };
  const telefone = normalizePhone(telefoneBruto);
  const cpf = cpfBruto.replace(/\D/g, "");
  if (nome.length < 2) return { erro: "Digite seu nome.", ...voltar };
  if (!telefone) return { erro: "WhatsApp inválido. Use DDD + número, ex.: (11) 99999-9999.", ...voltar };
  if (pedirCpf() && !cpfValido(cpf)) return { erro: "CPF inválido.", ...voltar };

  const ja = await getStudent(telefone);
  if (ja && !ja.bloqueado) return { erro: "Este WhatsApp já tem acesso. Use “Já sou aluno” para entrar.", ...voltar };

  const wiven = wivenConfigured();
  const externo = process.env.PMESP_CHECKOUT_URL;
  const temGateway = wiven || mercadoPagoConfigured() || !!externo;
  // Modo demonstração: libera o acesso sem pagamento enquanto nenhum checkout estiver configurado.
  // Em produção só vale com PMESP_DEMO=1 (remova essa variável antes de começar a vender).
  const demo = !temGateway && (process.env.NODE_ENV !== "production" || process.env.PMESP_DEMO === "1");
  if (!temGateway && !demo) return { erro: "O pagamento ainda não foi configurado. Fale com o suporte.", ...voltar };

  const purchase: Purchase = {
    ref: newRef(),
    nome,
    telefone,
    ...(pedirCpf() ? { cpf } : {}),
    status: demo ? "approved" : "pending",
    source: demo ? "demo" : wiven ? "wiven" : mercadoPagoConfigured() ? "mercadopago" : "manual",
    amount: productPrice(),
    createdAt: new Date().toISOString(),
    ...(demo ? { approvedAt: new Date().toISOString() } : {}),
  };
  let destino: string;
  try {
    const email = await emailAutomatico(telefone);
    if (wiven) {
      purchase.pix = await criarPix({
        ref: purchase.ref,
        valor: productPrice(),
        produto: PRODUCT_TITLE,
        nome,
        email,
        telefone: formatPhone(telefone),
        cpf: pedirCpf() ? cpf : undefined,
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
        u.searchParams.set("name", nome);
        u.searchParams.set("phone", telefone);
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

/** Botão “Entrar na área do aluno” da página de obrigado: quem tem o link da compra aprovada entra direto. */
export async function acessarCompra(formData: FormData) {
  const p = await getPurchase(String(formData.get("ref") ?? ""));
  if (!p || p.status !== "approved") redirect("/entrar");
  const s = await getStudent(p.telefone);
  if (!s || s.bloqueado) redirect("/entrar");
  await startSession(s.id);
  redirect("/area");
}

export async function entrar(_: FormState, formData: FormData): Promise<FormState> {
  const bruto = String(formData.get("telefone") ?? "").slice(0, 25);
  const telefone = normalizePhone(bruto);
  if (!telefone) return { erro: "Digite o WhatsApp com DDD, ex.: (11) 99999-9999.", telefone: bruto };
  const aluno = await getStudent(telefone);
  if (!aluno) return { erro: "Não encontramos uma compra aprovada para este número. Use o mesmo WhatsApp da compra.", telefone: bruto };
  if (aluno.bloqueado) return { erro: "O acesso deste número está suspenso. Fale com o suporte.", telefone: bruto };
  await startSession(aluno.id);
  redirect("/area");
}

export async function sair() {
  await endSession();
  redirect("/entrar");
}
