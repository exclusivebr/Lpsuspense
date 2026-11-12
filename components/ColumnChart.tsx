"use client";

import { useEffect, useRef, useState } from "react";

type Serie = { nome: string; cor: string };
type Ponto = { rotulo: string; detalhe: string; valores: number[] };

const fmtBRL = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtInt = (n: number) => n.toLocaleString("pt-BR");

/** “Teto” bonito para o eixo Y (1, 2, 2.5, 5, 10 × potência de 10). */
function teto(max: number) {
  if (max <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(max));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= max) return m * p;
  return 10 * p;
}

/**
 * Colunas (uma série) ou colunas empilhadas (várias séries) em SVG.
 * Marcas finas (até 24px), ponta arredondada de 4px, base reta, 2px de espaço entre segmentos,
 * grade discreta e tooltip por coluna (mouse, toque e teclado).
 */
export default function ColumnChart({ series, pontos, formato = "int", altura = 220, titulo }: { series: Serie[]; pontos: Ponto[]; formato?: "brl" | "int"; altura?: number; titulo: string }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const [W, setW] = useState(720);
  const box = useRef<HTMLDivElement>(null);
  // O SVG usa a largura real da tela: o texto dos eixos fica sempre em 12px, mesmo no celular.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const fmt = formato === "brl" ? fmtBRL : fmtInt;
  const H = altura;
  const M = { t: 12, r: 8, b: 26, l: formato === "brl" ? 64 : 34 };
  const iw = W - M.l - M.r;
  const ih = H - M.t - M.b;
  const totais = pontos.map((p) => p.valores.reduce((s, v) => s + v, 0));
  const yMax = teto(Math.max(0, ...totais));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);
  const banda = iw / Math.max(1, pontos.length);
  const larg = Math.max(2, Math.min(24, banda * 0.62));
  const y = (v: number) => M.t + ih - (v / yMax) * ih;
  const passoRotulo = Math.max(1, Math.ceil(pontos.length / Math.max(2, Math.floor(iw / 52))));
  const vazio = totais.every((t) => t === 0);

  return (
    <div className="pm-chart" ref={box}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo} onPointerLeave={() => setAtivo(null)}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={M.l} x2={W - M.r} y1={y(t)} y2={y(t)} className={i === 0 ? "base" : "grid"} />
            <text x={M.l - 8} y={y(t) + 4} textAnchor="end" className="tick">
              {formato === "brl" ? (t >= 1000 ? `R$ ${(t / 1000).toLocaleString("pt-BR")} mil` : `R$ ${fmtInt(t)}`) : fmtInt(t)}
            </text>
          </g>
        ))}
        {pontos.map((p, i) => {
          const cx = M.l + banda * i + banda / 2;
          const x = cx - larg / 2;
          let topo = M.t + ih;
          const segs = p.valores.map((v, s) => ({ v, s })).filter((d) => d.v > 0);
          return (
            <g key={i} className={ativo === i ? "on" : ativo !== null ? "off" : ""}>
              {segs.map(({ v, s }, k) => {
                const h = (v / yMax) * ih;
                const y1 = topo - h;
                const ultimo = k === segs.length - 1;
                const gap = k > 0 ? 2 : 0; // espaço de 2px entre segmentos empilhados
                const hh = Math.max(0, h - gap);
                const yTop = y1;
                topo = y1;
                const r = ultimo ? Math.min(4, hh, larg / 2) : 0;
                const d = `M${x},${yTop + hh} V${yTop + r} Q${x},${yTop} ${x + r},${yTop} H${x + larg - r} Q${x + larg},${yTop} ${x + larg},${yTop + r} V${yTop + hh} Z`;
                return <path key={s} d={d} fill={series[s].cor} />;
              })}
              {i % passoRotulo === 0 && (
                <text x={cx} y={H - 8} textAnchor="middle" className="tick">
                  {p.rotulo}
                </text>
              )}
              <rect
                x={M.l + banda * i}
                y={M.t}
                width={banda}
                height={ih}
                fill="transparent"
                tabIndex={0}
                aria-label={`${p.detalhe}: ${series.map((s, k) => `${s.nome} ${fmt(p.valores[k])}`).join(", ")}`}
                onPointerEnter={() => setAtivo(i)}
                onPointerDown={() => setAtivo(i)}
                onFocus={() => setAtivo(i)}
                onBlur={() => setAtivo(null)}
              />
            </g>
          );
        })}
        {vazio && (
          <text x={M.l + iw / 2} y={M.t + ih / 2} textAnchor="middle" className="empty">
            Sem vendas neste período
          </text>
        )}
      </svg>
      {ativo !== null && (
        <div className="pm-tip" style={{ left: `${((M.l + banda * ativo + banda / 2) / W) * 100}%` }}>
          <div className="pm-tip-t">{pontos[ativo].detalhe}</div>
          {series.length > 1 && (
            <div className="pm-tip-row">
              <strong>{fmt(totais[ativo])}</strong> <span>total</span>
            </div>
          )}
          {series.map((s, k) => (
            <div key={s.nome} className="pm-tip-row">
              <i style={{ background: s.cor }} />
              <strong>{fmt(pontos[ativo].valores[k])}</strong> <span>{s.nome}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
