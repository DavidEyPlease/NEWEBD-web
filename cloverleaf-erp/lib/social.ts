/**
 * Redes sociales de CloverLeaf — datos de muestra.
 *
 * Las cuentas son las reales del cliente (enlazadas desde su sitio), pero las
 * publicaciones, cifras y el calendario son de ejemplo: conectar Facebook e
 * Instagram de verdad requiere la API de Meta y su revisión de la aplicación.
 * Las fotos son las de su propio sitio web.
 */

export type Network = "facebook" | "instagram";
export type Lang = "en" | "es" | "pt";

export const NETWORKS: Record<Network, { label: string; handle: string; url: string; followers: number }> = {
  facebook: { label: "Facebook", handle: "CloverLeaf AWS", url: "https://www.facebook.com/cloverleafaws", followers: 2840 },
  instagram: { label: "Instagram", handle: "@cloverleafaws", url: "https://www.instagram.com/cloverleafaws", followers: 1960 },
};

export type Post = {
  id: string;
  network: Network;
  date: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  /** Compartidos en Facebook, guardados en Instagram. */
  third: number;
  reach: number;
};

export const posts: Post[] = [
  { id: "p1", network: "instagram", date: "2026-09-08", image: "/social/cow.webp", likes: 214, comments: 18, third: 31, reach: 3900,
    caption: "Comfort you can measure. Every Certified Care™ audit checks space, footing and access to feed and water — because welfare is something we verify, not something we assume. #AnimalWelfare #CertifiedCare" },
  { id: "p2", network: "facebook", date: "2026-09-05", image: "/social/pigs.webp", likes: 96, comments: 12, third: 22, reach: 5200,
    caption: "Selling pork into California? Prop 12 applies to products sold in the state, wherever they were raised. Our team walks producers through what the audit covers and how to prepare." },
  { id: "p3", network: "instagram", date: "2026-09-02", image: "/social/hen.webp", likes: 187, comments: 9, third: 24, reach: 3100,
    caption: "Room to move, perch and nest. What cage-free really means on the farm floor — and what our auditors look for. #CageFree #Poultry" },
  { id: "p4", network: "facebook", date: "2026-08-28", image: "/social/cattle.webp", likes: 74, comments: 6, third: 15, reach: 4100,
    caption: "From beef to dairy, our auditors assess handling, housing and health records against science-based standards. Welfare done right is good for animals and good for business." },
  { id: "p5", network: "instagram", date: "2026-08-24", image: "/social/fish.webp", likes: 142, comments: 7, third: 19, reach: 2600,
    caption: "Welfare doesn't stop at the barn door. Aquaculture audits look at water quality, stocking density and handling. #Aquaculture #AnimalWelfare" },
  { id: "p6", network: "facebook", date: "2026-08-19", image: "/social/chicken-man.webp", likes: 121, comments: 14, third: 28, reach: 6300,
    caption: "Behind every certificate is an auditor on the ground. Meet the people who make welfare verifiable — across four continents." },
  { id: "p7", network: "instagram", date: "2026-08-14", image: "/social/goat.webp", likes: 133, comments: 5, third: 12, reach: 2300,
    caption: "Sheep and goats deserve standards too. Our programs cover small ruminants with the same rigor. #SheepAndGoats #CertifiedCare" },
  { id: "p8", network: "facebook", date: "2026-08-09", image: "/social/certified.webp", likes: 88, comments: 9, third: 17, reach: 3700,
    caption: "What the Certified Care™ label tells your buyers: an independent audit, a verified standard, and a certificate anyone can check." },
];

export type CalItem = {
  id: string;
  network: Network;
  date: string;
  time: string;
  title: string;
  status: "Published" | "Scheduled" | "Draft" | "Needs approval";
};

export const scheduled: CalItem[] = [
  { id: "s1", network: "facebook", date: "2026-09-15", time: "9:00 AM", title: "Prop 12 audit season is open", status: "Needs approval" },
  { id: "s2", network: "instagram", date: "2026-09-15", time: "12:30 PM", title: "Prop 12 audit season is open", status: "Needs approval" },
  { id: "s3", network: "instagram", date: "2026-09-18", time: "12:30 PM", title: "Behind the audit: a day with our field team", status: "Scheduled" },
  { id: "s4", network: "facebook", date: "2026-09-22", time: "9:00 AM", title: "Remote Video Auditing, explained", status: "Scheduled" },
  { id: "s5", network: "instagram", date: "2026-09-24", time: "12:30 PM", title: "Aquaculture: what we measure", status: "Draft" },
  { id: "s6", network: "facebook", date: "2026-09-29", time: "9:00 AM", title: "How to read a CloverLeaf certificate", status: "Scheduled" },
  { id: "s7", network: "instagram", date: "2026-10-02", time: "12:30 PM", title: "Cage-free: myths vs facts", status: "Draft" },
  { id: "s8", network: "facebook", date: "2026-10-07", time: "9:00 AM", title: "Training programs for farm teams", status: "Draft" },
];

/** Todo lo que va al calendario: lo publicado y lo que viene. */
export const calendarItems: CalItem[] = [
  ...posts.map((p) => ({
    id: p.id, network: p.network, date: p.date, time: "",
    title: p.caption.split(/[.—?]/)[0].slice(0, 46),
    status: "Published" as const,
  })),
  ...scheduled,
];

// --- Ejemplo del asistente de IA --------------------------------------------

export const aiBrief = "Prop 12 audit season is open — invite producers selling into California to schedule early.";

export const aiSteps = [
  "Reading your last 30 posts to match your voice",
  "Checking which formats performed best on each network",
  "Drafting one version for Facebook and one for Instagram",
  "Translating to Spanish and Portuguese, like your website",
  "Choosing the best time to publish",
];

export const aiOutputs: Record<Network, { image: string; best: string; hashtags: string; caption: Record<Lang, string> }> = {
  facebook: {
    image: "/social/pigs.webp",
    best: "Tue · 9:00 AM (CT)",
    hashtags: "#Prop12 #AnimalWelfare #CertifiedCare",
    caption: {
      en: "California's Prop 12 applies to pork, veal and egg products sold in the state — wherever they were raised. Our audit calendar for the coming season is now open. Producers who schedule early get their preferred dates and more time to close any findings before the certification decision. Message us to book your audit.",
      es: "La Proposición 12 de California aplica a la carne de cerdo, ternera y huevo que se vende en el estado, sin importar dónde se produjo. Ya abrimos el calendario de auditorías para la próxima temporada. Quienes agendan temprano eligen sus fechas y tienen más tiempo para cerrar hallazgos antes de la decisión de certificación. Escríbenos para agendar tu auditoría.",
      pt: "A Proposição 12 da Califórnia vale para carne suína, vitela e ovos vendidos no estado, independentemente de onde foram produzidos. O calendário de auditorias da próxima temporada já está aberto. Quem agenda cedo escolhe as datas e ganha mais tempo para fechar não conformidades antes da decisão de certificação. Fale conosco para agendar sua auditoria.",
    },
  },
  instagram: {
    image: "/social/hen.webp",
    best: "Wed · 12:30 PM (CT)",
    hashtags: "#Prop12 #AnimalWelfare #CageFree #PorkProducers #CertifiedCare",
    caption: {
      en: "Prop 12 audit season is open 📅 Schedule early, pick your dates, and give your team time to close findings before certification. Link in bio.",
      es: "Abrió la temporada de auditorías Prop 12 📅 Agenda temprano, elige tus fechas y dale tiempo a tu equipo para cerrar hallazgos antes de la certificación. Enlace en la bio.",
      pt: "A temporada de auditorias Prop 12 começou 📅 Agende cedo, escolha suas datas e dê tempo à sua equipe para fechar não conformidades antes da certificação. Link na bio.",
    },
  },
};
