import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body style={{ margin: 0 }}>
        <div className="pm">{children}</div>
      </body>
    </html>
  );
}
