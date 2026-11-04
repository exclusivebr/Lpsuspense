"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, isAdmin, sessionToken } from "@/lib/auth";
import { deleteLead } from "@/lib/db";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) redirect("/admin?erro=1");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function removeLead(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await deleteLead(String(formData.get("id") ?? ""));
  revalidatePath("/admin");
}
