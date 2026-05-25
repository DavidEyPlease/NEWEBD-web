export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  url: string;
  tagline: string;
  description: string;
  categories: string[];
  metrics?: { value: string; label: string }[];
  featured?: boolean;
  challenge: string;
  solution: string;
  result: string;
  whyItMatters?: string;
  location?: string;
  established?: string;
};

type LocaleKey = "es" | "en";

const CASES_ES: CaseStudy[] = [
  {
    slug: "eyplease",
    client: "Eyplease",
    industry: "SaaS para ventas directas",
    url: "https://eyplease.com.mx/",
    tagline: "Plataforma SaaS que ahorra 72 horas a sus usuarios.",
    description:
      "Apps iOS/Android + backend que generan a escala materiales personalizados para directoras y consultoras. Automatización avant la lettre.",
    categories: ["Aplicaciones a Medida", "Sistemas Empresariales", "Soluciones de IA"],
    metrics: [
      { value: "72h", label: "Ahorradas al 90% de clientes" },
      { value: "+2M", label: "Diseños generados" },
      { value: "50K", label: "Entregas mensuales" },
    ],
    featured: true,
    challenge:
      "Las directoras de venta directa (cliente principal: Mary Kay) pierden horas semanales armando materiales motivacionales, boletines, reconocimientos e invitaciones de forma manual. Necesitaban una plataforma que generara todo ese contenido personalizado a escala.",
    solution:
      "Plataforma SaaS con apps nativas iOS/Android + backend de generación automatizada de materiales. Sistema interno de administración del negocio, catálogo de plantillas, personalización con logos y fotos del cliente, entregas express.",
    result:
      "72 horas ahorradas al 90% de los clientes, más de 2 millones de diseños generados, 50,000 entregas mensuales. Entregas el mismo día si la orden entra antes de las 11 am.",
    whyItMatters:
      "Demuestra que construimos producto SaaS real con impacto medible y automatización a escala. Es el puente directo hacia la oferta actual de automatizaciones inteligentes y agentes personalizados.",
  },
  {
    slug: "myanosa",
    client: "Myanosa",
    industry: "Mobiliario premium para hotelería",
    url: "https://myanosa.mx/",
    tagline: "Web premium al nivel de Nobu, Marriott y Vidanta.",
    description:
      "SPA moderna multilingüe ES/EN para una empresa con 44+ años de trayectoria. Tres verticales claras, prueba social impecable.",
    categories: ["Desarrollo Web"],
    location: "Culiacán, Sinaloa",
    established: "1982",
    challenge:
      "Empresa con 4 décadas de trayectoria y portafolio que incluye hoteles de gama altísima (Nobu, Marriott, Vidanta) necesitaba una presencia digital que comunicara calidad y prestigio al nivel de sus clientes premium, organizando 3 verticales (hotelería, comercial, residencial) sin saturar al visitante.",
    solution:
      "Sitio web institucional construido como SPA moderna (no plantilla genérica), arquitectura clara por las 3 verticales con galerías independientes, sección de historia destacando a la fundadora, footer con datos de contacto directo y muro de clientes-logo que funciona como prueba social. Multilingüe español/inglés. Portafolio descargable en PDF.",
    result:
      "El sitio exhibe 6 logos de clientes de élite — SREGIS, Solaz Resort, Grupo Vidanta, Nobu Los Cabos, Pueblo Bonito y Marriott. Para visitantes B2B (desarrolladores hoteleros, arquitectos), este muro es la conversión instantánea.",
    whyItMatters:
      "Caso ideal para vender el ángulo 'web premium que comunica al nivel del cliente'. Permite mostrar capacidad de trabajar con marcas exigentes y construir sitios técnicamente modernos (SPA, multilingüe) con narrativa visual cuidada.",
  },
  {
    slug: "vegemex",
    client: "Vegemex",
    industry: "Horticultura y agroexportación",
    url: "https://vegemex.com.mx/",
    tagline: "Web institucional + sistema interno para 3 marcas integradas.",
    description:
      "Ecosistema digital para una empresa con cadena de suministro integral, certificaciones internacionales y operación en 4 regiones.",
    categories: ["Desarrollo Web", "Sistemas Empresariales"],
    challenge:
      "Empresa con cadena de suministro integral (siembra → empaque → distribución), 3 marcas integradas (Vegemex, Agrolep IC, Casamex Produce), 4 regiones de operación, certificaciones internacionales (Primus GFS, GLOBAL G.A.P, USDA Organic, Fair Trade) y clientes nacionales e internacionales. Necesitaba presencia web sólida + un sistema interno para administrar la operación.",
    solution:
      "Sitio web institucional que comunica el ecosistema de 3 marcas, productos (11 vegetales principales), regiones de operación, certificaciones y sostenibilidad. En paralelo, sistema interno de administración del negocio.",
    result:
      "Sitio con catálogo claro de productos, marcas y certificaciones; sistema interno operativo para la gestión del negocio.",
  },
  {
    slug: "cloverleafaws",
    client: "CloverleafAWS",
    industry: "Certificación de bienestar animal",
    url: "https://www.cloverleafaws.com/",
    tagline: "Presencia digital multilingüe para mercado internacional.",
    description:
      "Sitio trilingüe (EN/ES/PT) que comunica autoridad técnica de certificaciones ISO TS34700 y California Prop 12.",
    categories: ["Desarrollo Web"],
    challenge:
      "Comunicar autoridad técnica y científica de certificaciones (ISO TS34700, California Prop 12) a productores y distribuidores internacionales de carne, huevos y lácteos.",
    solution:
      "Sitio web multilingüe (inglés, español, portugués) con iconografía clara por especie animal certificada (cerdos, aves, vacuno, ovinos, caprinos, acuicultura), formularios de contacto integrados, diseño responsivo enfocado en transparencia y ciencia basada.",
    result:
      "Presencia digital lista para mercado internacional con sistema multilingüe funcionando.",
  },
  {
    slug: "american-english",
    client: "American English Academy",
    industry: "Educación / Escuelas de idiomas",
    url: "https://americanenglish.mx/",
    tagline: "30+ años de trayectoria, presencia digital actualizada.",
    description:
      "Web institucional con calendario de inscripciones, sección de empleo y muro de empleadores como prueba social.",
    categories: ["Desarrollo Web"],
    location: "Guaymas, Sonora",
    established: "1995",
    challenge:
      "Academia con 30+ años de trayectoria que necesitaba actualizar su presencia digital para conectar con estudiantes que buscan inglés para entornos laborales (turismo, comercio, industria) y académicos.",
    solution:
      "Web institucional con calendario visual interactivo de inscripciones, sección de empleo destacada, carrusel de logos donde trabajan y estudian sus egresados (Nordson, BAE Systems, Tec de Monterrey, UANL), botón flotante de WhatsApp y conexión a portal estudiantil externo.",
    result:
      "Sitio que comunica trayectoria y empleabilidad de los egresados como prueba social principal.",
  },
];

const CASES_EN: CaseStudy[] = [
  {
    slug: "eyplease",
    client: "Eyplease",
    industry: "SaaS for direct sales",
    url: "https://eyplease.com.mx/",
    tagline: "SaaS platform that saves users 72 hours.",
    description:
      "iOS/Android apps + backend that generate personalized materials at scale for directors and consultants. Automation ahead of its time.",
    categories: ["Custom Applications", "Enterprise Systems", "AI Solutions"],
    metrics: [
      { value: "72h", label: "Saved for 90% of customers" },
      { value: "+2M", label: "Designs generated" },
      { value: "50K", label: "Monthly deliveries" },
    ],
    featured: true,
    challenge:
      "Direct sales directors (main client: Mary Kay) lose weekly hours manually assembling motivational materials, newsletters, recognitions and invitations. They needed a platform to generate all that personalized content at scale.",
    solution:
      "SaaS platform with native iOS/Android apps + automated materials generation backend. Internal business admin system, template catalog, personalization with client logos and photos, express deliveries.",
    result:
      "72 hours saved for 90% of customers, more than 2 million designs generated, 50,000 monthly deliveries. Same-day delivery if the order comes in before 11am.",
    whyItMatters:
      "Proves we build real SaaS product with measurable impact and automation at scale. It's the direct bridge to our current offer of smart automations and custom agents.",
  },
  {
    slug: "myanosa",
    client: "Myanosa",
    industry: "Premium hospitality furniture",
    url: "https://myanosa.mx/",
    tagline: "Premium website at the level of Nobu, Marriott and Vidanta.",
    description:
      "Modern bilingual ES/EN SPA for a company with 44+ years of track record. Three clear verticals, impeccable social proof.",
    categories: ["Web Development"],
    location: "Culiacán, Sinaloa",
    established: "1982",
    challenge:
      "A company with 4 decades of track record and a portfolio that includes top-tier hotels (Nobu, Marriott, Vidanta) needed a digital presence that communicated quality and prestige at their premium clients' level, organizing 3 verticals (hospitality, commercial, residential) without saturating the visitor.",
    solution:
      "Institutional website built as a modern SPA (not a generic template), clear architecture per the 3 verticals with independent galleries, history section highlighting the founder, footer with direct contact details and a client-logo wall serving as social proof. Spanish/English bilingual. Downloadable PDF portfolio.",
    result:
      "The site showcases 6 elite client logos — SREGIS, Solaz Resort, Grupo Vidanta, Nobu Los Cabos, Pueblo Bonito and Marriott. For B2B visitors (hotel developers, architects), this wall is instant conversion.",
    whyItMatters:
      "Ideal case to sell the 'premium website that speaks at the client's level' angle. Demonstrates capability to work with demanding brands and build technically modern sites (SPA, multilingual) with carefully crafted visual narrative.",
  },
  {
    slug: "vegemex",
    client: "Vegemex",
    industry: "Horticulture and agro-exports",
    url: "https://vegemex.com.mx/",
    tagline: "Institutional website + internal system for 3 integrated brands.",
    description:
      "Digital ecosystem for a company with integrated supply chain, international certifications and operations across 4 regions.",
    categories: ["Web Development", "Enterprise Systems"],
    challenge:
      "Company with integrated supply chain (planting → packing → distribution), 3 integrated brands (Vegemex, Agrolep IC, Casamex Produce), 4 operating regions, international certifications (Primus GFS, GLOBAL G.A.P, USDA Organic, Fair Trade) and national and international clients. Needed solid web presence + an internal system to manage operations.",
    solution:
      "Institutional website that communicates the 3-brand ecosystem, products (11 main vegetables), operating regions, certifications and sustainability. In parallel, an internal business administration system.",
    result:
      "Site with clear catalog of products, brands and certifications; operational internal system for business management.",
  },
  {
    slug: "cloverleafaws",
    client: "CloverleafAWS",
    industry: "Animal welfare certification",
    url: "https://www.cloverleafaws.com/",
    tagline: "Multilingual digital presence for international market.",
    description:
      "Trilingual site (EN/ES/PT) that communicates technical authority for ISO TS34700 and California Prop 12 certifications.",
    categories: ["Web Development"],
    challenge:
      "Communicate technical and scientific authority of certifications (ISO TS34700, California Prop 12) to international producers and distributors of meat, eggs and dairy.",
    solution:
      "Multilingual website (English, Spanish, Portuguese) with clear iconography per certified animal species (pigs, poultry, cattle, sheep, goats, aquaculture), integrated contact forms, responsive design focused on transparency and science-based content.",
    result:
      "Digital presence ready for international market with a working multilingual system.",
  },
  {
    slug: "american-english",
    client: "American English Academy",
    industry: "Education / Language schools",
    url: "https://americanenglish.mx/",
    tagline: "30+ years of track record, updated digital presence.",
    description:
      "Institutional website with enrollment calendar, jobs section and employer wall as social proof.",
    categories: ["Web Development"],
    location: "Guaymas, Sonora",
    established: "1995",
    challenge:
      "Academy with 30+ years of track record that needed to update its digital presence to connect with students looking for English in work environments (tourism, commerce, industry) and academic ones.",
    solution:
      "Institutional website with interactive visual enrollment calendar, featured jobs section, carousel of logos where graduates work and study (Nordson, BAE Systems, Tec de Monterrey, UANL), floating WhatsApp button and connection to external student portal.",
    result:
      "Site that communicates track record and graduate employability as the main social proof.",
  },
];

const CATALOG: Record<LocaleKey, CaseStudy[]> = {
  es: CASES_ES,
  en: CASES_EN,
};

export function getCases(locale: string): CaseStudy[] {
  return CATALOG[(locale as LocaleKey) in CATALOG ? (locale as LocaleKey) : "es"];
}

export function getFeaturedCase(locale: string): CaseStudy {
  const cases = getCases(locale);
  return cases.find((c) => c.featured) ?? cases[0];
}

export function getOtherCases(locale: string): CaseStudy[] {
  return getCases(locale).filter((c) => !c.featured);
}

export function getCaseBySlug(slug: string, locale: string = "es"): CaseStudy | undefined {
  return getCases(locale).find((c) => c.slug === slug);
}

/** @deprecated Usar `getCases(locale)` en su lugar. */
export const CASES = CASES_ES;
/** @deprecated Usar `getFeaturedCase(locale)`. */
export const FEATURED_CASE = CASES_ES.find((c) => c.featured) ?? CASES_ES[0];
/** @deprecated Usar `getOtherCases(locale)`. */
export const OTHER_CASES = CASES_ES.filter((c) => !c.featured);
