"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/pmesp/area", "Painel"],
  ["/pmesp/area/simulados", "Simulados"],
  ["/pmesp/area/desempenho", "Resultado final"],
  ["/pmesp/area/edital", "Edital"],
  ["/pmesp/area/estudar", "O que estudar"],
  ["/pmesp/area/plano", "Plano"],
  ["/pmesp/area/redacao", "Redação"],
] as const;

export default function AreaNav({ sair }: { sair: () => Promise<void> }) {
  const path = usePathname();
  return (
    <nav className="pm-nav">
      {LINKS.map(([href, label]) => {
        const active = href === "/pmesp/area" ? path === href : path.startsWith(href) || (href.endsWith("simulados") && path.includes("/resultado/"));
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
      <form action={sair}>
        <button type="submit">Sair</button>
      </form>
    </nav>
  );
}
