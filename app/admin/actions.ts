"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, isAdmin, sessionToken } from "@/lib/admin";
import { deletePurchase, getPurchase, listPurchases, newRef, normalizePhone, savePurchase } from "@/lib/accounts";
import { codigoLivre, deleteAfiliado, getAfiliado, novoToken, saveAfiliado, slugify, validCodigo } from "@/lib/afiliados";

export async function liberarManual(formData: FormData) {
  await guard();
  const nome = String(formData.get("nome") ?? "").trim().slice(0, 120);
  const telefone = normalizePhone(String(formData.get("telefone") ?? ""));
  if (nome.length < 2 || !telefone) redirect("/admin?erro=1");
  const now = new Date().toISOString();
  const ref = newRef();
  await savePurchase({ ref, nome, telefone, status: "approved", source: "manual", createdAt: now, approvedAt: now });
  redirect(`/admin?novo=${ref}`);
}

export async function aprovarCompra(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const p = await getPurchase(String(formData.get("ref") ?? ""));
  if (p && p.status !== "approved") {
    await savePurchase({ ...p, status: "approved", approvedAt: new Date().toISOString() });
  }
  revalidatePath("/admin");
}

export async function loginAdmin(formData: FormData) {
  if (!checkPassword(String(formData.get("password") ?? ""))) redirect("/admin?senha=1");
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin");
}

export async function excluirCompra(formData: FormData) {
  await guard();
  await deletePurchase(String(formData.get("ref") ?? ""));
  revalidatePath("/admin");
}

function lerPercentual(formData: FormData) {
  const n = Number(String(formData.get("percentual") ?? "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n * 100) / 100 : null;
}

export async function criarAfiliado(formData: FormData) {
  await guard();
  const nome = String(formData.get("nome") ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
  const percentual = lerPercentual(formData);
  const pedido = slugify(String(formData.get("codigo") ?? ""));
  if (nome.length < 2 || percentual === null) redirect("/admin?aba=afiliados&erro=dados");
  if (pedido && (!validCodigo(pedido) || (await getAfiliado(pedido)))) redirect("/admin?aba=afiliados&erro=codigo");
  const codigo = pedido || (await codigoLivre(nome));
  await saveAfiliado({ codigo, nome, percentual, token: novoToken(), ativo: true, createdAt: new Date().toISOString() });
  redirect(`/admin?aba=afiliados&novo=${codigo}`);
}

export async function editarAfiliado(formData: FormData) {
  await guard();
  const a = await getAfiliado(String(formData.get("codigo") ?? ""));
  const percentual = lerPercentual(formData);
  if (a && percentual !== null) await saveAfiliado({ ...a, percentual });
  revalidatePath("/admin");
}

export async function alternarAfiliado(formData: FormData) {
  await guard();
  const a = await getAfiliado(String(formData.get("codigo") ?? ""));
  if (a) await saveAfiliado({ ...a, ativo: !a.ativo });
  revalidatePath("/admin");
}

export async function excluirAfiliado(formData: FormData) {
  await guard();
  await deleteAfiliado(String(formData.get("codigo") ?? ""));
  revalidatePath("/admin");
}

/** Marca como pagas todas as comissões aprovadas e ainda não pagas do afiliado. */
export async function pagarComissoes(formData: FormData) {
  await guard();
  const codigo = String(formData.get("codigo") ?? "");
  const agora = new Date().toISOString();
  const compras = await listPurchases();
  for (const c of compras) {
    if (c.afiliado?.codigo === codigo && c.status === "approved" && !c.comissaoPagaEm) {
      await savePurchase({ ...c, comissaoPagaEm: agora });
    }
  }
  revalidatePath("/admin");
}
