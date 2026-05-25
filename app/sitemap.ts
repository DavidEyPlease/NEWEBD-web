import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getCases } from "@/lib/content/cases";

const BASE = "https://newebd.com";
const NOW = new Date();

/**
 * Sitemap dinámico que enumera todas las rutas en ambos idiomas
 * con sus alternates para SEO multilingüe (hreflang).
 *
 * Next.js detecta este archivo y sirve /sitemap.xml automáticamente.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { es: "/", en: "/en", priority: 1.0, changeFrequency: "monthly" as const },
    {
      es: "/servicios",
      en: "/en/services",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      es: "/portafolio",
      en: "/en/portfolio",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      es: "/contacto",
      en: "/en/contact",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
  ];

  // Casos individuales del portafolio
  const cases = getCases("es");
  for (const c of cases) {
    routes.push({
      es: `/portafolio/${c.slug}`,
      en: `/en/portfolio/${c.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    });
  }

  return routes.flatMap((r) => [
    {
      url: `${BASE}${r.es}`,
      lastModified: NOW,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          "es-MX": `${BASE}${r.es}`,
          "en-US": `${BASE}${r.en}`,
          "x-default": `${BASE}${r.es}`,
        },
      },
    },
    {
      url: `${BASE}${r.en}`,
      lastModified: NOW,
      changeFrequency: r.changeFrequency,
      priority: r.priority * 0.95,
      alternates: {
        languages: {
          "es-MX": `${BASE}${r.es}`,
          "en-US": `${BASE}${r.en}`,
          "x-default": `${BASE}${r.es}`,
        },
      },
    },
  ]);
}

// Silenciar warning de routing import unused.
void routing;
