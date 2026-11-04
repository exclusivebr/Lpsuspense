"use client";

import { useEffect, useState } from "react";

export default function RecClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("pt-BR", { hour12: false, timeZone: "America/Sao_Paulo" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}
