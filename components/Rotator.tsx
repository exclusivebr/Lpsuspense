"use client";

import { useEffect, useState } from "react";

// Frases no estilo dos stories. A primeira é a que aparece no carregamento.
export const PHRASES = [
  "Não é sobre acelerar.",
  "Tô vendo tudo. Só não posso falar.",
  "Não é sorte. É leitura.",
  "Não vai ser para todo mundo.",
  "Cada clique deixa uma pista.",
];

export default function Rotator() {
  const [i, setI] = useState(0);
  const [text, setText] = useState(PHRASES[0]);
  const [phase, setPhase] = useState<"hold" | "erase" | "type">("hold");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = PHRASES[i];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      t = setTimeout(() => setPhase("erase"), 3600);
    } else if (phase === "erase") {
      if (reduce || text.length === 0) {
        const next = (i + 1) % PHRASES.length;
        setI(next);
        if (reduce) {
          setText(PHRASES[next]);
          setPhase("hold");
        } else setPhase("type");
        return;
      }
      t = setTimeout(() => setText(text.slice(0, -1)), 22);
    } else {
      if (text === target) {
        setPhase("hold");
        return;
      }
      t = setTimeout(() => setText(target.slice(0, text.length + 1)), 55 + Math.random() * 45);
    }
    return () => clearTimeout(t);
  }, [i, text, phase]);

  return (
    <h1 className="title" aria-label={PHRASES[i]}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </h1>
  );
}
