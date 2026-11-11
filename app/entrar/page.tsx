import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/Forms";
import { currentStudent } from "@/lib/accounts";
import { entrar } from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Entrar", robots: { index: false } };

export default async function EntrarPage() {
  if (await currentStudent()) redirect("/area");
  return (
    <>
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
        </div>
      </header>
      <main className="pm-page">
        <div className="pm-narrow" style={{ maxWidth: 440 }}>
          <div className="pm-card">
            <h1 style={{ fontSize: 26 }}>Área do aluno</h1>
            <p className="pm-muted">Entre com o e-mail usado na compra.</p>
            <LoginForm action={entrar} />
            <p className="pm-small pm-muted" style={{ marginTop: 16, marginBottom: 0 }}>
              Primeiro acesso? Use o link que apareceu depois do pagamento. Ainda não tem acesso?{" "}
              <Link href="/#oferta">Garanta o seu</Link>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
