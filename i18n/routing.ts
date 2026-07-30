import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"] as const,
  defaultLocale: "es",
  // Español sin prefijo, inglés bajo /en/.
  localePrefix: "as-needed",
  // Slugs traducidos por idioma.
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      en: "/services",
    },
    "/portafolio": {
      es: "/portafolio",
      en: "/portfolio",
    },
    "/portafolio/[slug]": {
      es: "/portafolio/[slug]",
      en: "/portfolio/[slug]",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
    // Página del proyecto Vegemex (no indexada, se comparte por liga)
    "/vegemex": {
      es: "/vegemex",
      en: "/vegemex",
    },
    // Cotización/propuesta original, preservada como sub-ruta
    "/vegemex/cotizacion": {
      es: "/vegemex/cotizacion",
      en: "/vegemex/cotizacion",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
