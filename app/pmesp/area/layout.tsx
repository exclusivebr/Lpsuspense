import type { Metadata } from "next";
import Link from "next/link";
import AreaNav from "@/components/pmesp/AreaNav";
import { requireStudent } from "@/lib/pmesp/accounts";
import { sair } from "../actions";

export const metadata: Metadata = { title: "Área do aluno", robots: { index: false } };

export default async function AreaLayout({ children }: { children: React.ReactNode }) {
  await requireStudent();
  return (
    <>
      <header className="pm-top">
        <div className="pm-wrap">
          <Link href="/pmesp/area" className="pm-brand">
            <span className="pm-badge">PM</span> Missão PMESP
          </Link>
          <AreaNav sair={sair} />
        </div>
      </header>
      {children}
    </>
  );
}
