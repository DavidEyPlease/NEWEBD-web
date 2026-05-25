import type { CaseStudy } from "@/lib/content/cases";
import type { ServiceCategory } from "@/lib/content/services";

/**
 * Schema.org JSON-LD para SEO. Se serializa como <script type="application/ld+json">
 * dentro de <head> y Google lo lee para entender la entidad/página.
 *
 * Validador oficial: https://search.google.com/test/rich-results
 */

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NEWEBD",
    alternateName: "NEWEBD — El nuevo desarrollo web es con IA",
    url: "https://newebd.com",
    logo: "https://newebd.com/brand/isotipo.png",
    description:
      locale === "en"
        ? "We integrate AI into your business so you grow, save time and money. Custom websites, apps, systems and agents."
        : "Integramos IA en tu negocio para que crezcas, ahorres tiempo y dinero. Webs, apps, sistemas y agentes a la medida.",
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MX",
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hola@newebd.com",
        availableLanguage: ["Spanish", "English"],
        areaServed: ["MX", "US"],
      },
    ],
    sameAs: [
      // Cuando confirmes handles oficiales agregar:
      // "https://www.linkedin.com/company/newebd",
      // "https://twitter.com/newebd",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const url = locale === "en" ? "https://newebd.com/en" : "https://newebd.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NEWEBD",
    url,
    inLanguage: locale === "en" ? "en-US" : "es-MX",
    publisher: { "@type": "Organization", name: "NEWEBD" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  service,
  locale,
}: {
  service: ServiceCategory;
  locale: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "NEWEBD" },
    areaServed: ["MX", "US"],
    inLanguage: locale === "en" ? "en-US" : "es-MX",
    url:
      locale === "en"
        ? `https://newebd.com/en/services#${service.slug}`
        : `https://newebd.com/servicios#${service.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CaseStudyJsonLd({
  caseStudy,
  locale,
}: {
  caseStudy: CaseStudy;
  locale: string;
}) {
  const url =
    locale === "en"
      ? `https://newebd.com/en/portfolio/${caseStudy.slug}`
      : `https://newebd.com/portafolio/${caseStudy.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseStudy.client} — ${caseStudy.tagline}`,
    description: caseStudy.description,
    inLanguage: locale === "en" ? "en-US" : "es-MX",
    url,
    author: { "@type": "Organization", name: "NEWEBD" },
    publisher: {
      "@type": "Organization",
      name: "NEWEBD",
      logo: {
        "@type": "ImageObject",
        url: "https://newebd.com/brand/isotipo.png",
      },
    },
    about: {
      "@type": "Service",
      name: caseStudy.industry,
    },
    mainEntity: {
      "@type": "CreativeWork",
      name: caseStudy.client,
      about: caseStudy.industry,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
