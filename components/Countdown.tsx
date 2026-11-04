"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
  };
}

export default function Countdown({ target }: { target: string }) {
  const end = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (Number.isNaN(end)) return null;
  const p = parts(now === null ? 0 : end - now);
  const done = now !== null && end - now <= 0;

  return (
    <div className="countdown" aria-live="polite">
      <span className="countdown-label">{done ? "Agora eu posso falar" : "Eu falo em"}</span>
      <div className="countdown-grid">
        {(Object.entries(p) as [string, number][]).map(([k, v]) => (
          <div key={k} className="countdown-cell">
            <span className="countdown-num">{now === null ? "--" : String(v).padStart(2, "0")}</span>
            <span className="countdown-unit">{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
