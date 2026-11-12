import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/AdminButtons";
import { listPurchases } from "@/lib/accounts";
import { getAfiliadoPorToken, resumoAfiliado } from "@/lib/afiliados";
import { productPrice } from "@/lib/payments";
import { brl, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Painel do afiliado", robots: { index: false, follow: false } };

const STATUS = { approved: ["Paga", "pm-tag-ok"], pending: ["Aguardando Pix", "pm-tag-warn"], rejected: ["Cancelada", "pm-tag-bad"] } as const;

/** Mostra só o primeiro nome e o final do WhatsApp do comprador (privacidade). */
function mascarar(nome: string, tel: string) {
  return `${nome.split(" ")[0]} · (${tel.slice(0, 2)}) •••••-${tel.slice(-2)}`;
}

export default async function ParceiroPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const a = await getAfiliadoPorToken(token);
  if (!a) notFound();
  const [compras, base] = await Promise.all([listPurchases(), siteUrl()]);
  const r = resumoAfiliado(a.codigo, compras);
  const link = `${base}/a/${a.codigo}`;

  return (
    <>
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
          <span style={{ marginLeft: "auto", color: "#cbd5e1", fontSize: 14, fontWeight: 700 }}>Painel do afiliado</span>
        </div>
      </header>
      <main className="pm-page">
        <div className="pm-wrap">
          <p className="pm-muted" style={{ marginBottom: 4 }}>Olá, {a.nome.split(" ")[0]} 👋</p>
          <h1>Suas vendas</h1>
          {!a.ativo && <p className="pm-error">Seu link está pausado no momento. Fale com o responsável pelo produto.</p>}

          <div className="pm-card" style={{ marginTop: 12 }}>
            <h3>Seu link de divulgação</h3>
            <div className="pm-linkbox" style={{ marginTop: 8 }}>
              <code style={{ fontSize: 15 }}>{link}</code>
              <CopyButton text={link} label="Copiar link" />
            </div>
            <p className="pm-muted pm-small" style={{ marginBottom: 0, marginTop: 10 }}>
              Quem entrar por este link e comprar em até 30 dias conta como venda sua. Você ganha <strong>{a.percentual}%</strong> de
              cada venda ({brl((productPrice() * a.percentual) / 100)} no preço atual de {brl(productPrice())}).
            </p>
          </div>

          <div className="pm-grid pm-grid-4" style={{ marginTop: 16 }}>
            <div className="pm-card pm-stat"><span>Vendas pagas</span><strong>{r.vendas}</strong></div>
            <div className="pm-card pm-stat"><span>Total vendido</span><strong>{brl(r.vendido)}</strong></div>
            <div className="pm-card pm-stat"><span>A receber</span><strong style={{ color: "var(--ok)" }}>{brl(r.aPagar)}</strong></div>
            <div className="pm-card pm-stat"><span>Já recebido</span><strong>{brl(r.pago)}</strong></div>
          </div>

          <h2 style={{ marginTop: 28 }}>Histórico</h2>
          <div className="pm-table-wrap">
            <table>
              <thead>
                <tr><th>Data</th><th>Cliente</th><th>Status</th><th>Sua comissão</th></tr>
              </thead>
              <tbody>
                {r.compras.length === 0 && (
                  <tr><td colSpan={4} className="pm-muted">Nenhuma venda ainda. Compartilhe seu link! 🚀</td></tr>
                )}
                {r.compras.map((c) => (
                  <tr key={c.ref}>
                    <td className="pm-small">{new Date(c.createdAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</td>
                    <td>{mascarar(c.nome, c.telefone ?? "")}</td>
                    <td><span className={`pm-tag ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span></td>
                    <td>
                      {c.status === "approved" ? (
                        <>
                          <strong>{brl(c.afiliado?.comissao ?? 0)}</strong>{" "}
                          <span className={`pm-tag ${c.comissaoPagaEm ? "pm-tag-ok" : ""}`}>{c.comissaoPagaEm ? "recebida" : "a receber"}</span>
                        </>
                      ) : (
                        <span className="pm-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pm-muted pm-small" style={{ marginTop: 10 }}>Guarde este endereço: ele é o seu acesso a este painel. Não compartilhe.</p>
        </div>
      </main>
    </>
  );
}
