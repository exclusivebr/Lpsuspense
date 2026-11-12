"use client";

import { useActionState, useState } from "react";
import type { FormState } from "@/app/actions";
import SubmitButton from "./SubmitButton";

type Action = (s: FormState, f: FormData) => Promise<FormState>;

/** (11) 99999-9999 ou (11) 9999-9999 enquanto digita. */
export function maskPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** 000.000.000-00 enquanto digita. */
export function maskCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function MaskedInput({ name, mask, initial, ...rest }: { name: string; mask: (v: string) => string; initial?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "defaultValue">) {
  const [value, setValue] = useState(() => mask(initial ?? ""));
  return <input id={name} name={name} value={value} onChange={(e) => setValue(mask(e.target.value))} {...rest} />;
}

export function CompraForm({ action, cta, pedirCpf = false, pix = false }: { action: Action; cta: string; pedirCpf?: boolean; pix?: boolean }) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction}>
      <div className="pm-field">
        <label htmlFor="nome">Seu nome</label>
        <input id="nome" name="nome" autoComplete="name" defaultValue={state.nome} key={`n${state.nome}`} required />
      </div>
      <div className="pm-field">
        <label htmlFor="telefone">Seu WhatsApp (será seu acesso)</label>
        <MaskedInput key={`t${state.telefone}`} name="telefone" mask={maskPhone} initial={state.telefone} type="tel" inputMode="numeric" autoComplete="tel" placeholder="(11) 99999-9999" required />
      </div>
      {pedirCpf && (
        <div className="pm-field">
          <label htmlFor="cpf">CPF</label>
          <MaskedInput key={`c${state.cpf}`} name="cpf" mask={maskCpf} initial={state.cpf} inputMode="numeric" placeholder="000.000.000-00" required />
        </div>
      )}
      {state.erro && <p className="pm-error">{state.erro}</p>}
      <SubmitButton pending={pix ? "Gerando seu Pix…" : "Abrindo pagamento…"}>{cta}</SubmitButton>
      <p className="pm-muted pm-small pm-center" style={{ marginTop: 10, marginBottom: 0 }}>
        🔒 {pix ? "Pagamento seguro via Pix." : "Pagamento seguro."} Depois, é só entrar com este WhatsApp.
      </p>
    </form>
  );
}

export function LoginForm({ action }: { action: Action }) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction}>
      <div className="pm-field">
        <label htmlFor="telefone">WhatsApp usado na compra</label>
        <MaskedInput key={`t${state.telefone}`} name="telefone" mask={maskPhone} initial={state.telefone} type="tel" inputMode="numeric" autoComplete="tel" placeholder="(11) 99999-9999" required autoFocus />
      </div>
      {state.erro && <p className="pm-error">{state.erro}</p>}
      <SubmitButton pending="Entrando…">Entrar</SubmitButton>
    </form>
  );
}
