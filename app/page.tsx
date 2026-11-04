import Countdown from "@/components/Countdown";
import LeadForm from "@/components/LeadForm";

const LAUNCH = process.env.NEXT_PUBLIC_LAUNCH_DATE;

function Redacted({ children, w }: { children?: React.ReactNode; w?: string }) {
  return (
    <span className="redacted" style={w ? { width: w } : undefined} title="Confidencial">
      {children ?? " "}
    </span>
  );
}

export default function Home() {
  return (
    <main className="page">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <header className="topbar">
        <span className="live">
          <i /> Transmissão restrita
        </span>
        <span className="mono dim">ARQ. Nº 001 / CLASSIFICADO</span>
      </header>

      <section className="hero">
        <p className="eyebrow mono">Algo está sendo preparado.</p>

        <h1 className="title" data-text="MARCHA NO TRÁFEGO">
          MARCHA NO <span className="accent">TRÁFEGO</span>
        </h1>

        <p className="lead">
          Uma mentoria <Redacted w="5.5em" /> de tráfego pago.
          <br />
          Ainda não podemos contar <Redacted w="3em" />. Mas podemos dizer isto:
        </p>

        <a href="#lista" className="jump">Entrar na lista secreta ↓</a>

        <ul className="clues">
          <li>
            <span className="mono clue-n">01</span>
            <div>
              <strong>Não é mais um curso.</strong>
              <span>É o método completo, do zero à escala. <Redacted w="4em" /></span>
            </div>
          </li>
          <li>
            <span className="mono clue-n">02</span>
            <div>
              <strong>Acesso por lista.</strong>
              <span>
                Vagas limitadas a <Redacted w="2em" /> pessoas na primeira turma.
              </span>
            </div>
          </li>
          <li>
            <span className="mono clue-n">03</span>
            <div>
              <strong>Quem está na lista sabe primeiro.</strong>
              <span>Data, valor e condição especial chegam antes no seu WhatsApp.</span>
            </div>
          </li>
        </ul>

        {LAUNCH && <Countdown target={LAUNCH} />}
      </section>

      <section className="card" id="lista">
        <div className="card-head">
          <span className="stamp mono">Top secret</span>
          <h2>Entre na lista secreta</h2>
          <p>Deixe seus dados e receba a revelação em primeira mão.</p>
        </div>
        <LeadForm />
      </section>

      <footer className="footer mono dim">
        <span>© {new Date().getFullYear()} Marcha no Tráfego</span>
        <span>Este arquivo se autodestrói na abertura.</span>
      </footer>
    </main>
  );
}
