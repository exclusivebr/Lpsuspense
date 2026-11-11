"use client";

import { useEffect } from "react";

/** Garante que a página abra no topo (após entregar o simulado, a rolagem anterior era mantida). */
export default function ScrollTop() {
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
