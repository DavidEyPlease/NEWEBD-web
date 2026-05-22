import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { FooterConditional } from "@/components/layout/footer-conditional";
import { ChatWidget } from "@/components/chat/chat-widget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newebd.com"),
  title: {
    default: "NEWEBD — El nuevo desarrollo web es con IA",
    template: "%s · NEWEBD",
  },
  description:
    "Integramos IA en tu negocio para que crezcas, ahorres tiempo y dinero. Webs, apps, sistemas y agentes a la medida.",
  applicationName: "NEWEBD",
  keywords: [
    "desarrollo web con IA",
    "agencia de desarrollo México",
    "agentes de IA",
    "automatización con IA",
    "aplicaciones a medida",
    "CRM personalizado",
    "Next.js México",
  ],
  authors: [{ name: "NEWEBD" }],
  creator: "NEWEBD",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://newebd.com",
    siteName: "NEWEBD",
    title: "NEWEBD — El nuevo desarrollo web es con IA",
    description:
      "Integramos IA en tu negocio para que crezcas, ahorres tiempo y dinero.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWEBD — El nuevo desarrollo web es con IA",
    description:
      "Integramos IA en tu negocio para que crezcas, ahorres tiempo y dinero.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <FooterConditional />
        <ChatWidget />
      </body>
    </html>
  );
}
