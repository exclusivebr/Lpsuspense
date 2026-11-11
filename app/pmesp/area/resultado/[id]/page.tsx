import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/pmesp/PrintButton";
import ScrollTop from "@/components/pmesp/ScrollTop";
import { requireStudent } from "@/lib/pmesp/accounts";
import { DISCIPLINAS, NOTA, ORDEM_DISCIPLINAS } from "@/lib/pmesp/edital";
import { getTentativa, pct } from "@/lib/pmesp/resultados";
import { getQuestao, TEXTOS } from "@/lib/pmesp/simulados";

export const dynamic = "force-dynamic";
const L = ["A", "B", "C", "D", "E"];

function tempo(seg: number) {
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  return h ? `${h}h${String(m).padStart(2, "0")}` : `${m} min`;
}

export default async function ResultadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const aluno = await requireStudent();
  const t = await getTentativa(aluno.email, id);
  if (!t) notFound();

  const p = pct(t);
  const completo = t.simuladoId.startsWith("completo-");
  const veredito = completo
    ? t.acertos >= NOTA.corteEstimado.max
      ? { cls: "pm-okbox", txt: `Excelente! ${t.acertos} acertos está acima da faixa de corte estimada (${NOTA.corteEstimado.min}–${NOTA.corteEstimado.max}).` }
      : t.acertos >= NOTA.corteEstimado.min
        ? { cls: "pm-note", txt: `Você está dentro da faixa de corte estimada (${NOTA.corteEstimado.min}–${NOTA.corteEstimado.max}). Mais algumas questões e você entra com folga.` }
        : t.acertos >= NOTA.minimaObjetiva
          ? { cls: "pm-note", txt: `Você passou da nota mínima (${NOTA.minimaObjetiva}), mas ainda está abaixo da faixa de corte estimada. Foque nos assuntos em vermelho abaixo.` }
          : { cls: "pm-error", txt: `Abaixo da nota mínima de ${NOTA.minimaObjetiva} pontos. Não desanime: revise os comentários de cada erro e refaça os treinos por matéria.` }
    : p >= 70
      ? { cls: "pm-okbox", txt: "Ótimo aproveitamento! Continue assim." }
      : p >= 50
        ? { cls: "pm-note", txt: "Bom caminho. Revise os comentários das questões que você errou." }
        : { cls: "pm-error", txt: "Esta matéria precisa de reforço. Volte à teoria dos assuntos que você errou e refaça o treino." };
  const cor = p >= 60 ? "var(--ok)" : p >= 50 ? "var(--gold)" : "var(--bad)";

  let ultimoTexto: string | undefined;

  return (
    <main className="pm-page">
      <ScrollTop />
      <div className="pm-wrap">
        <p className="pm-muted" style={{ marginBottom: 4 }}>
          Resultado · {new Date(t.finalizadoEm).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}
        </p>
        <h1>{t.titulo}</h1>

        <div className="pm-grid pm-grid-2" style={{ marginTop: 16, alignItems: "start" }}>
          <div className="pm-card pm-center">
            <div className="pm-score" style={{ ["--p" as string]: p, ["--c" as string]: cor }}>
              <div>
                <div>
                  <strong>
                    {t.acertos}/{t.total}
                  </strong>
                  <span>{p}% de acerto</span>
                </div>
              </div>
            </div>
            <p className="pm-muted pm-small">Tempo: {tempo(t.duracaoSeg)}</p>
            <p className={veredito.cls} style={{ textAlign: "left" }}>
              {veredito.txt}
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }} className="pm-no-print">
              <Link href={`/pmesp/area/simulados/${t.simuladoId}`} className="pm-btn pm-btn-navy">
                Refazer
              </Link>
              <Link href="/pmesp/area/desempenho" className="pm-btn pm-btn-ghost">
                Resultado final
              </Link>
              <PrintButton label="Imprimir" />
            </div>
          </div>
          <div className="pm-card">
            <h3>Desempenho por matéria</h3>
            <div className="pm-dist" style={{ marginTop: 12 }}>
              {ORDEM_DISCIPLINAS.filter((d) => t.porDisciplina[d]).map((d) => {
                const dp = t.porDisciplina[d]!;
                return (
                  <div key={d}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                      <span>{DISCIPLINAS[d].nome}</span>
                      <strong>
                        {dp.acertos}/{dp.total}
                      </strong>
                    </div>
                    <div className="pm-bar" style={{ marginTop: 4 }}>
                      <i style={{ width: `${pct(dp)}%`, background: DISCIPLINAS[d].cor }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <h3 style={{ marginTop: 22 }}>Mapa de respostas</h3>
            <div className="pm-map">
              {t.questoes.map((qid, i) => {
                const q = getQuestao(qid);
                const ok = q && t.respostas[i] === q.correta;
                return (
                  <a key={qid} href={`#q${i + 1}`} className={t.respostas[i] === null ? "" : ok ? "ok" : "bad"} title={t.respostas[i] === null ? "Em branco" : ok ? "Certa" : "Errada"}>
                    {i + 1}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: 36 }}>Correção comentada</h2>
        {t.questoes.map((qid, i) => {
          const q = getQuestao(qid);
          if (!q) return null;
          const resp = t.respostas[i];
          const showTexto = q.texto && q.texto !== ultimoTexto;
          ultimoTexto = q.texto;
          const tx = q.texto ? TEXTOS[q.texto] : undefined;
          return (
            <div key={qid}>
              {showTexto && tx && (
                <details className="pm-texto">
                  <summary style={{ cursor: "pointer", fontWeight: 700 }}>Texto: {tx.titulo} (clique para reler)</summary>
                  {tx.paragrafos.map((par, k) => (
                    <p key={k} style={{ marginTop: 10 }}>
                      {par}
                    </p>
                  ))}
                </details>
              )}
              <div className="pm-q" id={`q${i + 1}`}>
                <div className="pm-q-head">
                  <span className="pm-q-num">Questão {i + 1}</span>
                  <span className="pm-tag">{DISCIPLINAS[q.disciplina].curto}</span>
                  <span className="pm-tag">{q.assunto}</span>
                  {resp === q.correta ? (
                    <span className="pm-tag pm-tag-ok">Acertou</span>
                  ) : resp === null ? (
                    <span className="pm-tag pm-tag-warn">Em branco</span>
                  ) : (
                    <span className="pm-tag pm-tag-bad">Errou</span>
                  )}
                </div>
                <div className="pm-q-enun">{q.enunciado}</div>
                <div className="pm-alts">
                  {q.alternativas.map((alt, k) => (
                    <div key={k} className={`pm-alt ${k === q.correta ? "ok" : k === resp ? "bad" : ""}`} style={{ cursor: "default" }}>
                      <span className="l">{L[k]}</span>
                      <span>
                        {alt}
                        {k === resp && k !== q.correta && <em className="pm-small"> · sua resposta</em>}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pm-expl">
                  <strong>Gabarito: {L[q.correta]}.</strong> {q.explicacao}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
