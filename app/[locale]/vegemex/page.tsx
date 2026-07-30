import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { VegemexRecap } from "./recap";

/**
 * Página del proyecto Vegemex (cliente). Muestra el resumen de la integración
 * entregada: de la propuesta a la operación real, ya viva en el portal.
 * Español, fuera del nav y sin indexar — se comparte por liga directa.
 * La cotización/propuesta original vive en /vegemex/cotizacion.
 */
export const metadata: Metadata = {
  title: "Vegemex — Integración entregada",
  description:
    "De la propuesta a la operación real: cómo NEWEBD integró toda la operación de Vegemex en el portal y la dejó lista para usarse.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function VegemexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VegemexRecap />;
}
