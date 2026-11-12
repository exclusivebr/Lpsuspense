import Link from "next/link";
import Countdown from "@/components/Countdown";
import { CompraForm } from "@/components/Forms";
import SampleQuestion from "@/components/SampleQuestion";
import StickyCta from "@/components/StickyCta";
import { pedirCpf } from "@/lib/config";
import { CRONOGRAMA, DISCIPLINAS, EDITAL_ATUAL, HISTORICO, NOTA, ORDEM_DISCIPLINAS } from "@/lib/edital";
import { productPrice } from "@/lib/payments";
import { brl } from "@/lib/site";
import { BANCO, getQuestao, SIMULADOS } from "@/lib/simulados";
import { wivenConfigured } from "@/lib/wiven";
import { iniciarCompra } from "./actions";

export const dynamic = "force-dynamic";

const DIA = 86_400_000;

const ENTREGAVEIS = [
  { i: "📝", t: `${SIMULADOS.length} simulados no padrão Vunesp`, d: "3 simulados completos de 60 questões, igual à prova, 5 treinos por matéria e um simulado turbo que muda a cada tentativa." },
  { i: "💡", t: `${BANCO.length} questões comentadas`, d: "Errou? A explicação aparece na hora, com o raciocínio passo a passo. Você entende o erro e não repete na prova." },
  { i: "🎯", t: "Resultado final com sua nota", d: "Juntamos todos os seus simulados e projetamos sua nota de 0 a 60, comparando com a nota mínima e a faixa de corte." },
  { i: "🔎", t: "Raio-X dos últimos 5 anos", d: "O que mais caiu nas provas de 2022 a 2026, por matéria e assunto. Você estuda primeiro o que mais dá ponto." },
  { i: "📋", t: "Edital mastigado", d: "Datas, taxa, requisitos, etapas, TAF e conteúdo programático do edital DP-4/321/26, sem juridiquês." },
  { i: "🗓️", t: "Plano de estudos até a prova", d: "Cronograma semana a semana, de hoje até 28/02/2027, e guia de redação com estrutura, temas e checklist." },
];

const DORES = [
  { t: "Não sabe por onde começar", d: "O edital é longo e confuso. Aqui ele vem resumido, com o que mais cai em primeiro lugar." },
  { t: "Estuda, mas não sabe se está pronto", d: "O resultado final mostra sua nota projetada e quanto falta para passar do corte." },
  { t: "Erra e não entende por quê", d: "Cada questão tem comentário. Você aprende com o erro na hora, não no dia da prova." },
];

const PASSOS = [
  { n: "1", t: "Pague com Pix", d: "Leva menos de 1 minuto. O acesso é liberado assim que o pagamento cai." },
  { n: "2", t: "Faça o diagnóstico", d: "O Simulado Completo 01 mostra onde você está hoje em cada matéria." },
  { n: "3", t: "Treine até passar do corte", d: "Siga o plano, ataque os pontos fracos e acompanhe sua nota subir." },
];

const FAQ = [
  { q: "Como recebo o acesso?", a: "Assim que o Pix é pago, a própria página libera sua entrada, normalmente em poucos segundos. Depois, para voltar, é só digitar o seu WhatsApp em “Já sou aluno”." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia, como prevê o Código de Defesa do Consumidor. Pediu dentro do prazo, devolvemos o valor." },
  { q: "As questões são de provas anteriores?", a: "São questões inéditas, escritas no estilo da Vunesp a partir dos assuntos que mais caíram nas provas de Soldado PM de 2022 a 2026. Assim você treina o formato sem decorar respostas que já viu." },
  { q: "Por quanto tempo tenho acesso?", a: "Até a prova do concurso atual (28/02/2027), com as atualizações do edital incluídas." },
  { q: "Posso fazer pelo celular?", a: "Sim. Tudo funciona no celular, no tablet e no computador, e o simulado salva suas respostas se a página fechar." },
  { q: "Isso é oficial da PM ou da Vunesp?", a: "Não. É um material de estudo independente. A inscrição no concurso é feita só no site da Vunesp." },
];

function Check() {
  return <span className="pm-ck" aria-hidden>✓</span>;
}

export default function VendaPage() {
  const preco = productPrice();
  const precoTxt = brl(preco);
  const agora = Date.now();
  const diasProva = Math.max(0, Math.ceil((new Date(EDITAL_ATUAL.dataProva).getTime() - agora) / DIA));
  const diasInscricao = Math.ceil((new Date(EDITAL_ATUAL.inscricaoFim).getTime() - agora) / DIA);
  const amostra = getQuestao("m42")!;
  const maxQ = Math.max(...ORDEM_DISCIPLINAS.map((d) => DISCIPLINAS[d].questoes));
  const ultimo = HISTORICO.find((h) => h.inscritos && h.vagas !== "—");
  const pix = wivenConfigured();

  return (
    <>
      {diasInscricao > 0 && (
        <div className="pm-alertbar">
          🚨 Inscrições abertas até <strong>22/12</strong>: faltam <strong>{diasInscricao} dias</strong>. Prova em <strong>{diasProva} dias</strong>.
        </div>
      )}
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
          <nav className="pm-nav">
            <a href="#conteudo" className="pm-hide-sm">O que tem</a>
            <a href="#edital" className="pm-hide-sm">Edital</a>
            <Link href="/entrar">Já sou aluno</Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pm-hero">
        <div className="pm-wrap pm-hero-grid">
          <div className="pm-rise">
            <span className="pm-pill">
              <i /> Edital {EDITAL_ATUAL.numero} · 2.000 vagas · R$ 5.482,51
            </span>
            <h1>
              Treine do jeito que a Vunesp cobra e <em>vista a farda</em> da PMESP.
            </h1>
            <p className="lead">
              {BANCO.length} questões comentadas, simulados no formato da prova e um resultado que mostra se a sua nota já passa do
              corte. Tudo pelo celular, por menos que a taxa de inscrição.
            </p>
            <ul className="pm-hero-list">
              <li><Check /> Simulados de 60 questões, igual ao dia da prova</li>
              <li><Check /> O que mais caiu nos últimos 5 anos, por assunto</li>
              <li><Check /> Plano de estudos até 28/02/2027</li>
            </ul>
            <div className="pm-hero-cta">
              <a href="#oferta" className="pm-btn pm-btn-gold pm-btn-lg">
                Quero começar agora · {precoTxt}
              </a>
              <a href="#amostra" className="pm-btn pm-btn-light">
                Testar uma questão grátis
              </a>
            </div>
            <p className="pm-hero-trust">⚡ Acesso na hora no Pix &nbsp;·&nbsp; 🛡️ 7 dias de garantia &nbsp;·&nbsp; 📱 Celular e PC</p>
          </div>

          <div className="pm-mock-wrap pm-rise" style={{ animationDelay: ".15s" }} aria-hidden>
            <div className="pm-mock">
              <div className="pm-mock-top">
                <span className="pm-badge" style={{ width: 22, height: 22, fontSize: 10 }}>PM</span>
                <span>Resultado final</span>
              </div>
              <div className="pm-mock-score">
                <div className="pm-score" style={{ ["--p" as string]: 70, ["--c" as string]: "#16a34a", width: 120, height: 120 }}>
                  <div style={{ width: 94, height: 94 }}>
                    <div>
                      <strong style={{ fontSize: 28 }}>42</strong>
                      <span>nota projetada</span>
                    </div>
                  </div>
                </div>
                <span className="pm-tag pm-tag-ok">Acima do corte</span>
              </div>
              {ORDEM_DISCIPLINAS.map((d, i) => (
                <div key={d} className="pm-mock-row">
                  <span>{DISCIPLINAS[d].curto}</span>
                  <div className="pm-bar">
                    <i style={{ width: `${[78, 64, 70, 90, 80][i]}%`, background: DISCIPLINAS[d].cor }} />
                  </div>
                </div>
              ))}
              <div className="pm-mock-tip">Ponto fraco: <strong>Regra de três</strong> → treinar</div>
            </div>
            <div className="pm-float pm-float-a">✅ Questão 17 · Acertou!</div>
            <div className="pm-float pm-float-b">⏱ 3h12 de prova</div>
          </div>
        </div>
      </section>

      {/* ================= NÚMEROS ================= */}
      <section className="pm-stats">
        <div className="pm-wrap">
          <div><strong>{BANCO.length}</strong><span>questões comentadas</span></div>
          <div><strong>{SIMULADOS.length}</strong><span>simulados</span></div>
          <div><strong>5 anos</strong><span>de provas analisadas</span></div>
          <div><strong>{diasProva}</strong><span>dias até a prova</span></div>
        </div>
      </section>

      {/* ================= DOR ================= */}
      <section className="pm-section">
        <div className="pm-wrap">
          <p className="pm-kicker pm-center">A concorrência é grande</p>
          <h2 className="pm-center">
            {ultimo ? <>No último concurso foram {ultimo.inscritos?.replace("≈ ", "cerca de ")} inscritos para {ultimo.vagas} vagas.</> : "Milhares de candidatos disputam cada concurso."}
          </h2>
          <p className="pm-center pm-muted pm-sub">Quem passa não é quem estuda mais horas. É quem treina o que cai, do jeito que cai.</p>
          <div className="pm-grid pm-grid-3" style={{ marginTop: 28 }}>
            {DORES.map((x) => (
              <div className="pm-card pm-card-hover" key={x.t}>
                <h3>❌ {x.t}</h3>
                <p className="pm-muted" style={{ margin: 0 }}>✅ {x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= O QUE TEM ================= */}
      <section className="pm-section pm-section-white" id="conteudo">
        <div className="pm-wrap">
          <p className="pm-kicker pm-center">O que você recebe</p>
          <h2 className="pm-center">Tudo o que você precisa para a 1ª fase, num lugar só</h2>
          <div className="pm-grid pm-grid-3" style={{ marginTop: 28 }}>
            {ENTREGAVEIS.map((e) => (
              <div className="pm-card pm-card-hover pm-feature" key={e.t}>
                <span className="pm-ico">{e.i}</span>
                <h3>{e.t}</h3>
                <p className="pm-muted" style={{ margin: 0 }}>{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AMOSTRA ================= */}
      <section className="pm-section" id="amostra">
        <div className="pm-wrap pm-grid pm-grid-2" style={{ alignItems: "center", gap: 32 }}>
          <div>
            <p className="pm-kicker">Teste agora, de graça</p>
            <h2>Responda uma questão do material</h2>
            <p className="pm-muted pm-sub" style={{ margin: 0 }}>
              É assim que funciona por dentro: você marca, a correção aparece na hora e a explicação mostra o caminho. Sem
              enrolação, direto ao ponto, como a Vunesp gosta.
            </p>
          </div>
          <SampleQuestion
            assunto={amostra.assunto}
            enunciado={amostra.enunciado}
            alternativas={amostra.alternativas}
            correta={amostra.correta}
            explicacao={amostra.explicacao}
          />
        </div>
      </section>

      {/* ================= COMO FUNCIONA ================= */}
      <section className="pm-section pm-section-navy">
        <div className="pm-wrap">
          <p className="pm-kicker pm-center" style={{ color: "var(--gold-2)" }}>Como funciona</p>
          <h2 className="pm-center" style={{ color: "#fff" }}>Do Pix à aprovação em 3 passos</h2>
          <div className="pm-steps">
            {PASSOS.map((p) => (
              <div key={p.n} className="pm-step">
                <span className="pm-step-n">{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROVA / EDITAL ================= */}
      <section className="pm-section pm-section-white" id="edital">
        <div className="pm-wrap pm-grid pm-grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="pm-kicker">Como é a prova</p>
            <h2>60 questões + redação, em 5 horas</h2>
            <p>
              A objetiva vale de 0 a 60 pontos, e você precisa de no mínimo {NOTA.minimaObjetiva}. Na prática, a redação só é
              corrigida para quem fica entre os mais bem colocados: a faixa de corte estimada é de {NOTA.corteEstimado.min} a{" "}
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
            <p className="pm-kicker">Calendário</p>
            <h2>Datas do concurso</h2>
            <ol className="pm-timeline">
              {CRONOGRAMA.map((c) => (
                <li key={c.evento} className={c.evento.includes("Prova objetiva") ? "hl" : ""}>
                  <strong>{c.data}</strong>
                  <span>{c.evento}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= HISTÓRICO ================= */}
      <section className="pm-section">
        <div className="pm-wrap">
          <p className="pm-kicker">Últimos 5 anos</p>
          <h2>Mesmo cargo, mesmas matérias, todo ano</h2>
          <p className="pm-muted pm-sub">A PMESP abre concurso de Soldado com frequência. Quem treina o padrão da banca sai na frente.</p>
          <div className="pm-table-wrap">
            <table>
              <thead>
                <tr><th>Ano</th><th>Edital</th><th>Banca</th><th>Vagas</th><th>Prova</th></tr>
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

      {/* ================= OFERTA ================= */}
      <section className="pm-section pm-offer" id="oferta">
        <div className="pm-wrap">
          <h2 className="pm-center" style={{ color: "#fff" }}>Comece hoje. Sua vaga é disputada todo dia.</h2>
          <p className="pm-center pm-sub" style={{ color: "#cbd5e1" }}>Menos da metade da taxa de inscrição do concurso ({EDITAL_ATUAL.taxa}).</p>
          <div className="pm-price">
            <span className="pm-ribbon">Acesso completo até a prova</span>
            <h3 style={{ fontSize: 22, marginTop: 6 }}>Missão PMESP 2027</h3>
            <ul className="pm-check" style={{ margin: "14px 0 18px" }}>
              <li>{SIMULADOS.length} simulados e {BANCO.length} questões comentadas</li>
              <li>Resultado final com a projeção da sua nota</li>
              <li>Edital completo, cronograma e raio-X de 5 anos</li>
              <li>Plano de estudos semanal e guia de redação</li>
              <li>Acesso pelo celular e computador</li>
            </ul>
            <div className="pm-price-row">
              <div className="valor">
                <small>R$</small> {preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="pm-price-note">
                pagamento único
                <br />
                <strong>{pix ? "via Pix" : "Pix, cartão ou boleto"}</strong>
              </div>
            </div>
            <CompraForm action={iniciarCompra} cta={pix ? "Pagar com Pix e começar" : "Garantir meu acesso"} pix={pix} pedirCpf={pedirCpf()} />
            <div className="pm-guarantee">
              <span>🛡️</span>
              <div>
                <strong>Garantia de 7 dias.</strong> Se não for para você, é só pedir dentro de 7 dias que devolvemos o valor.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="pm-section">
        <div className="pm-narrow pm-faq">
          <p className="pm-kicker pm-center">Dúvidas</p>
          <h2 className="pm-center">Perguntas frequentes</h2>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="pm-final">
        <div className="pm-narrow pm-center">
          <h2 style={{ color: "#fff" }}>A prova não espera. Faltam:</h2>
          <div style={{ maxWidth: 420, margin: "16px auto 24px" }}>
            <Countdown target={EDITAL_ATUAL.dataProva} />
          </div>
          <a href="#oferta" className="pm-btn pm-btn-gold pm-btn-lg">Quero meu acesso por {precoTxt}</a>
        </div>
      </section>

      <footer className="pm-footer">
        <div className="pm-wrap">
          Material de estudo independente, sem vínculo com a Polícia Militar do Estado de São Paulo ou com a Fundação Vunesp.
          Datas e regras conforme o edital {EDITAL_ATUAL.numero}; confira sempre as publicações oficiais em vunesp.com.br.
        </div>
      </footer>

      <StickyCta preco={precoTxt} />
    </>
  );
}
