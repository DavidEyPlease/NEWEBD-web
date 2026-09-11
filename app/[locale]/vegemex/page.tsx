import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { hasLocale } from "next-intl";

import { routing, type Locale } from "@/i18n/routing";

import { VEGEMEX_COPY } from "./copy";
import { VegemexRecap } from "./recap";

/**
 * Página del proyecto Vegemex (cliente). Muestra el resumen de la integración
 * entregada: de la propuesta a la operación real, ya viva en el portal.
 * Disponible en español (/vegemex) e inglés (/en/vegemex) — Vegemex exporta y
 * comparte esta liga con contrapartes que no hablan español.
 * Fuera del nav y sin indexar: se comparte por liga directa.
 * La cotización/propuesta original vive en /vegemex/cotizacion (solo español).
 */

type Props = { params: Promise<{ locale: string }> };

function resolveLocale(locale: string): Locale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = VEGEMEX_COPY[resolveLocale(locale)];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical:
        locale === "en"
          ? "https://newebd.com/en/vegemex"
          : "https://newebd.com/vegemex",
      languages: {
        "es-MX": "https://newebd.com/vegemex",
        "en-US": "https://newebd.com/en/vegemex",
        "x-default": "https://newebd.com/vegemex",
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function VegemexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VegemexRecap locale={resolveLocale(locale)} />;
}
