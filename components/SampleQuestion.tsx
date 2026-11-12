"use client";

import { useState } from "react";

const L = ["A", "B", "C", "D", "E"];

type Props = { assunto: string; enunciado: string; alternativas: string[]; correta: number; explicacao: string };

export default function SampleQuestion({ assunto, enunciado, alternativas, correta, explicacao }: Props) {
  const [resp, setResp] = useState<number | null>(null);
  const done = resp !== null;
  return (
    <div className="pm-sample">
      <div className="pm-q-head">
        <span className="pm-q-num">Questão de amostra</span>
        <span className="pm-tag">Matemática · {assunto}</span>
      </div>
      <p className="pm-q-enun">{enunciado}</p>
      <div className="pm-alts">
        {alternativas.map((a, k) => (
          <button
            key={k}
            type="button"
            disabled={done}
            onClick={() => setResp(k)}
            className={`pm-alt ${done && k === correta ? "ok" : ""} ${done && k === resp && k !== correta ? "bad" : ""}`}
          >
            <span className="l">{L[k]}</span>
            <span>{a}</span>
          </button>
        ))}
      </div>
      {done ? (
        <div className="pm-expl pm-pop">
          <strong>{resp === correta ? "✅ Acertou!" : `❌ Quase. Gabarito: ${L[correta]}.`}</strong> {explicacao}
          <div style={{ marginTop: 10 }}>
            É assim em todas as {""}
            <strong>180 questões</strong>: correção na hora, com a explicação. <a href="#oferta">Quero treinar assim →</a>
          </div>
        </div>
      ) : (
        <p className="pm-muted pm-small" style={{ margin: "12px 0 0" }}>👆 Toque em uma alternativa para ver a correção comentada.</p>
      )}
    </div>
  );
}
