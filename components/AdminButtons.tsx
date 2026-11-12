"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

/** Botão de envio que pede confirmação antes (ex.: excluir). */
export function ConfirmButton({ children, msg, className = "pm-btn pm-btn-ghost pm-btn-sm" }: { children: React.ReactNode; msg: string; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (!confirm(msg)) e.preventDefault();
      }}
    >
      {pending ? "…" : children}
    </button>
  );
}

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="pm-btn pm-btn-ghost pm-btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {}
        setOk(true);
        setTimeout(() => setOk(false), 2000);
      }}
    >
      {ok ? "✓ Copiado" : label}
    </button>
  );
}
