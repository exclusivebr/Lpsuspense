import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { requireStudent } from "@/lib/accounts";
import { DISCIPLINAS, NOTA, ORDEM_DISCIPLINAS } from "@/lib/edital";
import { consolidar, listarTentativas, pct } from "@/lib/resultados";
import { SIMULADOS } from "@/lib/simulados";

export const dynamic = "force-dynamic";

const COR = { incompleto: "var(--muted)", forte: "var(--ok)", briga: "var(--gold)", atencao: "var(--warn)", risco: "var(--bad)" };
const ROTULO = { incompleto: "Dados insuficientes", forte: "Pronto para a prova", briga: "Na briga pela vaga", atencao: "Atenção", risco: "Zona de risco" };

export default async function DesempenhoPage() {
  const aluno = await requireStudent();
  const tentativas = await listarTentativas(aluno.id);
  const c = consolidar(tentativas);
  const completos = SIMULADOS.filter((s) => s.tipo === "completo");
  const feitosCompletos = completos.filter((s) => tentativas.some((t) => t.simuladoId === s.id)).length;
  // Evolução: simulados completos em ordem cronológica.
  const evolucao = [...c.completos].reverse();

  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p className="pm-muted" style={{ marginBottom: 4 }}>
              {aluno.nome} · {c.questoes} questões resolvidas em {tentativas.length} tentativa(s)
            </p>
            <h1>Resultado final</h1>
          </div>
          <PrintButton />
        </div>

        {tentativas.length === 0 ? (
          <div className="pm-card" style={{ marginTop: 16 }}>
            <h3>Nenhum simulado feito ainda</h3>
            <p className="pm-muted">Seu resultado final é montado a partir de todos os simulados que você fizer. Comece pelo primeiro completo.</p>
            <Link href={`/area/simulados/${completos[0].id}`} className="pm-btn pm-btn-gold">
              Fazer o Simulado Completo 01
            </Link>
          </div>
        ) : (
          <>
            <div className="pm-grid pm-grid-2" style={{ marginTop: 16, alignItems: "start" }}>
              <div className="pm-card pm-center">
                <span className="pm-tag" style={{ background: COR[c.status.nivel], color: "#fff" }}>
                  {ROTULO[c.status.nivel]}
                </span>
                <div className="pm-score" style={{ marginTop: 14, ["--p" as string]: Math.round((c.projecao / 60) * 100), ["--c" as string]: COR[c.status.nivel] }}>
                  <div>
                    <div>
                      <strong>{c.status.nivel === "incompleto" ? "—" : c.projecao}</strong>
                      <span>nota projetada / 60</span>
                    </div>
                  </div>
                </div>
                <p style={{ textAlign: "left" }}>{c.status.texto}</p>
                <div className="pm-table-wrap" style={{ textAlign: "left" }}>
                  <table style={{ minWidth: 0 }}>
                    <tbody>
                      <tr>
                        <td>Nota mínima do edital</td>
                        <td style={{ fontWeight: 700 }}>{NOTA.minimaObjetiva} pontos</td>
                      </tr>
                      <tr>
                        <td>Faixa de corte estimada</td>
                        <td style={{ fontWeight: 700 }}>
                          {NOTA.corteEstimado.min} a {NOTA.corteEstimado.max}
                        </td>
                      </tr>
                      <tr>
                        <td>Simulados completos feitos</td>
                        <td style={{ fontWeight: 700 }}>
                          {feitosCompletos}/{completos.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="pm-muted pm-small" style={{ textAlign: "left", marginTop: 10, marginBottom: 0 }}>
                  A projeção aplica o seu aproveitamento em cada matéria ao número de questões que ela tem na prova. A faixa de
                  corte é uma estimativa baseada em concursos anteriores, não um número oficial.
                </p>
              </div>

              <div className="pm-card">
                <h3>Aproveitamento por matéria (todas as tentativas)</h3>
                <div className="pm-table-wrap" style={{ marginTop: 10 }}>
                  <table style={{ minWidth: 0 }}>
                    <thead>
                      <tr>
                        <th>Matéria</th>
                        <th>Acerto</th>
                        <th>Projeção na prova</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ORDEM_DISCIPLINAS.map((d) => {
                        const p = c.disc[d];
                        return (
                          <tr key={d}>
                            <td>
                              {DISCIPLINAS[d].curto}
                              <div className="pm-bar" style={{ marginTop: 4 }}>
                                <i style={{ width: `${pct(p)}%`, background: DISCIPLINAS[d].cor }} />
                              </div>
                            </td>
                            <td>{p.total ? `${pct(p)}%` : "—"}</td>
                            <td style={{ fontWeight: 700 }}>
                              {p.total ? Math.round((p.acertos / p.total) * DISCIPLINAS[d].questoes) : "—"} / {DISCIPLINAS[d].questoes}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {evolucao.length > 0 && (
                  <>
                    <h3 style={{ marginTop: 22 }}>Evolução nos simulados completos</h3>
                    <svg viewBox={`0 0 ${Math.max(evolucao.length, 2) * 60} 140`} width="100%" height="140" role="img" aria-label="Evolução de acertos">
                      <line x1="0" x2="100%" y1={130 - (NOTA.corteEstimado.min / 60) * 120} y2={130 - (NOTA.corteEstimado.min / 60) * 120} stroke="var(--gold)" strokeDasharray="4 4" />
                      {evolucao.map((t, i) => {
                        const h = (t.acertos / 60) * 120;
                        return (
                          <g key={t.id}>
                            <rect x={i * 60 + 14} y={130 - h} width="32" height={h} rx="5" fill="var(--navy-2)" />
                            <text x={i * 60 + 30} y={124 - h} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">
                              {t.acertos}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <p className="pm-muted pm-small" style={{ margin: 0 }}>
                      Linha tracejada: início da faixa de corte estimada ({NOTA.corteEstimado.min} acertos).
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="pm-grid pm-grid-2" style={{ marginTop: 16, alignItems: "start" }}>
              <div className="pm-card">
                <h3>Seus pontos fracos (estude primeiro)</h3>
                {c.fracos.length === 0 ? (
                  <p className="pm-muted">Faça mais questões para identificarmos seus pontos fracos.</p>
                ) : (
                  <ol className="pm-list" style={{ marginTop: 10 }}>
                    {c.fracos.map((f) => (
                      <li key={f.disciplina + f.assunto}>
                        <strong>{f.assunto}</strong> <span className="pm-muted">({DISCIPLINAS[f.disciplina].curto})</span> —{" "}
                        <span style={{ color: f.pct < 50 ? "var(--bad)" : "var(--warn)", fontWeight: 700 }}>{f.pct}%</span>
                      </li>
                    ))}
                  </ol>
                )}
                <Link href="/area/estudar" className="pm-btn pm-btn-ghost pm-no-print" style={{ marginTop: 8 }}>
                  Ver o que estudar
                </Link>
              </div>
              <div className="pm-card">
                <h3>Histórico de tentativas</h3>
                <div className="pm-table-wrap" style={{ marginTop: 10 }}>
                  <table style={{ minWidth: 0 }}>
                    <tbody>
                      {tentativas.map((t) => (
                        <tr key={t.id}>
                          <td>
                            <Link href={`/area/resultado/${t.id}`}>{t.titulo}</Link>
                            <div className="pm-muted pm-small">
                              {new Date(t.finalizadoEm).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                            {t.acertos}/{t.total}
                          </td>
                          <td>{pct(t)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
