import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin";
import { listPurchases, listStudents } from "@/lib/accounts";
import { mercadoPagoConfigured, productPrice } from "@/lib/payments";
import { brl, siteUrl } from "@/lib/site";
import { storeConfigured } from "@/lib/store";
import { aprovarCompra, liberarManual, loginAdmin } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Vendas", robots: { index: false, follow: false } };

const STATUS = { approved: ["Aprovada", "pm-tag-ok"], pending: ["Pendente", "pm-tag-warn"], rejected: ["Recusada", "pm-tag-bad"] } as const;

export default async function AdminVendas({ searchParams }: { searchParams: Promise<{ novo?: string; erro?: string; senha?: string }> }) {
  const { novo, erro, senha } = await searchParams;
  if (!(await isAdmin())) {
    return (
      <main className="pm-page">
        <div className="pm-narrow" style={{ maxWidth: 440 }}>
          <form className="pm-card" action={loginAdmin}>
            <h1 style={{ fontSize: 24 }}>Painel de vendas</h1>
            {!process.env.ADMIN_PASSWORD && <p className="pm-note">Defina a variável ADMIN_PASSWORD na Vercel para liberar o acesso.</p>}
            <div className="pm-field">
              <label htmlFor="password">Senha</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {senha && <p className="pm-error">Senha incorreta.</p>}
            <button className="pm-btn pm-btn-navy pm-btn-block" type="submit">Entrar</button>
          </form>
        </div>
      </main>
    );
  }
  const [compras, alunos, base] = await Promise.all([listPurchases(), listStudents(), siteUrl()]);
  const aprovadas = compras.filter((c) => c.status === "approved" && c.source !== "demo");
  const receita = aprovadas.reduce((s, c) => s + (c.amount ?? 0), 0);
  const link = (ref: string) => `${base}/obrigado?ref=${ref}`;

  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <h1>Vendas · Missão PMESP</h1>
        {!storeConfigured() && <p className="pm-note">Banco não conectado: os dados estão só em memória (modo desenvolvimento).</p>}
        {!mercadoPagoConfigured() && (
          <p className="pm-note" style={{ marginTop: 8 }}>
            Mercado Pago não configurado (MERCADOPAGO_ACCESS_TOKEN). {process.env.PMESP_CHECKOUT_URL ? "Usando checkout externo: aprove as compras manualmente." : ""}
          </p>
        )}

        <div className="pm-grid pm-grid-4" style={{ marginTop: 16 }}>
          <div className="pm-card pm-stat"><span>Vendas aprovadas</span><strong>{aprovadas.length}</strong></div>
          <div className="pm-card pm-stat"><span>Receita</span><strong>{brl(receita)}</strong></div>
          <div className="pm-card pm-stat"><span>Alunos com conta</span><strong>{alunos.length}</strong></div>
          <div className="pm-card pm-stat"><span>Preço atual</span><strong>{brl(productPrice())}</strong></div>
        </div>

        <div className="pm-card" style={{ marginTop: 16 }}>
          <h3>Liberar acesso manualmente</h3>
          <p className="pm-muted pm-small">Para vendas por outro canal (Hotmart, Kiwify, Pix direto) ou cortesias. Gera o link de primeiro acesso para enviar ao aluno.</p>
          {novo && (
            <p className="pm-okbox" style={{ wordBreak: "break-all" }}>
              Acesso liberado! Envie este link ao aluno: <strong>{link(novo)}</strong>
            </p>
          )}
          {erro && <p className="pm-error">Preencha nome e e-mail válidos.</p>}
          <form action={liberarManual} className="pm-grid pm-grid-3" style={{ alignItems: "end" }}>
            <div className="pm-field" style={{ margin: 0 }}>
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" required />
            </div>
            <div className="pm-field" style={{ margin: 0 }}>
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" required />
            </div>
            <button className="pm-btn pm-btn-navy" type="submit">Liberar acesso</button>
          </form>
        </div>

        <h2 style={{ marginTop: 28 }}>Compras ({compras.length})</h2>
        <div className="pm-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Origem</th>
                <th>Primeiro acesso</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((c) => (
                <tr key={c.ref}>
                  <td>{new Date(c.createdAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</td>
                  <td>
                    <strong>{c.nome}</strong>
                    <div className="pm-small pm-muted">{c.email}</div>
                  </td>
                  <td>
                    <span className={`pm-tag ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span>
                  </td>
                  <td className="pm-small">{c.source}{c.paymentId ? ` #${c.paymentId}` : ""}</td>
                  <td className="pm-small" style={{ wordBreak: "break-all" }}>
                    {c.status === "approved" ? (
                      c.claimedAt ? "Conta criada" : <a href={link(c.ref)}>{link(c.ref)}</a>
                    ) : (
                      <form action={aprovarCompra}>
                        <input type="hidden" name="ref" value={c.ref} />
                        <button className="pm-btn pm-btn-ghost" style={{ padding: "6px 10px", fontSize: 13 }} type="submit">Aprovar manualmente</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
