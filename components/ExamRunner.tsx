"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { QuestaoPublica, Texto } from "@/lib/simulados";

const L = ["A", "B", "C", "D", "E"];

type Props = {
  simuladoId: string;
  minutos: number;
  questoes: QuestaoPublica[];
  textos: Record<string, Texto>;
  nomesDisciplinas: Record<string, string>;
  enviar: (form: FormData) => Promise<void>;
};

function fmt(sec: number) {
  const s = Math.max(0, sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h > 0 ? `${h}:` : ""}${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function ExamRunner({ simuladoId, minutos, questoes, textos, nomesDisciplinas, enviar }: Props) {
  const ids = useMemo(() => questoes.map((q) => q.id), [questoes]);
  const storageKey = `pmesp:sim:${simuladoId}:${ids.join(",")}`;
  const [respostas, setRespostas] = useState<(number | null)[]>(() => ids.map(() => null));
  const [inicio, setInicio] = useState<number>(() => Date.now());
  const [agora, setAgora] = useState<number>(() => Date.now());
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState("");
  const enviado = useRef(false);

  // Recupera a prova em andamento se a página for recarregada.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as { r: (number | null)[]; i: number } | null;
      if (saved && saved.r.length === ids.length) {
        setRespostas(saved.r);
        setInicio(saved.i);
      }
    } catch {}
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [storageKey, ids.length]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ r: respostas, i: inicio }));
    } catch {}
  }, [respostas, inicio, storageKey]);

  const decorrido = Math.floor((agora - inicio) / 1000);
  const restante = minutos * 60 - decorrido;
  const respondidas = respostas.filter((r) => r !== null).length;

  function finalizar(auto = false) {
    if (enviado.current) return;
    const faltam = ids.length - respondidas;
    if (!auto && faltam > 0 && !confirm(`Você deixou ${faltam} questão(ões) em branco. Entregar mesmo assim?`)) return;
    enviado.current = true;
    const fd = new FormData();
    fd.set("simuladoId", simuladoId);
    fd.set("questoes", JSON.stringify(ids));
    fd.set("respostas", JSON.stringify(respostas));
    fd.set("duracao", String(Math.min(decorrido, minutos * 60)));
    startTransition(async () => {
      try {
        try {
          localStorage.removeItem(storageKey);
        } catch {}
        await enviar(fd);
        window.scrollTo(0, 0);
      } catch {
        enviado.current = false;
        try {
          localStorage.setItem(storageKey, JSON.stringify({ r: respostas, i: inicio }));
        } catch {}
        setErro("Não foi possível enviar. Verifique a conexão e tente de novo.");
      }
    });
  }

  useEffect(() => {
    if (restante <= 0 && !enviado.current) finalizar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restante <= 0]);

  function marcar(qi: number, alt: number) {
    setRespostas((r) => r.map((v, i) => (i === qi ? (v === alt ? null : alt) : v)));
  }

  let ultimoTexto: string | undefined;
  let ultimaDisc: string | undefined;

  return (
    <>
      <div className="pm-exam-bar">
        <div className="pm-wrap">
          <span className={`pm-timer ${restante < 600 ? "low" : ""}`} suppressHydrationWarning>
            ⏱ {fmt(restante)}
          </span>
          <span className="pm-muted pm-small">
            {respondidas}/{ids.length} respondidas
          </span>
          <button className="pm-btn pm-btn-gold" style={{ marginLeft: "auto", padding: "10px 18px" }} onClick={() => finalizar()} disabled={pending}>
            {pending ? "Corrigindo…" : "Entregar simulado"}
          </button>
        </div>
      </div>

      <div className="pm-wrap" style={{ paddingTop: 20 }}>
        <details className="pm-card pm-small" style={{ marginBottom: 16 }}>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>Mapa de questões</summary>
          <div className="pm-map" style={{ marginTop: 12 }}>
            {ids.map((id, i) => (
              <a key={id} href={`#q${i + 1}`} className={respostas[i] !== null ? "done" : ""}>
                {i + 1}
              </a>
            ))}
          </div>
        </details>

        {erro && <p className="pm-error">{erro}</p>}

        {questoes.map((q, i) => {
          const showTexto = q.texto && q.texto !== ultimoTexto;
          const showDisc = q.disciplina !== ultimaDisc;
          ultimoTexto = q.texto;
          ultimaDisc = q.disciplina;
          const t = q.texto ? textos[q.texto] : undefined;
          return (
            <div key={q.id}>
              {showDisc && <h2 style={{ marginTop: i ? 32 : 0 }}>{nomesDisciplinas[q.disciplina]}</h2>}
              {showTexto && t && (
                <div className="pm-texto">
                  <span className="pm-tag pm-tag-gold">Leia o texto para responder às próximas questões</span>
                  <h3 style={{ marginTop: 10 }}>{t.titulo}</h3>
                  <p className="pm-muted pm-small" style={{ textIndent: 0 }}>
                    {t.fonte}
                  </p>
                  {t.paragrafos.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              )}
              <div className="pm-q" id={`q${i + 1}`}>
                <div className="pm-q-head">
                  <span className="pm-q-num">Questão {i + 1}</span>
                  <span className="pm-tag">{q.assunto}</span>
                </div>
                <div className="pm-q-enun">{q.enunciado}</div>
                <div className="pm-alts">
                  {q.alternativas.map((alt, k) => (
                    <button key={k} type="button" className="pm-alt" aria-pressed={respostas[i] === k} onClick={() => marcar(i, k)}>
                      <span className="l">{L[k]}</span>
                      <span>{alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <button className="pm-btn pm-btn-gold pm-btn-block" onClick={() => finalizar()} disabled={pending} style={{ marginTop: 8 }}>
          {pending ? "Corrigindo…" : `Entregar simulado (${respondidas}/${ids.length})`}
        </button>
      </div>
    </>
  );
}
