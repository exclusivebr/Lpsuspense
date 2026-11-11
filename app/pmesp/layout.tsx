import type { Metadata, Viewport } from "next";
import "./pmesp.css";

export const metadata: Metadata = {
  title: { default: "Missão PMESP — Simulados para Soldado PM 2027", template: "%s · Missão PMESP" },
  description:
    "Simulados no padrão Vunesp, guia completo do edital DP-4/321/26, o que estudar, cronograma e resultado final com projeção da sua nota para Soldado PM de SP.",
  openGraph: {
    title: "Missão PMESP — Simulados para Soldado PM 2027",
    description: "Simulados no padrão Vunesp + guia completo do edital + resultado final com projeção de nota.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = { themeColor: "#0b1f3a", colorScheme: "light" };

export default function PmespLayout({ children }: { children: React.ReactNode }) {
  return <div className="pm">{children}</div>;
}
