import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton, CopyButton } from "@/components/AdminButtons";
import { isAdmin } from "@/lib/admin";
import { formatPhone, listPurchases, listStudents, type Purchase } from "@/lib/accounts";
import { listAfiliados, resumoAfiliado } from "@/lib/afiliados";
import { mercadoPagoConfigured, productPrice } from "@/lib/payments";
import { brl, siteUrl } from "@/lib/site";
import { storeConfigured } from "@/lib/store";
import { wivenConfigured } from "@/lib/wiven";
import {
  alternarAfiliado,
  aprovarCompra,
  criarAfiliado,
  editarAfiliado,
  excluirAfiliado,
  excluirCompra,
  liberarManual,
  loginAdmin,
  pagarComissoes,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Painel", robots: { index: false, follow: false } };

const STATUS = { approved: ["Aprovada", "pm-tag-ok"], pending: ["Pendente", "pm-tag-warn"], rejected: ["Recusada", "pm-tag-bad"] } as const;
const ORIGEM: Record<Purchase["source"], string> = { wiven: "Pix Wiven", mercadopago: "Mercado Pago", manual: "Manual", demo: "Teste" };

const dataHora = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });

type SP = { aba?: string; novo?: string; erro?: string; senha?: string; filtro?: string };

export default async function AdminPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
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
            {sp.senha && <p className="pm-error">Senha incorreta.</p>}
            <button className="pm-btn pm-btn-navy pm-btn-block" type="submit">Entrar</button>
          </form>
        </div>
      </main>
    );
  }

  const [compras, alunos, afiliados, base] = await Promise.all([listPurchases(), listStudents(), listAfiliados(), siteUrl()]);
  const aprovadas = compras.filter((c) => c.status === "approved" && c.source !== "demo");
  const receita = aprovadas.reduce((s, c) => s + (c.amount ?? 0), 0);
  const comissoesAPagar = afiliados.reduce((s, a) => s + resumoAfiliado(a.codigo, compras).aPagar, 0);
  const aba = sp.aba === "afiliados" ? "afiliados" : "vendas";

  return (
    <main className="pm-page">
      <div className="pm-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Painel · Missão PMESP</h1>
          <Link href="/" className="pm-btn pm-btn-ghost pm-btn-sm">Ver site</Link>
        </div>
        {!storeConfigured() && <p className="pm-note" style={{ marginTop: 12 }}>Banco não conectado: os dados estão só em memória (modo desenvolvimento).</p>}
        {!mercadoPagoConfigured() && !wivenConfigured() && (
          <p className="pm-note" style={{ marginTop: 8 }}>Nenhum pagamento configurado (Wiven ou Mercado Pago).</p>
        )}

        <div className="pm-grid pm-grid-4" style={{ marginTop: 16 }}>
          <div className="pm-card pm-stat"><span>Vendas aprovadas</span><strong>{aprovadas.length}</strong></div>
          <div className="pm-card pm-stat"><span>Receita</span><strong>{brl(receita)}</strong></div>
          <div className="pm-card pm-stat"><span>Comissões a pagar</span><strong>{brl(comissoesAPagar)}</strong></div>
          <div className="pm-card pm-stat"><span>Alunos ativos</span><strong>{alunos.filter((a) => !a.bloqueado).length}</strong></div>
        </div>

        <nav className="pm-tabs">
          <Link href="/admin" aria-current={aba === "vendas" ? "page" : undefined}>Vendas ({compras.length})</Link>
          <Link href="/admin?aba=afiliados" aria-current={aba === "afiliados" ? "page" : undefined}>Afiliados ({afiliados.length})</Link>
        </nav>

        {aba === "vendas" ? (
          <>
            <div className="pm-card">
              <h3>Liberar acesso manualmente</h3>
              <p className="pm-muted pm-small">Para vendas por outro canal ou cortesias. O aluno entra direto com o WhatsApp informado aqui. Preço atual: {brl(productPrice())}.</p>
              {sp.novo && <p className="pm-okbox">Acesso liberado! O aluno já pode entrar em <strong>{base}/entrar</strong> com o WhatsApp dele.</p>}
              {sp.erro && <p className="pm-error">Preencha nome e WhatsApp válidos (com DDD).</p>}
              <form action={liberarManual} className="pm-grid pm-grid-3" style={{ alignItems: "end" }}>
                <div className="pm-field" style={{ margin: 0 }}>
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" name="nome" required />
                </div>
                <div className="pm-field" style={{ margin: 0 }}>
                  <label htmlFor="telefone">WhatsApp</label>
                  <input id="telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" required />
                </div>
                <button className="pm-btn pm-btn-navy" type="submit">Liberar acesso</button>
              </form>
            </div>

            <div className="pm-table-wrap" style={{ marginTop: 20 }}>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Origem</th>
                    <th>Afiliado</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.length === 0 && (
                    <tr><td colSpan={7} className="pm-muted">Nenhuma venda ainda.</td></tr>
                  )}
                  {compras.map((c) => (
                    <tr key={c.ref}>
                      <td className="pm-small">{dataHora(c.createdAt)}</td>
                      <td>
                        <strong>{c.nome}</strong>
                        <div className="pm-small pm-muted">{formatPhone(c.telefone ?? "")}</div>
                      </td>
                      <td>{c.amount ? brl(c.amount) : "—"}</td>
                      <td><span className={`pm-tag ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span></td>
                      <td className="pm-small">{ORIGEM[c.source]}</td>
                      <td className="pm-small">
                        {c.afiliado ? (
                          <>
                            <strong>{c.afiliado.nome}</strong>
                            <div className="pm-muted">
                              {c.afiliado.percentual}% · {brl(c.afiliado.comissao)} {c.status === "approved" && (c.comissaoPagaEm ? "· paga" : "· a pagar")}
                            </div>
                          </>
                        ) : (
                          <span className="pm-muted">—</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {c.status !== "approved" && (
                            <form action={aprovarCompra}>
                              <input type="hidden" name="ref" value={c.ref} />
                              <button className="pm-btn pm-btn-ghost pm-btn-sm" type="submit">Aprovar</button>
                            </form>
                          )}
                          <form action={excluirCompra}>
                            <input type="hidden" name="ref" value={c.ref} />
                            <ConfirmButton
                              className="pm-btn pm-btn-danger pm-btn-sm"
                              msg={`Excluir a venda de ${c.nome}?${c.status === "approved" ? " O acesso deste WhatsApp à área do aluno também será removido." : ""} Isso não estorna o Pix na Wiven.`}
                            >
                              Excluir
                            </ConfirmButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="pm-card">
              <h3>Novo afiliado</h3>
              <p className="pm-muted pm-small">
                A porcentagem vale para as vendas feitas a partir de agora. O afiliado recebe um link de divulgação e um link privado
                para acompanhar as vendas dele.
              </p>
              {sp.erro === "dados" && <p className="pm-error">Preencha o nome e uma porcentagem de 0 a 100.</p>}
              {sp.erro === "codigo" && <p className="pm-error">Esse código já existe ou é inválido (use só letras e números).</p>}
              <form action={criarAfiliado} className="pm-grid pm-grid-4" style={{ alignItems: "end" }}>
                <div className="pm-field" style={{ margin: 0 }}>
                  <label htmlFor="af-nome">Nome do afiliado</label>
                  <input id="af-nome" name="nome" placeholder="Ex.: João Silva" required />
                </div>
                <div className="pm-field" style={{ margin: 0 }}>
                  <label htmlFor="af-pct">Comissão (%)</label>
                  <input id="af-pct" name="percentual" type="number" min={0} max={100} step="0.5" placeholder="30" required />
                </div>
                <div className="pm-field" style={{ margin: 0 }}>
                  <label htmlFor="af-cod">Código do link (opcional)</label>
                  <input id="af-cod" name="codigo" placeholder="joao" pattern="[A-Za-z0-9]{2,20}" />
                </div>
                <button className="pm-btn pm-btn-navy" type="submit">Gerar link</button>
              </form>
            </div>

            {afiliados.length === 0 && <p className="pm-muted" style={{ marginTop: 20 }}>Nenhum afiliado cadastrado.</p>}

            <div className="pm-grid" style={{ marginTop: 20 }}>
              {afiliados.map((a) => {
                const r = resumoAfiliado(a.codigo, compras);
                const linkVenda = `${base}/a/${a.codigo}`;
                const linkPainel = `${base}/parceiro/${a.token}`;
                return (
                  <div key={a.codigo} className="pm-card pm-aff" style={sp.novo === a.codigo ? { borderColor: "var(--gold)", boxShadow: "0 0 0 3px rgba(224,180,60,.25)" } : undefined}>
                    <div className="pm-aff-head">
                      <div>
                        <h3 style={{ margin: 0 }}>
                          {a.nome} {!a.ativo && <span className="pm-tag pm-tag-bad">pausado</span>}
                          {sp.novo === a.codigo && <span className="pm-tag pm-tag-ok">novo</span>}
                        </h3>
                        <span className="pm-muted pm-small">Comissão atual: {a.percentual}% = {brl((productPrice() * a.percentual) / 100)} por venda</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <form action={editarAfiliado} className="pm-inline">
                          <input type="hidden" name="codigo" value={a.codigo} />
                          <input name="percentual" type="number" min={0} max={100} step="0.5" defaultValue={a.percentual} aria-label="Nova porcentagem" />
                          <button className="pm-btn pm-btn-ghost pm-btn-sm" type="submit">Salvar %</button>
                        </form>
                        <form action={alternarAfiliado}>
                          <input type="hidden" name="codigo" value={a.codigo} />
                          <button className="pm-btn pm-btn-ghost pm-btn-sm" type="submit">{a.ativo ? "Pausar" : "Reativar"}</button>
                        </form>
                        <form action={excluirAfiliado}>
                          <input type="hidden" name="codigo" value={a.codigo} />
                          <ConfirmButton className="pm-btn pm-btn-danger pm-btn-sm" msg={`Excluir ${a.nome}? O link para de funcionar. As vendas já feitas continuam registradas.`}>
                            Excluir
                          </ConfirmButton>
                        </form>
                      </div>
                    </div>

                    <div className="pm-linkbox">
                      <span className="pm-small" style={{ fontWeight: 700, minWidth: 120 }}>Link de divulgação</span>
                      <code>{linkVenda}</code>
                      <CopyButton text={linkVenda} />
                    </div>
                    <div className="pm-linkbox">
                      <span className="pm-small" style={{ fontWeight: 700, minWidth: 120 }}>Painel do afiliado</span>
                      <code>{linkPainel}</code>
                      <CopyButton text={linkPainel} />
                    </div>

                    <div className="pm-aff-nums">
                      <div><span>Vendas</span><strong>{r.vendas}</strong>{r.pendentes > 0 && <small className="pm-muted"> +{r.pendentes} pend.</small>}</div>
                      <div><span>Total vendido</span><strong>{brl(r.vendido)}</strong></div>
                      <div><span>A pagar</span><strong style={{ color: r.aPagar > 0 ? "var(--bad)" : undefined }}>{brl(r.aPagar)}</strong></div>
                      <div><span>Já pago</span><strong>{brl(r.pago)}</strong></div>
                    </div>
                    {r.aPagar > 0 && (
                      <form action={pagarComissoes}>
                        <input type="hidden" name="codigo" value={a.codigo} />
                        <ConfirmButton className="pm-btn pm-btn-gold pm-btn-sm" msg={`Confirmar que você pagou ${brl(r.aPagar)} para ${a.nome}?`}>
                          Marcar {brl(r.aPagar)} como pago
                        </ConfirmButton>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
