import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listLeads, storageConfigured } from "@/lib/db";
import { formatPhone } from "@/lib/validate";
import { login, logout, removeLead } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin — Lista confidencial", robots: { index: false, follow: false } };

const fmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

function waLink(tel: string) {
  const d = tel.replace(/\D/g, "");
  return `https://wa.me/${d.length <= 11 ? "55" + d : d}`;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ erro?: string; q?: string }> }) {
  const { erro, q } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <main className="login">
        <form action={login}>
          <span className="stamp mono">Área restrita</span>
          <h1>Painel de leads</h1>
          {!process.env.ADMIN_PASSWORD && (
            <p className="warn">Defina a variável ADMIN_PASSWORD na Vercel para liberar o acesso.</p>
          )}
          <div className="field">
            <label htmlFor="password">Senha</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
          </div>
          {erro && <span className="field-error">Senha incorreta.</span>}
          <button className="cta" type="submit">
            <span>Entrar</span>
          </button>
        </form>
      </main>
    );
  }

  const all = await listLeads();
  const term = (q ?? "").trim().toLowerCase();
  const leads = term
    ? all.filter((l) => `${l.nome} ${l.email} ${l.telefone}`.toLowerCase().includes(term))
    : all;

  const now = Date.now();
  const last24 = all.filter((l) => now - new Date(l.createdAt).getTime() < 86_400_000).length;
  const today = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const todayCount = all.filter(
    (l) => new Date(l.createdAt).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }) === today,
  ).length;

  return (
    <main className="admin">
      <div className="admin-head">
        <div>
          <span className="stamp mono">Confidencial</span>
          <h1 style={{ marginTop: 10 }}>Lista confidencial</h1>
        </div>
        <div className="admin-actions">
          <a className="btn btn-primary" href="/admin/export">
            Baixar CSV
          </a>
          <form action={logout}>
            <button className="btn btn-ghost" type="submit">
              Sair
            </button>
          </form>
        </div>
      </div>

      {!storageConfigured() && (
        <p className="warn">
          Banco não conectado: os leads estão só em memória (modo desenvolvimento). Conecte o Upstash Redis na Vercel.
        </p>
      )}

      <div className="stats">
        <div className="stat"><b>{all.length}</b><span>Total de leads</span></div>
        <div className="stat"><b>{todayCount}</b><span>Hoje</span></div>
        <div className="stat"><b>{last24}</b><span>Últimas 24h</span></div>
      </div>

      <form className="admin-actions" style={{ marginBottom: 16 }}>
        <div className="field" style={{ flex: 1, minWidth: 220 }}>
          <input name="q" placeholder="Buscar por nome, e-mail ou telefone" defaultValue={q ?? ""} />
        </div>
        <button className="btn" type="submit">Buscar</button>
      </form>

      <div className="table-wrap">
        {leads.length === 0 ? (
          <div className="empty">{term ? "Nenhum lead encontrado." : "Nenhum lead ainda. O suspense está funcionando? 👀"}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>WhatsApp</th>
                <th>Origem</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="mono">{fmt.format(new Date(l.createdAt))}</td>
                  <td>{l.nome}</td>
                  <td><a href={`mailto:${l.email}`}>{l.email}</a></td>
                  <td><a href={waLink(l.telefone)} target="_blank" rel="noreferrer">{formatPhone(l.telefone)}</a></td>
                  <td className="mono dim">{l.utm ? Object.values(l.utm).join(" / ") : "—"}</td>
                  <td>
                    <form action={removeLead}>
                      <input type="hidden" name="id" value={l.id} />
                      <button className="btn btn-danger" type="submit">Excluir</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
