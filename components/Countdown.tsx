"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const p = parts(now === null ? 0 : new Date(target).getTime() - now);
  const cells: [number, string][] = [
    [p.d, "dias"],
    [p.h, "horas"],
    [p.m, "min"],
    [p.s, "seg"],
  ];
  return (
    <div className="pm-countdown" aria-label="Contagem regressiva">
      {cells.map(([v, l]) => (
        <div key={l}>
          <strong suppressHydrationWarning>{now === null ? "--" : String(v).padStart(2, "0")}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}
