"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/area", "Painel"],
  ["/area/simulados", "Simulados"],
  ["/area/desempenho", "Resultado final"],
  ["/area/edital", "Edital"],
  ["/area/estudar", "O que estudar"],
  ["/area/plano", "Plano"],
  ["/area/redacao", "Redação"],
] as const;

export default function AreaNav({ sair }: { sair: () => Promise<void> }) {
  const path = usePathname();
  return (
    <nav className="pm-nav">
      {LINKS.map(([href, label]) => {
        const active = href === "/area" ? path === href : path.startsWith(href) || (href.endsWith("simulados") && path.includes("/resultado/"));
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
