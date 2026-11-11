import { CONTEUDO, DISCIPLINAS, EDITAL_ATUAL, type DisciplinaId, type Prioridade } from "./edital";

const PESO: Record<Prioridade, number> = { altíssima: 0, alta: 1, média: 2, baixa: 3 };
const DIA = 86_400_000;

export type Semana = {
  numero: number;
  inicio: Date;
  fase: string;
  estudo: { disciplina: DisciplinaId; topicos: string[] }[];
  simulado: string;
  redacao: boolean;
};

function fila(d: DisciplinaId) {
  return [...CONTEUDO[d].topicos].sort((a, b) => PESO[a.prioridade] - PESO[b.prioridade]).map((t) => t.nome);
}

/** Monta um cronograma semanal de hoje até a prova. */
export function montarPlano(hoje = new Date()): Semana[] {
  const prova = new Date(EDITAL_ATUAL.dataProva);
  const total = Math.max(1, Math.min(30, Math.ceil((prova.getTime() - hoje.getTime()) / (7 * DIA))));
  const reta = total >= 4 ? 2 : total >= 2 ? 1 : 0;
  const estudo = total - reta;
  const filas = { portugues: fila("portugues"), matematica: fila("matematica"), gerais: fila("gerais"), informatica: fila("informatica"), administracao: fila("administracao") };
  const pos = { portugues: 0, matematica: 0, gerais: 0, informatica: 0, administracao: 0 } as Record<DisciplinaId, number>;
  const pega = (d: DisciplinaId, n: number) =>
    Array.from({ length: n }, () => {
      const f = filas[d];
      const t = f[pos[d] % f.length];
      const rev = pos[d] >= f.length;
      pos[d]++;
      return rev ? `${t} (revisão)` : t;
    });

  const marcos = new Map<number, string>([
    [1, "Simulado Completo 01 (diagnóstico)"],
    [Math.max(2, Math.round(estudo / 2)), "Simulado Completo 02"],
    [Math.max(3, estudo), "Simulado Completo 03"],
  ]);
  const treinos = ["Treino de Língua Portuguesa", "Treino de Matemática", "Treino de Conhecimentos Gerais", "Treino de Informática + Treino de Adm. Pública", "Simulado Turbo"];

  return Array.from({ length: total }, (_, i) => {
    const n = i + 1;
    const inicio = new Date(hoje.getTime() + i * 7 * DIA);
    if (n > estudo) {
      return {
        numero: n,
        inicio,
        fase: "Reta final",
        estudo: [
          { disciplina: "portugues" as const, topicos: ["Refazer as questões que você errou nos simulados"] },
          { disciplina: "gerais" as const, topicos: ["Atualidades dos últimos 6 meses (resumos)"] },
          { disciplina: "administracao" as const, topicos: ["Leitura dos arts. 5º, 37 a 41, 42 e 144 da CF"] },
        ],
        simulado: n === total ? "Simulado Turbo + descanso nos 2 dias antes da prova" : "Refazer o simulado completo com a pior nota",
        redacao: true,
      };
    }
    const fase = n <= Math.ceil(estudo / 3) ? "Base" : n <= Math.ceil((2 * estudo) / 3) ? "Aprofundamento" : "Consolidação";
    return {
      numero: n,
      inicio,
      fase,
      estudo: [
        { disciplina: "portugues" as const, topicos: pega("portugues", 2) },
        { disciplina: "matematica" as const, topicos: pega("matematica", 2) },
        { disciplina: "gerais" as const, topicos: pega("gerais", 1) },
        { disciplina: (n % 2 ? "informatica" : "administracao") as DisciplinaId, topicos: pega(n % 2 ? "informatica" : "administracao", 1) },
      ],
      simulado: marcos.get(n) ?? treinos[(n - 2 + treinos.length) % treinos.length],
      redacao: n % 2 === 0,
    };
  });
}

export const ROTINA = [
  { bloco: "40 min", oque: "Português (teoria + 10 questões)" },
  { bloco: "40 min", oque: "Matemática (teoria + 8 questões, sempre no papel)" },
  { bloco: "25 min", oque: "Conhecimentos Gerais / Atualidades (leia notícias e anote)" },
  { bloco: "15 min", oque: "Informática ou Adm. Pública (letra da lei / atalhos)" },
  { bloco: "Sábado", oque: "Simulado da semana + correção comentada" },
  { bloco: "Domingo", oque: "Revisão dos erros, redação (quinzenal) e descanso" },
];

export const nomeDisc = (d: DisciplinaId) => DISCIPLINAS[d].curto;
