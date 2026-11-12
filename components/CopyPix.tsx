"use client";

import { useState } from "react";

export default function CopyPix({ code }: { code: string }) {
  const [ok, setOk] = useState(false);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const t = document.getElementById("pix-code") as HTMLTextAreaElement | null;
      t?.select();
      document.execCommand("copy");
    }
    setOk(true);
    setTimeout(() => setOk(false), 2500);
  }
  return (
    <>
      <textarea id="pix-code" readOnly value={code} rows={3} style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", wordBreak: "break-all" }} onFocus={(e) => e.currentTarget.select()} />
      <button type="button" className="pm-btn pm-btn-gold pm-btn-block" style={{ marginTop: 10 }} onClick={copiar}>
        {ok ? "✓ Código copiado!" : "Copiar código Pix"}
      </button>
    </>
  );
}
