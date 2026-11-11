import type { DisciplinaId } from "../edital";

export type Questao = {
  id: string;
  disciplina: DisciplinaId;
  assunto: string;
  /** Texto-base compartilhado (ver TEXTOS). */
  texto?: string;
  enunciado: string;
  alternativas: [string, string, string, string, string];
  /** Índice da alternativa correta (0 = A … 4 = E). */
  correta: 0 | 1 | 2 | 3 | 4;
  explicacao: string;
};

export type Texto = { titulo: string; fonte: string; paragrafos: string[] };

const SEQ = [2, 4, 0, 3, 1, 0, 3, 1, 4, 2, 4, 1, 3, 2, 0, 1, 2, 4, 0, 3];
const contador: Partial<Record<DisciplinaId, number>> = {};

/** Atalho para escrever as questões de forma compacta. */
export function q(
  disciplina: DisciplinaId,
  id: string,
  assunto: string,
  enunciado: string,
  alternativas: [string, string, string, string, string],
  correta: "A" | "B" | "C" | "D" | "E",
  explicacao: string,
  texto?: string,
): Questao {
  let alts = alternativas;
  let idx = "ABCDE".indexOf(correta);
  // Alternativas numéricas ficam em ordem crescente, como na prova. As demais têm a posição
  // da resposta certa redistribuída de forma equilibrada entre A e E (sem "letra preferida").
  if (!alternativas.every((a) => /^(R\$\s*)?[\d.,]/.test(a.trim()))) {
    const target = SEQ[(contador[disciplina] = (contador[disciplina] ?? 0) + 1) % SEQ.length];
    alts = [...alternativas] as typeof alternativas;
    [alts[idx], alts[target]] = [alts[target], alts[idx]];
    idx = target;
  }
  return {
    id,
    disciplina,
    assunto,
    enunciado,
    alternativas: alts,
    correta: idx as Questao["correta"],
    explicacao,
    ...(texto ? { texto } : {}),
  };
}
