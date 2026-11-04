"use client";

import { useState } from "react";
import { formatPhone, validateLead } from "@/lib/validate";

const WHATS = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
const MSG =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
  "Oi! Sou {nome}. Vi o arquivo confidencial e quero saber primeiro 🔒";

function whatsappUrl(nome: string) {
  const first = nome.split(" ")[0] || "";
  const text = encodeURIComponent(MSG.replace(/\{nome\}/g, first));
  return `https://wa.me/${WHATS}?text=${text}`;
}

function readUtm() {
  const out: Record<string, string> = {};
  const q = new URLSearchParams(window.location.search);
  q.forEach((v, k) => {
    if (k.startsWith("utm_")) out[k] = v;
  });
  return out;
}

export default function LeadForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateLead({ nome, email, telefone });
    setErrors(v.errors);
    if (!v.ok) return;

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v.data, empresa, utm: readUtm() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error || "Algo deu errado. Tente novamente.");
      }
      setStatus("done");
      setTimeout(() => {
        window.location.href = whatsappUrl(v.data.nome);
      }, 900);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo deu errado.");
    }
  }

  const busy = status === "sending" || status === "done";

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          autoComplete="name"
          placeholder="Como você se chama?"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-invalid={!!errors.nome}
          disabled={busy}
        />
        {errors.nome && <span className="field-error">{errors.nome}</span>}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          disabled={busy}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="telefone">WhatsApp</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(11) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
          aria-invalid={!!errors.telefone}
          disabled={busy}
        />
        {errors.telefone && <span className="field-error">{errors.telefone}</span>}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" tabIndex={-1} autoComplete="off" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
      </div>

      <button type="submit" className="cta" disabled={busy}>
        <span>
          {status === "sending" ? "Verificando…" : status === "done" ? "Você está dentro ✓" : "Quero minha vaga"}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="form-note" role="status">
        {status === "error" ? (
          <span className="field-error">{message}</span>
        ) : status === "done" ? (
          "Abrindo o WhatsApp…"
        ) : (
          <>🔒 Ninguém além de mim vê seus dados. Ao enviar, você vai para o meu WhatsApp.</>
        )}
      </p>
    </form>
  );
}
