import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import "../globals.css";

import { ChatWidget } from "@/components/chat/chat-widget";
import { FooterConditional } from "@/components/layout/footer-conditional";
import { Header } from "@/components/layout/header";
import { routing } from "@/i18n/routing";

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
  authors: [{ name: "NEWEBD" }],
  creator: "NEWEBD",
  openGraph: {
    type: "website",
    url: "https://newebd.com",
    siteName: "NEWEBD",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <FooterConditional />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
