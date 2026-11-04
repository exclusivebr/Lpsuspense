import Image from "next/image";
import Countdown from "@/components/Countdown";
import LeadForm from "@/components/LeadForm";
import RecClock from "@/components/RecClock";
import Rotator from "@/components/Rotator";
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
];

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="row">
      <dt>{k}:</dt>
      <dd>{children}</dd>
    </div>
  );
}

const Bar = ({ w }: { w: string }) => <span className="bar" style={{ width: w }} aria-label="confidencial" />;

export default function Home() {
  return (
    <main className="page">
      <div className="bg-noise" aria-hidden="true" />

      <section className="file mono">
        <p className="file-id">ARQUIVO 00X</p>
        <dl className="rows">
          <Row k="STATUS"><b>em teste</b></Row>
          <Row k="PROJETO"><Bar w="11em" /></Row>
          <Row k="ACESSO"><b>restrito</b></Row>
          <Row k="VAGAS"><b>limitadas</b></Row>
          <Row k="LIBERAÇÃO"><Bar w="3.4em" /></Row>
        </dl>
      </section>

      <section className="hero">
        <Rotator />
        <p className="conf mono"><i /> CONFIDENCIAL</p>

        <p className="lead">
          Cada clique. Cada real investido. Cada anúncio que escala enquanto outros queimam dinheiro.
          Eu sei exatamente o que está acontecendo. <em>Ainda não posso contar.</em>
        </p>

        <a href="#lista" className="jump">Garantir minha vaga ↓</a>
      </section>

      <div className="ticker mono" aria-hidden="true">
        <div className="ticker-track">
          {[...LOG, ...LOG].map((l, i) => (
            <span key={i}><b>›</b> {l}</span>
          ))}
        </div>
      </div>

      <figure className="anexo">
        <figcaption className="mono">ANEXO 01 · REGISTRO</figcaption>
        <div className="portrait">
          <Image src={portrait} alt="" priority placeholder="blur" sizes="(min-width: 720px) 640px, 100vw" />
          <div className="vf" aria-hidden="true">
            <span className="vf-c tl" /><span className="vf-c tr" /><span className="vf-c bl" /><span className="vf-c br" />
            <span className="vf-rec mono"><i /> REC <RecClock /></span>
            <span className="vf-meta mono">CAM 01</span>
          </div>
        </div>
      </figure>

      <ul className="clues">
        <li>
          <span className="mono">01</span>
          <div><strong>Não é sorte. É leitura.</strong><p>O algoritmo deixa pistas o tempo todo. Quase ninguém sabe ler.</p></div>
        </li>
        <li>
          <span className="mono">02</span>
          <div><strong>Vagas limitadas.</strong><p>O acesso vai ser por lista. Quando fechar, fechou.</p></div>
        </li>
        <li>
          <span className="mono">03</span>
          <div><strong>Quem estiver aqui, sabe primeiro.</strong><p>Quando eu puder falar, você recebe antes no WhatsApp.</p></div>
        </li>
      </ul>

      {LAUNCH && <Countdown target={LAUNCH} />}

      <section className="card" id="lista">
        <div className="card-head">
          <p className="conf mono"><i /> VAGAS LIMITADAS</p>
          <h2>Quer saber primeiro?</h2>
          <p>Deixe seus dados. Quando eu puder falar, você vai ser o primeiro a ouvir.</p>
        </div>
        <LeadForm />
      </section>

      <footer className="footer mono">
        <span>Se você chegou aqui, alguém te contou.</span>
        <span>Não compartilhe. (Ou compartilhe.)</span>
      </footer>
    </main>
  );
}
