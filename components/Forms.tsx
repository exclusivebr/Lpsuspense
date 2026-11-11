"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/actions";
import SubmitButton from "./SubmitButton";

type Action = (s: FormState, f: FormData) => Promise<FormState>;

export function CompraForm({ action, cta }: { action: Action; cta: string }) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction}>
      <div className="pm-field">
        <label htmlFor="nome">Seu nome</label>
        <input id="nome" name="nome" autoComplete="name" defaultValue={state.nome} key={`n${state.nome}`} required />
      </div>
      <div className="pm-field">
        <label htmlFor="email">Seu melhor e-mail (será seu login)</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" defaultValue={state.email} key={`e${state.email}`} required />
      </div>
      {state.erro && <p className="pm-error">{state.erro}</p>}
      <SubmitButton pending="Abrindo pagamento…">{cta}</SubmitButton>
    </form>
  );
}

export function SenhaForm({ action, refId }: { action: Action; refId: string }) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction}>
      <input type="hidden" name="ref" value={refId} />
      <div className="pm-field">
        <label htmlFor="senha">Crie uma senha</label>
        <input id="senha" name="senha" type="password" minLength={6} autoComplete="new-password" required />
      </div>
      <div className="pm-field">
        <label htmlFor="confirmar">Repita a senha</label>
        <input id="confirmar" name="confirmar" type="password" minLength={6} autoComplete="new-password" required />
      </div>
      {state.erro && <p className="pm-error">{state.erro}</p>}
      <SubmitButton pending="Criando acesso…">Criar meu acesso</SubmitButton>
    </form>
  );
}

export function LoginForm({ action }: { action: Action }) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction}>
      <div className="pm-field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={state.email} key={`e${state.email}`} required />
      </div>
      <div className="pm-field">
        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" autoComplete="current-password" required />
      </div>
      {state.erro && <p className="pm-error">{state.erro}</p>}
      <SubmitButton pending="Entrando…">Entrar</SubmitButton>
    </form>
  );
}
