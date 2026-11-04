import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Marcha no Tráfego — Acesso restrito",
  description: "Algo está sendo preparado. Entre na lista secreta e saiba antes de todo mundo.",
  openGraph: {
    title: "Marcha no Tráfego — Acesso restrito",
    description: "Algo está sendo preparado. Entre na lista secreta.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
