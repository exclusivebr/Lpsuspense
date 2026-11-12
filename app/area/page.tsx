import Link from "next/link";
import Countdown from "@/components/Countdown";
import { requireStudent } from "@/lib/accounts";
import { EDITAL_ATUAL, NOTA } from "@/lib/edital";
import { consolidar, listarTentativas } from "@/lib/resultados";
import { dataBR } from "@/lib/site";
import { SIMULADOS } from "@/lib/simulados";

export const dynamic = "force-dynamic";

const ATALHOS = [
  { href: "/area/simulados", t: "Simulados", d: "Completos, por matéria e turbo." },
  { href: "/area/desempenho", t: "Resultado final", d: "Sua nota projetada e seus pontos fracos." },
  { href: "/area/edital", t: "Edital completo", d: "Datas, requisitos, etapas e TAF." },
  { href: "/area/estudar", t: "O que estudar", d: "Raio-X dos últimos 5 anos por assunto." },
  { href: "/area/plano", t: "Plano de estudos", d: "Semana a semana até a prova." },
  { href: "/area/redacao", t: "Redação", d: "Estrutura, temas e treino com contador." },
];

export default async function Painel() {
  const aluno = await requireStudent();
  const tentativas = await listarTentativas(aluno.id);
  const c = consolidar(tentativas);
  const feitos = new Set(tentativas.map((t) => t.simuladoId)).size;
  const media = tentativas.length ? Math.round((tentativas.reduce((s, t) => s + t.acertos / t.total, 0) / tentativas.length) * 100) : 0;
  const proximo = SIMULADOS.find((s) => !tentativas.some((t) => t.simuladoId === s.id)) ?? SIMULADOS[0];

  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <p className="pm-muted" style={{ marginBottom: 4 }}>
          Olá, {aluno.nome.split(" ")[0]} 👮
        </p>
        <h1>Seu quartel-general</h1>

        <div className="pm-grid pm-grid-2" style={{ marginTop: 16 }}>
          <div className="pm-card" style={{ background: "var(--navy)", color: "#cbd5e1", borderColor: "var(--navy)" }}>
            <span className="pm-tag pm-tag-gold">Prova objetiva + redação</span>
            <h3 style={{ color: "#fff", marginTop: 10 }}>{dataBR(EDITAL_ATUAL.dataProva)} · {EDITAL_ATUAL.provaTurno.split(" (")[0]}</h3>
            <Countdown target={EDITAL_ATUAL.dataProva} />
            <p className="pm-small" style={{ marginTop: 12, marginBottom: 0 }}>
              Inscrições até {dataBR(EDITAL_ATUAL.inscricaoFim)} em {EDITAL_ATUAL.ondeInscrever}. Já se inscreveu?
            </p>
          </div>
          <div className="pm-card">
            <h3>Próximo passo</h3>
            <p className="pm-muted">
              {tentativas.length === 0
                ? "Comece pelo Simulado Completo 01: ele mostra onde você está hoje e libera a projeção da sua nota."
                : c.fracos[0]
                  ? `Seu ponto mais fraco agora é “${c.fracos[0].assunto}” (${c.fracos[0].pct}% de acerto). Revise esse assunto e faça o próximo simulado.`
                  : "Continue fazendo os simulados para alimentar seu resultado final."}
            </p>
            <Link href={`/area/simulados/${proximo.id}`} className="pm-btn pm-btn-gold">
              Fazer: {proximo.titulo}
            </Link>
          </div>
        </div>

        <div className="pm-grid pm-grid-4" style={{ marginTop: 16 }}>
          <div className="pm-card pm-stat">
            <span>Simulados feitos</span>
            <strong>
              {feitos}/{SIMULADOS.length}
            </strong>
          </div>
          <div className="pm-card pm-stat">
            <span>Questões resolvidas</span>
            <strong>{c.questoes}</strong>
          </div>
          <div className="pm-card pm-stat">
            <span>Aproveitamento médio</span>
            <strong>{media}%</strong>
          </div>
          <div className="pm-card pm-stat">
            <span>Nota projetada</span>
            <strong>{c.status.nivel === "incompleto" ? "—" : `${c.projecao}/60`}</strong>
            <small className="pm-muted">corte estimado {NOTA.corteEstimado.min}–{NOTA.corteEstimado.max}</small>
          </div>
        </div>

        <h2 style={{ marginTop: 36 }}>Atalhos</h2>
        <div className="pm-grid pm-grid-3">
          {ATALHOS.map((a) => (
            <Link key={a.href} href={a.href} className="pm-card" style={{ textDecoration: "none" }}>
              <h3>{a.t} →</h3>
              <p className="pm-muted" style={{ margin: 0 }}>
                {a.d}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
