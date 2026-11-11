"use client";

import { useEffect, useState } from "react";

const KEY = "pmesp:redacao";

export default function RedacaoEditor({ temas }: { temas: string[] }) {
  const [tema, setTema] = useState(temas[0]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { tema: string; texto: string } | null;
      if (saved) {
        setTema(saved.tema);
        setTexto(saved.texto);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ tema, texto }));
    } catch {}
  }, [tema, texto]);

  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  // Folha de redação: ~10 palavras por linha manuscrita.
  const linhas = Math.ceil(palavras / 10);
  const paragrafos = texto.split(/\n\s*\n|\n/).filter((p) => p.trim()).length;
  const status = linhas < 20 ? "pm-tag-warn" : linhas > 30 ? "pm-tag-bad" : "pm-tag-ok";

  return (
    <div className="pm-card">
      <div className="pm-field">
        <label htmlFor="tema">Tema</label>
        <select id="tema" value={tema} onChange={(e) => setTema(e.target.value)}>
          {temas.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <textarea
        aria-label="Sua redação"
        rows={16}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva aqui. Introdução com a tese → 2 parágrafos de argumento → conclusão."
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        <span className="pm-tag">{palavras} palavras</span>
        <span className={`pm-tag ${status}`}>≈ {linhas} linhas (ideal: 20 a 30)</span>
        <span className={`pm-tag ${paragrafos === 4 ? "pm-tag-ok" : ""}`}>{paragrafos} parágrafo(s) (ideal: 4)</span>
      </div>
      <p className="pm-muted pm-small" style={{ marginTop: 10, marginBottom: 0 }}>
        O texto fica salvo só neste aparelho. Depois de escrever, revise com o checklist ao lado.
      </p>
    </div>
  );
}
