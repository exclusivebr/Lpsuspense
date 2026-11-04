import Image from "next/image";
import Countdown from "@/components/Countdown";
import LeadForm from "@/components/LeadForm";
import RecClock from "@/components/RecClock";
import portrait from "@/public/agente.jpg";

const LAUNCH = process.env.NEXT_PUBLIC_LAUNCH_DATE;

const LOG = [
  "campanha_07 · CTR 4,8% · escalando",
  "CPA R$ 9,40 ↓ 38%",
  "ROAS 7,2x",
  "conjunto_03 · público frio · validado",
  "CPM R$ 13,90",
  "orçamento +300% · estável",
  "criativo_12 · vencedor",
  "leads hoje: 1.284",
];

export default function Home() {
  return (
    <main className="page">
      <div className="bg-noise" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <header className="topbar mono">
        <span className="live">
          <i /> Gravando
        </span>
        <span className="dim">Arquivo confidencial · Nº 001</span>
      </header>

      <div className="layout">
        <figure className="portrait">
          <Image
            src={portrait}
            alt=""
            priority
            placeholder="blur"
            sizes="(min-width: 960px) 45vw, 100vw"
          />
          <div className="vf" aria-hidden="true">
            <span className="vf-c tl" />
            <span className="vf-c tr" />
            <span className="vf-c bl" />
            <span className="vf-c br" />
            <span className="vf-rec mono">
              <i /> REC <RecClock />
            </span>
            <span className="vf-meta mono">CAM 01 · ISO 3200</span>
          </div>
        </figure>

        <div className="content">
          <section className="hero">
            <p className="eyebrow mono">Acesso restrito</p>
            <h1 className="title">
              Tô vendo tudo.
              <span>Só não posso falar.</span>
            </h1>
            <p className="lead">
              Cada clique. Cada real investido. Cada anúncio que escala enquanto outros queimam dinheiro.
              <br />
              Eu sei exatamente o que está acontecendo. <em>Ainda não posso contar.</em>
            </p>

            <a href="#lista" className="jump">
              Quero saber primeiro ↓
            </a>
          </section>

          <div className="ticker mono" aria-hidden="true">
            <div className="ticker-track">
              {[...LOG, ...LOG].map((l, i) => (
                <span key={i}>
                  <b>›</b> {l}
                </span>
              ))}
            </div>
          </div>

          <ul className="clues">
            <li>
              <strong>Não é sorte. É leitura.</strong>
              <span>O algoritmo deixa pistas o tempo todo. Quase ninguém sabe ler.</span>
            </li>
            <li>
              <strong>Não vai ser para todo mundo.</strong>
              <span>O acesso vai ser por lista. E a lista fecha.</span>
            </li>
            <li>
              <strong>Quem estiver aqui, sabe primeiro.</strong>
              <span>Quando eu puder falar, você recebe antes no WhatsApp.</span>
            </li>
          </ul>

          {LAUNCH && <Countdown target={LAUNCH} />}

          <section className="card" id="lista">
            <div className="card-head">
              <span className="label mono">Lista confidencial</span>
              <h2>Quer saber primeiro?</h2>
              <p>Deixe seus dados. Quando eu puder falar, você vai ser o primeiro a ouvir.</p>
            </div>
            <LeadForm />
          </section>
        </div>
      </div>

      <footer className="footer mono dim">
        <span>Se você chegou aqui, alguém te contou.</span>
        <span>Não compartilhe. (Ou compartilhe.)</span>
      </footer>
    </main>
  );
}
