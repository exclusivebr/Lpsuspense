import { randomBytes } from "node:crypto";
import { emailKey } from "./accounts";
import { DISCIPLINAS, NOTA, ORDEM_DISCIPLINAS, type DisciplinaId } from "./edital";
import type { Correcao, Placar } from "./simulados";
import { getJSON, listJSON, setJSON } from "./store";

export type Tentativa = Correcao & {
  id: string;
  email: string;
  simuladoId: string;
  titulo: string;
  questoes: string[];
  respostas: (number | null)[];
  duracaoSeg: number;
  finalizadoEm: string;
};

export function novoIdTentativa() {
  return Date.now().toString(36) + randomBytes(5).toString("hex");
}

export const salvarTentativa = (t: Tentativa) => setJSON(`attempts/${emailKey(t.email)}/${t.id}`, t);

export async function getTentativa(email: string, id: string) {
  if (!/^[a-z0-9]{8,30}$/.test(id)) return null;
  return getJSON<Tentativa>(`attempts/${emailKey(email)}/${id}`);
}

export async function listarTentativas(email: string) {
  const all = await listJSON<Tentativa>(`attempts/${emailKey(email)}/`);
  return all.sort((a, b) => b.finalizadoEm.localeCompare(a.finalizadoEm));
}

export const pct = (p?: Placar) => (p && p.total ? Math.round((p.acertos / p.total) * 100) : 0);

/** Converte o desempenho do aluno em uma nota projetada na prova real (0 a 60). */
export function consolidar(tentativas: Tentativa[]) {
  const disc = Object.fromEntries(ORDEM_DISCIPLINAS.map((d) => [d, { acertos: 0, total: 0 }])) as Record<DisciplinaId, Placar>;
  const assuntos: Record<string, Placar & { disciplina: DisciplinaId }> = {};
  let questoes = 0;
  for (const t of tentativas) {
    questoes += t.total;
    for (const d of ORDEM_DISCIPLINAS) {
      const p = t.porDisciplina[d];
      if (p) {
        disc[d].acertos += p.acertos;
        disc[d].total += p.total;
      }
    }
    for (const [k, p] of Object.entries(t.porAssunto)) {
      const a = (assuntos[k] ??= { acertos: 0, total: 0, disciplina: p.disciplina });
      a.acertos += p.acertos;
      a.total += p.total;
    }
  }
  const cobertas = ORDEM_DISCIPLINAS.filter((d) => disc[d].total > 0);
  const projecao = Math.round(
    ORDEM_DISCIPLINAS.reduce((s, d) => s + (disc[d].total ? disc[d].acertos / disc[d].total : 0) * DISCIPLINAS[d].questoes, 0),
  );
  const fracos = Object.entries(assuntos)
    .filter(([, a]) => a.total >= 2)
    .map(([k, a]) => ({ assunto: k.split("::")[1], disciplina: a.disciplina, pct: pct(a), total: a.total }))
    .sort((a, b) => a.pct - b.pct || b.total - a.total)
    .slice(0, 8);
  const completos = tentativas.filter((t) => t.simuladoId.startsWith("completo-"));
  const status =
    cobertas.length < ORDEM_DISCIPLINAS.length
      ? { nivel: "incompleto" as const, texto: "Faça ao menos um simulado completo para liberar a projeção da sua nota." }
      : projecao >= NOTA.corteEstimado.max + 4
        ? { nivel: "forte" as const, texto: "Você está acima da faixa de corte estimada. Mantenha o ritmo e treine a redação." }
        : projecao >= NOTA.corteEstimado.min
          ? { nivel: "briga" as const, texto: "Você está dentro da faixa de corte: cada questão a mais faz diferença. Ataque seus pontos fracos." }
          : projecao >= NOTA.minimaObjetiva
            ? { nivel: "atencao" as const, texto: "Você passa da nota mínima, mas ainda está abaixo da faixa de corte estimada. Foque em Português e Matemática." }
            : { nivel: "risco" as const, texto: "Abaixo da nota mínima de 30 pontos. Volte à base: estude a teoria dos assuntos fracos e refaça os treinos por matéria." };
  return { disc, projecao, fracos, questoes, status, cobertas, completos };
}
