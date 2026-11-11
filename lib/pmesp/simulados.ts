import { DISCIPLINAS, ORDEM_DISCIPLINAS, type DisciplinaId } from "./edital";
import { ADMINISTRACAO } from "./questoes/administracao";
import { GERAIS } from "./questoes/gerais";
import { INFORMATICA } from "./questoes/informatica";
import { MATEMATICA } from "./questoes/matematica";
import { PORTUGUES, TEXTOS } from "./questoes/portugues";
import type { Questao, Texto } from "./questoes/tipos";

export { TEXTOS };
export type { Questao, Texto };

export const BANCO: Questao[] = [...PORTUGUES, ...MATEMATICA, ...GERAIS, ...INFORMATICA, ...ADMINISTRACAO];
const POR_ID = new Map(BANCO.map((q) => [q.id, q]));
export const getQuestao = (id: string) => POR_ID.get(id);

const POR_DISCIPLINA: Record<DisciplinaId, Questao[]> = {
  portugues: PORTUGUES,
  matematica: MATEMATICA,
  gerais: GERAIS,
  informatica: INFORMATICA,
  administracao: ADMINISTRACAO,
};

export type Simulado = {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "completo" | "disciplina" | "turbo";
  minutos: number;
  /** Vazio no simulado turbo (sorteado a cada tentativa). */
  questoes: string[];
};

/** Fatia n (1, 2, 3…) do banco de uma disciplina, no tamanho que a prova cobra. */
function fatia(d: DisciplinaId, n: number) {
  const size = DISCIPLINAS[d].questoes;
  return POR_DISCIPLINA[d].slice((n - 1) * size, n * size).map((q) => q.id);
}

const totalCompletos = Math.min(
  ...ORDEM_DISCIPLINAS.map((d) => Math.floor(POR_DISCIPLINA[d].length / DISCIPLINAS[d].questoes)),
);

const COMPLETOS: Simulado[] = Array.from({ length: totalCompletos }, (_, k) => ({
  id: `completo-${k + 1}`,
  titulo: `Simulado Completo ${String(k + 1).padStart(2, "0")}`,
  descricao: "60 questões na mesma distribuição da prova: 20 de Português, 15 de Matemática, 15 de Conhecimentos Gerais, 5 de Informática e 5 de Administração Pública.",
  tipo: "completo",
  minutos: 240,
  questoes: ORDEM_DISCIPLINAS.flatMap((d) => fatia(d, k + 1)),
}));

const POR_MATERIA: Simulado[] = ORDEM_DISCIPLINAS.map((d) => ({
  id: `materia-${d}`,
  titulo: `Treino de ${DISCIPLINAS[d].nome}`,
  descricao: `Todas as ${POR_DISCIPLINA[d].length} questões de ${DISCIPLINAS[d].nome} do banco, para fechar a matéria.`,
  tipo: "disciplina",
  minutos: Math.ceil(POR_DISCIPLINA[d].length * 3),
  questoes: POR_DISCIPLINA[d].map((q) => q.id),
}));

const TURBO: Simulado = {
  id: "turbo",
  titulo: "Simulado Turbo (sorteado)",
  descricao: "30 questões sorteadas do banco a cada tentativa, na proporção da prova. Ótimo para revisar em 1h30.",
  tipo: "turbo",
  minutos: 90,
  questoes: [],
};

export const SIMULADOS: Simulado[] = [...COMPLETOS, ...POR_MATERIA, TURBO];
export const getSimulado = (id: string) => SIMULADOS.find((s) => s.id === id);

const TURBO_MIX: Record<DisciplinaId, number> = { portugues: 10, matematica: 8, gerais: 7, informatica: 3, administracao: 2 };

export function sortearTurbo(): string[] {
  return ORDEM_DISCIPLINAS.flatMap((d) => {
    const ids = POR_DISCIPLINA[d].map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids.slice(0, TURBO_MIX[d]);
  });
}

export function validarTurbo(ids: string[]) {
  if (new Set(ids).size !== ids.length) return false;
  return ORDEM_DISCIPLINAS.every(
    (d) => ids.filter((id) => getQuestao(id)?.disciplina === d).length === TURBO_MIX[d],
  ) && ids.every((id) => POR_ID.has(id));
}

/** Versão da questão enviada ao navegador: sem gabarito e sem explicação. */
export type QuestaoPublica = Omit<Questao, "correta" | "explicacao">;
export function publica(q: Questao): QuestaoPublica {
  const { correta: _c, explicacao: _e, ...rest } = q;
  return rest;
}

export type Placar = { acertos: number; total: number };

export type Correcao = {
  acertos: number;
  total: number;
  porDisciplina: Partial<Record<DisciplinaId, Placar>>;
  porAssunto: Record<string, Placar & { disciplina: DisciplinaId }>;
};

export function corrigir(ids: string[], respostas: (number | null)[]): Correcao {
  const out: Correcao = { acertos: 0, total: 0, porDisciplina: {}, porAssunto: {} };
  ids.forEach((id, i) => {
    const q = POR_ID.get(id);
    if (!q) return;
    const ok = respostas[i] === q.correta ? 1 : 0;
    out.total++;
    out.acertos += ok;
    const d = (out.porDisciplina[q.disciplina] ??= { acertos: 0, total: 0 });
    d.total++;
    d.acertos += ok;
    const key = `${q.disciplina}::${q.assunto}`;
    const a = (out.porAssunto[key] ??= { acertos: 0, total: 0, disciplina: q.disciplina });
    a.total++;
    a.acertos += ok;
  });
  return out;
}
