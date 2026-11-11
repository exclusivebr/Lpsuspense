import PrintButton from "@/components/PrintButton";
import { EDITAL_ATUAL } from "@/lib/edital";
import { montarPlano, nomeDisc, ROTINA } from "@/lib/plano";
import { dataBR } from "@/lib/site";

export const dynamic = "force-dynamic";

const fmt = (d: Date) => d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });

export default function PlanoPage() {
  const semanas = montarPlano();
  return (
    <main className="pm-page">
      <div className="pm-narrow">
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1>Plano de estudos</h1>
            <p className="pm-muted">
              {semanas.length} semana(s) de hoje até a prova ({dataBR(EDITAL_ATUAL.dataProva)}). O plano começa pelos assuntos que mais
              caem e se ajusta sozinho conforme a data se aproxima.
            </p>
          </div>
          <PrintButton label="Imprimir plano" />
        </div>

        <div className="pm-card" style={{ margin: "12px 0 28px" }}>
          <h3>Rotina diária sugerida (≈ 2 horas)</h3>
          <div className="pm-table-wrap" style={{ marginTop: 10 }}>
            <table style={{ minWidth: 0 }}>
              <tbody>
                {ROTINA.map((r) => (
                  <tr key={r.oque}>
                    <td style={{ fontWeight: 700, width: 110 }}>{r.bloco}</td>
                    <td>{r.oque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {semanas.map((s) => (
          <div className="pm-week" key={s.numero}>
            <h3>
              Semana {s.numero} · {fmt(s.inicio)} <span className="pm-tag">{s.fase}</span>
            </h3>
            <ul className="pm-list">
              {s.estudo.map((e) => (
                <li key={e.disciplina}>
                  <strong>{nomeDisc(e.disciplina)}:</strong> {e.topicos.join("; ")}
                </li>
              ))}
              <li>
                <strong>Simulado:</strong> {s.simulado}
              </li>
              {s.redacao && (
                <li>
                  <strong>Redação:</strong> escreva 1 texto com tema da página Redação
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
