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
    // Página de propuesta para cliente (no indexada, se comparte por liga)
    "/vegemex": {
      es: "/vegemex",
      en: "/vegemex",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
