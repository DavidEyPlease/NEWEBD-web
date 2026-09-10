import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CloverleafProposal } from "./proposal";

/**
 * Propuesta de ERP para CloverleafAWS (cliente).
 * Cubre lo ya entregado (migración del sitio) y el sistema propuesto.
 * En inglés — el cliente está en Missouri, EE.UU.
 * Fuera del nav y sin indexar: se comparte por liga directa, igual que /vegemex.
 */
export const metadata: Metadata = {
  title: "CloverLeaf — Website delivered, ERP proposed",
  description:
    "What NEWEBD delivered migrating CloverLeaf's website, and the certification management system proposed next: leads, clients, audits, findings and certificates in one operation.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function CloverleafPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CloverleafProposal />;
}
