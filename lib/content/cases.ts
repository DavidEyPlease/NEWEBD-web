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
  // Detalle extendido para /portafolio/[slug]
  challenge: string;
  solution: string;
  result: string;
  whyItMatters?: string;
  location?: string;
  established?: string;
};

export const CASES: CaseStudy[] = [
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

export const FEATURED_CASE = CASES.find((c) => c.featured) ?? CASES[0];
export const OTHER_CASES = CASES.filter((c) => !c.featured);

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
