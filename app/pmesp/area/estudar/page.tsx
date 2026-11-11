import Link from "next/link";
import { CONTEUDO, DISCIPLINAS, ORDEM_DISCIPLINAS, type Prioridade } from "@/lib/pmesp/edital";

const TAG: Record<Prioridade, string> = { altíssima: "pm-tag-bad", alta: "pm-tag-warn", média: "", baixa: "" };

export default function EstudarPage() {
  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <h1>O que estudar</h1>
        <p className="pm-muted" style={{ maxWidth: 760 }}>
          Este é o conteúdo do edital, organizado pelo que mais caiu nas provas de Soldado PM de 2022 a 2026. Comece pelos assuntos
          de prioridade <strong>altíssima</strong> e <strong>alta</strong>: eles concentram a maior parte das questões.
        </p>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 8px" }}>
          {ORDEM_DISCIPLINAS.map((d) => (
            <a key={d} href={`#${d}`} className="pm-tag" style={{ textDecoration: "none" }}>
              {DISCIPLINAS[d].curto} · {DISCIPLINAS[d].questoes}q
            </a>
          ))}
        </nav>
        {ORDEM_DISCIPLINAS.map((d) => (
          <section key={d} id={d} style={{ marginTop: 28, scrollMarginTop: 80 }}>
            <h2 style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: DISCIPLINAS[d].cor, display: "inline-block" }} />
              {DISCIPLINAS[d].nome} <span className="pm-tag">{DISCIPLINAS[d].questoes} questões</span>
            </h2>
            <p>{CONTEUDO[d].resumo}</p>
            <div className="pm-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Assunto</th>
                    <th>Prioridade</th>
                    <th>Dica de prova</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTEUDO[d].topicos.map((t) => (
                    <tr key={t.nome}>
                      <td style={{ fontWeight: 700, color: "var(--ink)" }}>{t.nome}</td>
                      <td>
                        <span className={`pm-tag ${TAG[t.prioridade]}`}>{t.prioridade}</span>
                      </td>
                      <td>{t.dica}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href={`/pmesp/area/simulados/materia-${d}`} className="pm-btn pm-btn-ghost" style={{ marginTop: 12 }}>
              Treinar {DISCIPLINAS[d].curto}
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
