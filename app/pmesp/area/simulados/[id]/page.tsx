import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExamRunner from "@/components/pmesp/ExamRunner";
import { DISCIPLINAS } from "@/lib/pmesp/edital";
import { getQuestao, getSimulado, publica, sortearTurbo, TEXTOS, type Texto } from "@/lib/pmesp/simulados";
import { enviarSimulado } from "../actions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getSimulado(id)?.titulo ?? "Simulado" };
}

export default async function SimuladoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sim = getSimulado(id);
  if (!sim) notFound();
  const ids = sim.tipo === "turbo" ? sortearTurbo() : sim.questoes;
  const questoes = ids.map((qid) => getQuestao(qid)!).filter(Boolean);
  const textos: Record<string, Texto> = {};
  for (const q of questoes) if (q.texto) textos[q.texto] = TEXTOS[q.texto];
  const nomes = Object.fromEntries(Object.entries(DISCIPLINAS).map(([k, v]) => [k, v.nome]));

  return (
    <main style={{ paddingBottom: 64 }}>
      <div className="pm-wrap" style={{ paddingTop: 24 }}>
        <h1 style={{ fontSize: 28 }}>{sim.titulo}</h1>
        <p className="pm-muted" style={{ marginBottom: 0 }}>
          {questoes.length} questões · tempo sugerido de {sim.minutos} minutos. Marque uma alternativa por questão (clique de novo
          para desmarcar). Suas respostas ficam salvas neste aparelho até você entregar.
        </p>
      </div>
      <ExamRunner
        key={ids.join(",")}
        simuladoId={sim.id}
        minutos={sim.minutos}
        questoes={questoes.map(publica)}
        textos={textos}
        nomesDisciplinas={nomes}
        enviar={enviarSimulado}
      />
    </main>
  );
}
