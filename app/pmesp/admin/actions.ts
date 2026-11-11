"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getPurchase, newRef, normalizeEmail, savePurchase } from "@/lib/pmesp/accounts";

export async function liberarManual(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const nome = String(formData.get("nome") ?? "").trim().slice(0, 120);
  const email = normalizeEmail(String(formData.get("email") ?? "")).slice(0, 160);
  if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) redirect("/pmesp/admin?erro=1");
  const now = new Date().toISOString();
  const ref = newRef();
  await savePurchase({ ref, nome, email, status: "approved", source: "manual", createdAt: now, approvedAt: now });
  redirect(`/pmesp/admin?novo=${ref}`);
}

export async function aprovarCompra(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const p = await getPurchase(String(formData.get("ref") ?? ""));
  if (p && p.status !== "approved") {
    await savePurchase({ ...p, status: "approved", approvedAt: new Date().toISOString() });
  }
  revalidatePath("/pmesp/admin");
}
