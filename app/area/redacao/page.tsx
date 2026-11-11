import RedacaoEditor from "@/components/RedacaoEditor";
import { CRITERIOS_REDACAO, NOTA, TEMAS_REDACAO } from "@/lib/edital";

const ESTRUTURA = [
  { p: "1º parágrafo · Introdução", d: "Apresente o tema com um dado ou contexto e deixe clara a sua opinião (tese). 4 a 5 linhas." },
  { p: "2º parágrafo · Argumento 1", d: "Tópico frasal + explicação + exemplo (fato, lei, dado, situação real). 6 a 7 linhas." },
  { p: "3º parágrafo · Argumento 2", d: "Outro motivo que sustenta a tese, com exemplo diferente do anterior. 6 a 7 linhas." },
  { p: "4º parágrafo · Conclusão", d: "Retome a tese e proponha uma solução: quem faz, o quê e como. 4 a 5 linhas." },
];

export default function RedacaoPage() {
  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <h1>Redação</h1>
        <p className="pm-muted" style={{ maxWidth: 760 }}>
          Texto dissertativo-argumentativo, em prosa, de até 30 linhas, valendo de 0 a {NOTA.redacaoMax} pontos (mínimo de {NOTA.redacaoMin}).
          É feito no mesmo dia da prova objetiva: reserve cerca de 1 hora para ele.
        </p>
        <div className="pm-grid pm-grid-2" style={{ alignItems: "start", marginTop: 16 }}>
          <div className="pm-grid">
            <div className="pm-card">
              <h3>Estrutura que funciona</h3>
              {ESTRUTURA.map((e) => (
                <div key={e.p} style={{ marginTop: 10 }}>
                  <strong>{e.p}</strong>
                  <p className="pm-muted" style={{ margin: 0 }}>
                    {e.d}
                  </p>
                </div>
              ))}
            </div>
            <div className="pm-card">
              <h3>Checklist antes de entregar</h3>
              <ul className="pm-check" style={{ marginTop: 10 }}>
                {CRITERIOS_REDACAO.map((c) => (
                  <li key={c.nome}>
                    <strong>{c.nome}:</strong> {c.detalhe}
                  </li>
                ))}
                <li>
                  <strong>Proibido:</strong> título se o edital não pedir, gírias, 1ª pessoa em excesso, texto em versos ou em tópicos.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 22 }}>Treine agora</h2>
            <RedacaoEditor temas={TEMAS_REDACAO} />
          </div>
        </div>
      </div>
    </main>
  );
}
