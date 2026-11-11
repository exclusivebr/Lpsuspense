import { ATUALIZADO_EM, CRONOGRAMA, DISCIPLINAS, EDITAL_ATUAL, ETAPAS, HISTORICO, NOTA, ORDEM_DISCIPLINAS, REQUISITOS } from "@/lib/edital";

export default function EditalPage() {
  const info: [string, string][] = [
    ["Edital", EDITAL_ATUAL.numero],
    ["Cargo", EDITAL_ATUAL.cargo],
    ["Banca", EDITAL_ATUAL.banca],
    ["Publicação", EDITAL_ATUAL.publicacao],
    ["Vagas", EDITAL_ATUAL.vagas],
    ["Salário", EDITAL_ATUAL.salario],
    ["Escolaridade", EDITAL_ATUAL.escolaridade],
    ["Inscrições", "09/11/2026 (10h) a 22/12/2026 (23h59)"],
    ["Onde se inscrever", EDITAL_ATUAL.ondeInscrever],
    ["Taxa", `${EDITAL_ATUAL.taxa} (pagamento até 23/12/2026)`],
    ["Prova", "28/02/2027, à tarde (objetiva + redação)"],
    ["Locais de prova", EDITAL_ATUAL.cidadesProva],
  ];
  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <h1>Edital {EDITAL_ATUAL.numero}</h1>
        <p className="pm-note">
          Resumo atualizado em {ATUALIZADO_EM}. A Vunesp pode publicar retificações: confira sempre o edital oficial em{" "}
          <a href={EDITAL_ATUAL.linkOficial} target="_blank" rel="noreferrer">
            concursos.policiamilitar.sp.gov.br
          </a>{" "}
          e em vunesp.com.br.
        </p>

        <div className="pm-grid pm-grid-2" style={{ marginTop: 20, alignItems: "start" }}>
          <section className="pm-card">
            <h2 style={{ fontSize: 22 }}>Resumo do concurso</h2>
            <div className="pm-table-wrap">
              <table style={{ minWidth: 0 }}>
                <tbody>
                  {info.map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ fontWeight: 700, color: "var(--ink)", width: "38%" }}>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="pm-card">
            <h2 style={{ fontSize: 22 }}>Cronograma</h2>
            <div className="pm-table-wrap">
              <table style={{ minWidth: 0 }}>
                <tbody>
                  {CRONOGRAMA.map((c) => (
                    <tr key={c.evento}>
                      <td style={{ fontWeight: 700, color: "var(--ink)", width: "38%" }}>{c.data}</td>
                      <td>
                        {c.evento} {c.status === "previsto" && <span className="pm-tag pm-tag-warn">previsto</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 style={{ fontSize: 22, marginTop: 22 }}>Requisitos</h2>
            <ul className="pm-check">
              {REQUISITOS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        </div>

        <section style={{ marginTop: 32 }}>
          <h2>Como é a prova objetiva</h2>
          <div className="pm-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Questões</th>
                  <th>Peso na prova</th>
                </tr>
              </thead>
              <tbody>
                {ORDEM_DISCIPLINAS.map((d) => (
                  <tr key={d}>
                    <td style={{ fontWeight: 700 }}>{DISCIPLINAS[d].nome}</td>
                    <td>{DISCIPLINAS[d].questoes}</td>
                    <td>{Math.round((DISCIPLINAS[d].questoes / 60) * 100)}%</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 800 }}>Total</td>
                  <td style={{ fontWeight: 800 }}>60</td>
                  <td>Mínimo de {NOTA.minimaObjetiva} pontos</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pm-muted pm-small" style={{ marginTop: 8 }}>
            Cada questão vale 1 ponto, com 5 alternativas. A redação vale de 0 a {NOTA.redacaoMax} pontos (mínimo de {NOTA.redacaoMin}).
            A nota final da 1ª fase soma objetiva e redação.
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>Etapas do concurso</h2>
          <div className="pm-grid pm-grid-2">
            {ETAPAS.map((e) => (
              <div className="pm-card" key={e.nome}>
                <h3>{e.nome}</h3>
                <p className="pm-muted" style={{ margin: 0 }}>
                  {e.detalhe}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>Histórico: últimos 5 anos</h2>
          <div className="pm-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ano</th>
                  <th>Edital</th>
                  <th>Banca</th>
                  <th>Vagas</th>
                  <th>Data da prova</th>
                  <th>Inscritos / obs.</th>
                </tr>
              </thead>
              <tbody>
                {HISTORICO.map((h) => (
                  <tr key={h.ano + h.edital}>
                    <td style={{ fontWeight: 700 }}>{h.ano}</td>
                    <td>{h.edital}</td>
                    <td>{h.banca}</td>
                    <td>{h.vagas}</td>
                    <td>{h.prova}</td>
                    <td>{[h.inscritos, h.obs].filter(Boolean).join(" · ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pm-muted pm-small" style={{ marginTop: 8 }}>
            Número de inscritos segundo levantamentos públicos. Em todos os ciclos, o cargo e as matérias foram os mesmos.
          </p>
        </section>
      </div>
    </main>
  );
}
