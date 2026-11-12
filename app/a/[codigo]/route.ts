import { NextResponse } from "next/server";
import { AFILIADO_COOKIE, AFILIADO_DIAS, getAfiliado } from "@/lib/afiliados";

/** Link de afiliado: /a/codigo → guarda o código por 30 dias e manda para a página de vendas. */
export async function GET(req: Request, { params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await params;
  const url = new URL(req.url);
  const destino = new URL("/", url);
  url.searchParams.forEach((v, k) => destino.searchParams.set(k, v)); // mantém UTMs
  const res = NextResponse.redirect(destino);
  const a = await getAfiliado(codigo.toLowerCase());
  if (a?.ativo) {
    res.cookies.set(AFILIADO_COOKIE, a.codigo, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: AFILIADO_DIAS * 86_400,
    });
  }
  return res;
}
