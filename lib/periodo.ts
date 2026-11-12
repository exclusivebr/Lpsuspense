import type { Purchase } from "./accounts";

const TZ = "America/Sao_Paulo";
const DIA = 86_400_000;

/** Data (AAAA-MM-DD) no fuso de São Paulo. */
export const diaSP = (d: Date | string | number) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });

const ehData = (v?: string) => !!v && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v + "T12:00:00Z"));
const somaDias = (dia: string, n: number) => new Date(Date.parse(dia + "T12:00:00Z") + n * DIA).toISOString().slice(0, 10);
const diffDias = (a: string, b: string) => Math.round((Date.parse(b + "T12:00:00Z") - Date.parse(a + "T12:00:00Z")) / DIA);

export const PRESETS = [
  { id: "hoje", label: "Hoje" },
  { id: "7d", label: "7 dias" },
  { id: "30d", label: "30 dias" },
  { id: "90d", label: "90 dias" },
  { id: "tudo", label: "Tudo" },
] as const;

export type Periodo = { id: string; de: string; ate: string; titulo: string };

/** Lê o período da URL. Padrão: últimos 30 dias. Datas inclusivas, no fuso de SP. */
export function lerPeriodo(sp: { periodo?: string; de?: string; ate?: string }, compras: Purchase[]): Periodo {
  const hoje = diaSP(Date.now());
  const fmt = (d: string) => d.split("-").reverse().join("/");
  if (sp.periodo === "custom" && ehData(sp.de) && ehData(sp.ate)) {
    const [de, ate] = sp.de! <= sp.ate! ? [sp.de!, sp.ate!] : [sp.ate!, sp.de!];
    return { id: "custom", de, ate, titulo: `${fmt(de)} a ${fmt(ate)}` };
  }
  switch (sp.periodo) {
    case "hoje":
      return { id: "hoje", de: hoje, ate: hoje, titulo: "Hoje" };
    case "7d":
      return { id: "7d", de: somaDias(hoje, -6), ate: hoje, titulo: "Últimos 7 dias" };
    case "90d":
      return { id: "90d", de: somaDias(hoje, -89), ate: hoje, titulo: "Últimos 90 dias" };
    case "tudo": {
      const primeira = compras.reduce((m, c) => (diaSP(c.createdAt) < m ? diaSP(c.createdAt) : m), hoje);
      return { id: "tudo", de: primeira, ate: hoje, titulo: "Desde o início" };
    }
    default:
      return { id: "30d", de: somaDias(hoje, -29), ate: hoje, titulo: "Últimos 30 dias" };
  }
}

export const noPeriodo = (iso: string | undefined, p: Periodo) => {
  if (!iso) return false;
  const d = diaSP(iso);
  return d >= p.de && d <= p.ate;
};

export type Balde = { chave: string; rotulo: string; detalhe: string; de: string; ate: string };

/** Divide o período em dias (até 62 dias) ou semanas (períodos maiores). */
export function baldes(p: Periodo): Balde[] {
  const total = diffDias(p.de, p.ate) + 1;
  const passo = total > 62 ? 7 : 1;
  const out: Balde[] = [];
  const curto = (d: string) => d.slice(8, 10) + "/" + d.slice(5, 7);
  for (let i = 0; i < total; i += passo) {
    const de = somaDias(p.de, i);
    const ate = passo === 1 ? de : somaDias(p.de, Math.min(i + passo - 1, total - 1));
    out.push({
      chave: de,
      rotulo: curto(de),
      detalhe: passo === 1 ? new Date(de + "T12:00:00Z").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", timeZone: "UTC" }) : `${curto(de)} a ${curto(ate)}`,
      de,
      ate,
    });
  }
  return out;
}

export const indiceBalde = (bs: Balde[], iso: string) => {
  const d = diaSP(iso);
  return bs.findIndex((b) => d >= b.de && d <= b.ate);
};
