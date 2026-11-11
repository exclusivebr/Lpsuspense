import Link from "next/link";
import Countdown from "@/components/Countdown";
import { CompraForm } from "@/components/Forms";
import { CRONOGRAMA, DISCIPLINAS, EDITAL_ATUAL, HISTORICO, NOTA, ORDEM_DISCIPLINAS } from "@/lib/edital";
import { productPrice } from "@/lib/payments";
import { brl } from "@/lib/site";
import { BANCO, SIMULADOS } from "@/lib/simulados";
import { iniciarCompra } from "./actions";

export const dynamic = "force-dynamic";

const ENTREGAVEIS = [
  { t: `${SIMULADOS.length} simulados`, d: "3 simulados completos de 60 questões no formato da prova, 5 treinos por matéria e um simulado turbo sorteado, que muda a cada tentativa." },
  { t: `${BANCO.length} questões comentadas`, d: "Questões inéditas no padrão Vunesp, cada uma com o gabarito explicado: você entende o erro e não repete." },
  { t: "Resultado final com projeção", d: "Juntamos todos os seus simulados, projetamos sua nota de 0 a 60 e comparamos com a nota mínima e a faixa de corte estimada." },
  { t: "Raio-X dos últimos 5 anos", d: "O que mais caiu nas provas de 2022 a 2026, por matéria e por assunto, com a prioridade de cada tópico." },
  { t: "Edital mastigado", d: "Inscrições, taxa, data da prova, requisitos, etapas, TAF e o conteúdo programático completo do edital DP-4/321/26." },
  { t: "Plano de estudos até a prova", d: "Cronograma semana a semana, montado a partir de hoje até 28/02/2027, mais o guia de redação com temas e checklist." },
];

const FAQ = [
  { q: "Como recebo o acesso?", a: "Assim que o pagamento é aprovado (Pix aprova na hora), você volta para o site e cria sua senha. O login é o seu e-mail." },
  { q: "As questões são de provas anteriores?", a: "São questões inéditas, escritas no estilo da Vunesp a partir dos assuntos que mais caíram nas provas de Soldado PM de 2022 a 2026. Assim você treina o formato sem decorar respostas que já viu." },
  { q: "Por quanto tempo tenho acesso?", a: "Até a prova do concurso atual (28/02/2027), com todas as atualizações do edital incluídas." },
  { q: "Posso fazer pelo celular?", a: "Sim. Tudo funciona no celular, no tablet e no computador, e o simulado salva suas respostas se a página fechar." },
  { q: "Isso é oficial da PM ou da Vunesp?", a: "Não. É um material de estudo independente. A inscrição no concurso é feita só no site da Vunesp." },
];

export default function VendaPage() {
  const preco = productPrice();
  const maxQ = Math.max(...ORDEM_DISCIPLINAS.map((d) => DISCIPLINAS[d].questoes));
  return (
    <>
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
          <nav className="pm-nav">
            <a href="#edital">Edital</a>
            <a href="#oferta">Garantir acesso</a>
            <Link href="/entrar">Já sou aluno</Link>
          </nav>
        </div>
      </header>

      <section className="pm-hero">
        <div className="pm-wrap pm-hero-grid">
          <div>
            <span className="pm-pill">
              <i /> Edital {EDITAL_ATUAL.numero} aberto · inscrições até 22/12
            </span>
            <h1>
              Sua farda começa no <em>simulado certo</em>.
            </h1>
            <p className="lead">
              Simulados no padrão Vunesp, o edital da PMESP explicado do começo ao fim e um resultado final que mostra se a
              sua nota já passa do corte. Tudo num só lugar, para você chegar à prova de {EDITAL_ATUAL.vagas.split(" ")[0]} vagas pronto.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <a href="#oferta" className="pm-btn pm-btn-gold">
                Quero meu acesso por {brl(preco)}
              </a>
              <a href="#edital" className="pm-btn pm-btn-light">
                Ver o que cai na prova
              </a>
            </div>
          </div>
          <div className="pm-hero-card">
            <dl>
              <div>
                <dt>Vagas</dt>
                <dd>{EDITAL_ATUAL.vagas}</dd>
              </div>
              <div>
                <dt>Salário inicial</dt>
                <dd>{EDITAL_ATUAL.salario.split(" (")[0]}</dd>
              </div>
              <div>
                <dt>Inscrições</dt>
                <dd>09/11 a 22/12/2026 · taxa {EDITAL_ATUAL.taxa}</dd>
              </div>
              <div>
                <dt>Prova objetiva + redação</dt>
                <dd>28/02/2027 (tarde)</dd>
              </div>
              <div>
                <dt>Faltam para a prova</dt>
                <dd>
                  <Countdown target={EDITAL_ATUAL.dataProva} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="pm-section">
        <div className="pm-wrap">
          <h2 className="pm-center">O que você recebe</h2>
          <p className="pm-center pm-muted" style={{ maxWidth: 620, margin: "0 auto 28px" }}>
            Um treinamento completo para a prova objetiva e a redação do concurso de Soldado PM de 2ª Classe.
          </p>
          <div className="pm-grid pm-grid-3">
            {ENTREGAVEIS.map((e) => (
              <div className="pm-card" key={e.t}>
                <h3>{e.t}</h3>
                <p className="pm-muted" style={{ margin: 0 }}>
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-section" id="edital" style={{ background: "#fff", borderBlock: "1px solid var(--line)" }}>
        <div className="pm-wrap pm-grid pm-grid-2" style={{ alignItems: "start" }}>
          <div>
            <span className="pm-tag pm-tag-gold">Como é a prova</span>
            <h2 style={{ marginTop: 10 }}>60 questões + redação, em 5 horas</h2>
            <p>
              A prova objetiva vale de 0 a 60 pontos, e você precisa de no mínimo {NOTA.minimaObjetiva}. Na prática, a redação
              só é corrigida para quem fica entre os mais bem colocados. A faixa de corte estimada é de {NOTA.corteEstimado.min} a{" "}
              {NOTA.corteEstimado.max} acertos.
            </p>
            <div className="pm-dist" style={{ marginTop: 18 }}>
              {ORDEM_DISCIPLINAS.map((d) => (
                <div className="pm-dist-row" key={d}>
                  <span>{DISCIPLINAS[d].curto}</span>
                  <div className="pm-bar">
                    <i style={{ width: `${(DISCIPLINAS[d].questoes / maxQ) * 100}%`, background: DISCIPLINAS[d].cor }} />
                  </div>
                  <strong>{DISCIPLINAS[d].questoes}</strong>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="pm-tag pm-tag-gold">Calendário</span>
            <h2 style={{ marginTop: 10 }}>Datas do concurso</h2>
            <div className="pm-table-wrap">
              <table>
                <tbody>
                  {CRONOGRAMA.map((c) => (
                    <tr key={c.evento}>
                      <td style={{ fontWeight: 700, color: "var(--ink)", width: "38%" }}>{c.data}</td>
                      <td>{c.evento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pm-section">
        <div className="pm-wrap">
          <span className="pm-tag pm-tag-gold">Últimos 5 anos</span>
          <h2 style={{ marginTop: 10 }}>Histórico dos concursos de Soldado PM</h2>
          <p className="pm-muted">Mesmo cargo, mesmas matérias: quem treina o padrão da banca sai na frente.</p>
          <div className="pm-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ano</th>
                  <th>Edital</th>
                  <th>Banca</th>
                  <th>Vagas</th>
                  <th>Prova</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pm-section" id="oferta" style={{ background: "var(--navy)" }}>
        <div className="pm-wrap">
          <div className="pm-price">
            <span className="pm-tag pm-tag-gold">Acesso completo até a prova</span>
            <h2 style={{ marginTop: 12 }}>Missão PMESP 2027</h2>
            <ul className="pm-check" style={{ margin: "14px 0 20px" }}>
              <li>{SIMULADOS.length} simulados com {BANCO.length} questões comentadas</li>
              <li>Resultado final com projeção da sua nota</li>
              <li>Edital completo, cronograma e o que estudar</li>
              <li>Plano de estudos semanal e guia de redação</li>
            </ul>
            <div className="valor">
              <small>R$</small> {preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="pm-muted pm-small" style={{ marginTop: 6 }}>
              Pagamento único · Pix, cartão ou boleto · acesso imediato no Pix
            </p>
            <CompraForm action={iniciarCompra} cta="Garantir meu acesso" />
          </div>
        </div>
      </section>

      <section className="pm-section">
        <div className="pm-narrow pm-faq">
          <h2 className="pm-center">Perguntas frequentes</h2>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="pm-footer">
        <div className="pm-wrap">
          Material de estudo independente, sem vínculo com a Polícia Militar do Estado de São Paulo ou com a Fundação Vunesp.
          Datas e regras conforme o edital {EDITAL_ATUAL.numero}; confira sempre as publicações oficiais em vunesp.com.br.
        </div>
      </footer>
    </>
  );
}
