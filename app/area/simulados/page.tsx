import Link from "next/link";
import { requireStudent } from "@/lib/accounts";
import { listarTentativas, pct } from "@/lib/resultados";
import { SIMULADOS, type Simulado } from "@/lib/simulados";

export const dynamic = "force-dynamic";

const GRUPOS: { tipo: Simulado["tipo"]; titulo: string; texto: string }[] = [
  { tipo: "completo", titulo: "Simulados completos", texto: "Faça como no dia da prova: sem consulta, cronometrado, de uma vez só." },
  { tipo: "disciplina", titulo: "Treinos por matéria", texto: "Para fechar uma matéria de cada vez e atacar seus pontos fracos." },
  { tipo: "turbo", titulo: "Revisão rápida", texto: "Questões sorteadas a cada tentativa." },
];

export default async function SimuladosPage() {
  const aluno = await requireStudent();
  const tentativas = await listarTentativas(aluno.email);

  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <h1>Simulados</h1>
        <p className="pm-muted">
          Questões inéditas no padrão Vunesp. A correção sai na hora, com o comentário de cada questão, e todas as tentativas
          entram no seu <Link href="/area/desempenho">resultado final</Link>.
        </p>
        {GRUPOS.map((g) => (
          <section key={g.tipo} style={{ marginTop: 28 }}>
            <h2>{g.titulo}</h2>
            <p className="pm-muted">{g.texto}</p>
            <div className="pm-grid pm-grid-3">
              {SIMULADOS.filter((s) => s.tipo === g.tipo).map((s) => {
                const minhas = tentativas.filter((t) => t.simuladoId === s.id);
                const melhor = minhas.reduce<number | null>((m, t) => Math.max(m ?? 0, pct(t)), null);
                const ultima = minhas[0];
                return (
                  <div className="pm-card" key={s.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span className="pm-tag">{s.tipo === "turbo" ? 30 : s.questoes.length} questões</span>
                      <span className="pm-tag">{s.minutos >= 60 ? `${Math.floor(s.minutos / 60)}h${s.minutos % 60 ? String(s.minutos % 60).padStart(2, "0") : ""}` : `${s.minutos} min`}</span>
                      {melhor !== null && <span className={`pm-tag ${melhor >= 60 ? "pm-tag-ok" : "pm-tag-warn"}`}>melhor: {melhor}%</span>}
                    </div>
                    <h3 style={{ margin: 0 }}>{s.titulo}</h3>
                    <p className="pm-muted pm-small" style={{ margin: 0, flex: 1 }}>
                      {s.descricao}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Link href={`/area/simulados/${s.id}`} className="pm-btn pm-btn-navy" style={{ padding: "10px 16px", fontSize: 15 }}>
                        {minhas.length ? "Refazer" : "Começar"}
                      </Link>
                      {ultima && (
                        <Link href={`/area/resultado/${ultima.id}`} className="pm-btn pm-btn-ghost" style={{ padding: "10px 16px", fontSize: 15 }}>
                          Último resultado
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
