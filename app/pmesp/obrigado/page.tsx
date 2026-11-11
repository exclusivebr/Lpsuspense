import type { Metadata } from "next";
import Link from "next/link";
import AutoRefresh from "@/components/pmesp/AutoRefresh";
import { SenhaForm } from "@/components/pmesp/Forms";
import { getPurchase, getStudent } from "@/lib/pmesp/accounts";
import { syncPurchase } from "@/lib/pmesp/billing";
import { criarAcesso } from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Seu acesso", robots: { index: false } };

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/pmesp" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
        </div>
      </header>
      <main className="pm-page">
        <div className="pm-narrow" style={{ maxWidth: 480 }}>
          <div className="pm-card">{children}</div>
        </div>
      </main>
    </>
  );
}

export default async function ObrigadoPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref = "" } = await searchParams;
  const found = await getPurchase(ref);
  if (!found) {
    return (
      <Shell>
        <h1 style={{ fontSize: 26 }}>Compra não encontrada</h1>
        <p>Use o link que apareceu depois do pagamento. Se precisar de ajuda, fale com o suporte.</p>
        <Link href="/pmesp" className="pm-btn pm-btn-navy">
          Voltar
        </Link>
      </Shell>
    );
  }
  const p = await syncPurchase(found);

  if (p.status === "approved" && !p.claimedAt && !(await getStudent(p.email))) {
    return (
      <Shell>
        <span className="pm-tag pm-tag-ok">Pagamento aprovado</span>
        <h1 style={{ fontSize: 26, marginTop: 10 }}>Bem-vindo(a) à missão, {p.nome.split(" ")[0]}!</h1>
        <p>
          Seu login é <strong>{p.email}</strong>. Crie uma senha para entrar na área do aluno.
        </p>
        <SenhaForm action={criarAcesso} refId={p.ref} />
      </Shell>
    );
  }
  if (p.status === "approved") {
    return (
      <Shell>
        <span className="pm-tag pm-tag-ok">Acesso liberado</span>
        <h1 style={{ fontSize: 26, marginTop: 10 }}>Sua conta já está criada</h1>
        <p>Entre com o e-mail {p.email} e a senha que você cadastrou.</p>
        <Link href="/pmesp/entrar" className="pm-btn pm-btn-gold pm-btn-block">
          Entrar na área do aluno
        </Link>
      </Shell>
    );
  }
  if (p.status === "rejected") {
    return (
      <Shell>
        <span className="pm-tag pm-tag-bad">Pagamento não aprovado</span>
        <h1 style={{ fontSize: 26, marginTop: 10 }}>Não deu certo desta vez</h1>
        <p>O pagamento foi recusado ou cancelado. Você pode tentar de novo com outra forma de pagamento.</p>
        <Link href="/pmesp#oferta" className="pm-btn pm-btn-gold pm-btn-block">
          Tentar novamente
        </Link>
      </Shell>
    );
  }
  return (
    <Shell>
      <AutoRefresh seconds={8} />
      <span className="pm-tag pm-tag-warn">Aguardando pagamento</span>
      <h1 style={{ fontSize: 26, marginTop: 10 }}>Quase lá!</h1>
      <p>
        Assim que o pagamento for confirmado, esta página libera a criação da sua senha automaticamente. No Pix, isso leva
        poucos segundos. No boleto, pode levar até 3 dias úteis.
      </p>
      <p className="pm-muted pm-small">Guarde o endereço desta página: é o seu link de primeiro acesso.</p>
    </Shell>
  );
}
