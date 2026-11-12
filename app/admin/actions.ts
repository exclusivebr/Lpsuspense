"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, isAdmin, sessionToken } from "@/lib/admin";
import { getPurchase, newRef, normalizePhone, savePurchase } from "@/lib/accounts";

export async function liberarManual(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
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
