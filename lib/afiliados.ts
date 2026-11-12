import { randomBytes } from "node:crypto";
import type { Purchase } from "./accounts";
import { delKey, getJSON, listJSON, setJSON } from "./store";

export const AFILIADO_COOKIE = "pmesp_afiliado";
export const AFILIADO_DIAS = 30;

export type Afiliado = {
  /** Código usado no link (/a/codigo). */
  codigo: string;
  nome: string;
  /** Porcentagem de comissão (0 a 100) aplicada às novas vendas. */
  percentual: number;
  /** Token secreto do painel do afiliado (/parceiro/token). */
  token: string;
  ativo: boolean;
  createdAt: string;
};

export function slugify(v: string) {
  return v
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 20);
}

export const validCodigo = (c: string) => /^[a-z0-9]{2,20}$/.test(c);

export const getAfiliado = (codigo: string) =>
  validCodigo(codigo) ? getJSON<Afiliado>(`afiliados/${codigo}`) : Promise.resolve(null);

export const listAfiliados = async () =>
  (await listJSON<Afiliado>("afiliados/")).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

export const saveAfiliado = (a: Afiliado) => setJSON(`afiliados/${a.codigo}`, a);
export const deleteAfiliado = (codigo: string) => delKey(`afiliados/${codigo}`);

export async function getAfiliadoPorToken(token: string) {
  if (!/^[a-f0-9]{32}$/.test(token)) return null;
  return (await listAfiliados()).find((a) => a.token === token) ?? null;
}

/** Gera um código livre a partir do nome (joao, joao2, joao3…). */
export async function codigoLivre(base: string) {
  const raiz = slugify(base) || "parceiro";
  for (let i = 0; i < 50; i++) {
    const c = i === 0 ? raiz : `${raiz.slice(0, 18)}${i + 1}`;
    if (validCodigo(c) && !(await getAfiliado(c))) return c;
  }
  return `${raiz.slice(0, 12)}${randomBytes(3).toString("hex")}`;
}

export const novoToken = () => randomBytes(16).toString("hex");

export const arred = (n: number) => Math.round(n * 100) / 100;

export function resumoAfiliado(codigo: string, compras: Purchase[]) {
  const minhas = compras.filter((c) => c.afiliado?.codigo === codigo && c.source !== "demo");
  const aprovadas = minhas.filter((c) => c.status === "approved");
  const comissao = (c: Purchase) => c.afiliado?.comissao ?? 0;
  return {
    vendas: aprovadas.length,
    pendentes: minhas.filter((c) => c.status === "pending").length,
    vendido: arred(aprovadas.reduce((s, c) => s + (c.amount ?? 0), 0)),
    aPagar: arred(aprovadas.filter((c) => !c.comissaoPagaEm).reduce((s, c) => s + comissao(c), 0)),
    pago: arred(aprovadas.filter((c) => c.comissaoPagaEm).reduce((s, c) => s + comissao(c), 0)),
    compras: minhas,
  };
}
