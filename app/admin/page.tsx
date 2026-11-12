import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton, CopyButton } from "@/components/AdminButtons";
import ColumnChart from "@/components/ColumnChart";
import { baldes, indiceBalde, lerPeriodo, noPeriodo, PRESETS } from "@/lib/periodo";
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

type SP = { aba?: string; novo?: string; erro?: string; senha?: string; periodo?: string; de?: string; ate?: string; todas?: string };

const LIMITE = 50;

const COR_DIRETO = "#2a78d6";
const COR_AFILIADO = "#eb6834";

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
  const comissoesAPagar = afiliados.reduce((s, a) => s + resumoAfiliado(a.codigo, compras).aPagar, 0);
  const aba = sp.aba === "afiliados" ? "afiliados" : "vendas";

  // ---- Período (vale para números, gráficos e tabela da aba Vendas) ----
  const per = lerPeriodo(sp, compras);
  const reais = compras.filter((c) => c.source !== "demo");
  const quando = (c: Purchase) => c.approvedAt ?? c.createdAt;
  const pagasP = reais.filter((c) => c.status === "approved" && noPeriodo(quando(c), per));
  const geradasP = reais.filter((c) => c.source !== "manual" && noPeriodo(c.createdAt, per));
  const receitaP = pagasP.reduce((s, c) => s + (c.amount ?? 0), 0);
  const comissaoP = pagasP.reduce((s, c) => s + (c.afiliado?.comissao ?? 0), 0);
  const pagasDeGeradas = geradasP.filter((c) => c.status === "approved").length;
  const conversao = geradasP.length ? Math.round((pagasDeGeradas / geradasP.length) * 100) : null;
  const listaP = compras.filter((c) => noPeriodo(c.createdAt, per) || (c.status === "approved" && noPeriodo(quando(c), per)));

  const bs = baldes(per);
  const receitaDia = bs.map((b) => ({ rotulo: b.rotulo, detalhe: b.detalhe, valores: [0] }));
  const vendasDia = bs.map((b) => ({ rotulo: b.rotulo, detalhe: b.detalhe, valores: [0, 0] }));
  for (const c of pagasP) {
    const i = indiceBalde(bs, quando(c));
    if (i < 0) continue;
    receitaDia[i].valores[0] = Math.round((receitaDia[i].valores[0] + (c.amount ?? 0)) * 100) / 100;
    vendasDia[i].valores[c.afiliado ? 1 : 0]++;
  }
  const ranking = afiliados
    .map((a) => {
      const minhas = pagasP.filter((c) => c.afiliado?.codigo === a.codigo);
      return { nome: a.nome, vendas: minhas.length, valor: minhas.reduce((s, c) => s + (c.amount ?? 0), 0) };
    })
    .filter((r) => r.vendas > 0)
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 8);
  const diretas = pagasP.filter((c) => !c.afiliado);
  const maxRank = Math.max(1, ...ranking.map((r) => r.valor), diretas.reduce((s, c) => s + (c.amount ?? 0), 0));

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

        <nav className="pm-tabs">
          <Link href="/admin" aria-current={aba === "vendas" ? "page" : undefined}>Vendas ({compras.length})</Link>
          <Link href="/admin?aba=afiliados" aria-current={aba === "afiliados" ? "page" : undefined}>Afiliados ({afiliados.length})</Link>
        </nav>

        {aba === "vendas" ? (
          <>
            {/* ---- Filtro de período: uma linha, acima de tudo que ele afeta ---- */}
            <div className="pm-filter">
              <div className="pm-seg" role="group" aria-label="Período">
                {PRESETS.map((p) => (
                  <Link key={p.id} href={`/admin?periodo=${p.id}`} aria-current={per.id === p.id ? "true" : undefined}>
                    {per.id === p.id && "✓ "}
                    {p.label}
                  </Link>
                ))}
              </div>
              <form action="/admin" method="get" className="pm-custom">
                <input type="hidden" name="periodo" value="custom" />
                <label>
                  De <input type="date" name="de" defaultValue={per.de} required />
                </label>
                <label>
                  até <input type="date" name="ate" defaultValue={per.ate} required />
                </label>
                <button type="submit" className={`pm-btn pm-btn-sm ${per.id === "custom" ? "pm-btn-navy" : "pm-btn-ghost"}`}>
                  {per.id === "custom" ? "✓ " : ""}Aplicar
                </button>
              </form>
            </div>
            <p className="pm-muted pm-small" style={{ margin: "0 0 12px" }}>Mostrando: <strong>{per.titulo}</strong> · {alunos.filter((x) => !x.bloqueado).length} alunos ativos no total</p>

            <div className="pm-grid pm-grid-4">
              <div className="pm-card pm-stat"><span>Receita</span><strong>{brl(receitaP)}</strong></div>
              <div className="pm-card pm-stat"><span>Vendas pagas</span><strong>{pagasP.length}</strong></div>
              <div className="pm-card pm-stat">
                <span>Conversão do Pix</span>
                <strong>{conversao === null ? "—" : `${conversao}%`}</strong>
                <small className="pm-muted">{pagasDeGeradas} pagos de {geradasP.length} gerados</small>
              </div>
              <div className="pm-card pm-stat">
                <span>Comissões no período</span>
                <strong>{brl(comissaoP)}</strong>
                <small className="pm-muted">a pagar (total): {brl(comissoesAPagar)}</small>
              </div>
            </div>

            <div className="pm-grid pm-grid-2" style={{ marginTop: 16 }}>
              <div className="pm-card">
                <h3>Receita {bs.length && bs[0].de !== bs[0].ate ? "por semana" : "por dia"}</h3>
                <ColumnChart titulo="Receita por período" formato="brl" series={[{ nome: "Receita", cor: COR_DIRETO }]} pontos={receitaDia} />
              </div>
              <div className="pm-card">
                <div className="pm-chart-head">
                  <h3 style={{ margin: 0 }}>Vendas pagas {bs.length && bs[0].de !== bs[0].ate ? "por semana" : "por dia"}</h3>
                  <div className="pm-legend">
                    <span><i style={{ background: COR_DIRETO }} /> Direto ({diretas.length})</span>
                    <span><i style={{ background: COR_AFILIADO }} /> Afiliados ({pagasP.length - diretas.length})</span>
                  </div>
                </div>
                <ColumnChart
                  titulo="Vendas pagas por período, direto e afiliados"
                  series={[{ nome: "Direto", cor: COR_DIRETO }, { nome: "Afiliados", cor: COR_AFILIADO }]}
                  pontos={vendasDia}
                />
              </div>
            </div>

            <div className="pm-card" style={{ marginTop: 16 }}>
              <h3>De onde vieram as vendas</h3>
              <div className="pm-hbars">
                <div className="pm-hbar">
                  <span className="n">Direto (sem afiliado)</span>
                  <div className="b"><i style={{ width: `${(diretas.reduce((s, c) => s + (c.amount ?? 0), 0) / maxRank) * 100}%`, background: COR_DIRETO }} /></div>
                  <span className="v">{brl(diretas.reduce((s, c) => s + (c.amount ?? 0), 0))} · {diretas.length}</span>
                </div>
                {ranking.map((r) => (
                  <div className="pm-hbar" key={r.nome}>
                    <span className="n">{r.nome}</span>
                    <div className="b"><i style={{ width: `${(r.valor / maxRank) * 100}%`, background: COR_AFILIADO }} /></div>
                    <span className="v">{brl(r.valor)} · {r.vendas}</span>
                  </div>
                ))}
                {ranking.length === 0 && <p className="pm-muted pm-small" style={{ margin: 0 }}>Nenhuma venda de afiliado neste período.</p>}
              </div>
            </div>

            <div className="pm-card" style={{ marginTop: 16 }}>
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

            <h3 style={{ marginTop: 24 }}>Vendas no período ({listaP.length})</h3>
            <div className="pm-table-wrap">
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
                  {listaP.length === 0 && (
                    <tr><td colSpan={7} className="pm-muted">Nenhuma venda neste período.</td></tr>
                  )}
                  {(sp.todas ? listaP : listaP.slice(0, LIMITE)).map((c) => (
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
            {!sp.todas && listaP.length > LIMITE && (
              <p style={{ marginTop: 12 }}>
                <Link
                  className="pm-btn pm-btn-ghost pm-btn-sm"
                  href={`/admin?${new URLSearchParams({ ...(per.id === "custom" ? { periodo: "custom", de: per.de, ate: per.ate } : { periodo: per.id }), todas: "1" }).toString()}`}
                >
                  Mostrar todas as {listaP.length} vendas
                </Link>
              </p>
            )}
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
