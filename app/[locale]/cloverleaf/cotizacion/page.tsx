import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CloverleafQuote } from "./quote";

/**
 * Cotización para CloverleafAWS (cliente), complemento de /cloverleaf.
 * En inglés y en USD — el cliente está en Missouri, EE.UU.
 * Fuera del nav y sin indexar: se comparte por liga directa.
 */
export const metadata: Metadata = {
  title: "CloverLeaf — Quote",
  description:
    "What each module of CloverLeaf's certification system costs, when it arrives, and how to pay for it. Website migration included, prototype credited.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function CloverleafQuotePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CloverleafQuote />;
}
