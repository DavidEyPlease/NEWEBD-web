/**
 * Páginas del sitio de CloverLeaf disponibles para revisar y anotar.
 * Las capturas se regeneran con `node scripts/capture-site.mjs` cuando el
 * sitio cambia; las dimensiones son las de la captura a 1440px de ancho.
 */
export type SitePage = {
  slug: string;
  title: string;
  url: string;
  image: string;
  width: number;
  height: number;
};

export const sitePages: SitePage[] = [
  { slug: "home", title: "Home", url: "https://cloverleafaws.com/", image: "/site/home.jpeg", width: 1440, height: 5029 },
  { slug: "about-us", title: "About Us", url: "https://cloverleafaws.com/about-us", image: "/site/about-us.jpeg", width: 1440, height: 2055 },
  { slug: "auditing-services", title: "Auditing Services", url: "https://cloverleafaws.com/auditing-services", image: "/site/auditing-services.jpeg", width: 1440, height: 3688 },
  { slug: "certified-care", title: "Certified Care", url: "https://cloverleafaws.com/certified-care", image: "/site/certified-care.jpeg", width: 1440, height: 5423 },
  { slug: "contact-us", title: "Contact Us", url: "https://cloverleafaws.com/contact-us", image: "/site/contact-us.jpeg", width: 1440, height: 995 },
];

/** Tipos de nota, con el color que los distingue en la lista. */
export const NOTE_KINDS = [
  { id: "change", label: "Change request", tone: "b-info" },
  { id: "copy", label: "Copy / wording", tone: "b-mute" },
  { id: "bug", label: "Something's broken", tone: "b-crit" },
  { id: "question", label: "Question", tone: "b-warn" },
] as const;

export type NoteKind = (typeof NOTE_KINDS)[number]["id"];

/**
 * Una nota sobre el sitio. Los campos siguen el modelo que ya usa la
 * plataforma de clientes de NEWEBD (page_url, viewport, scroll, screenshot),
 * para que al conectar el backend real encajen sin traducción.
 */
export type SiteNote = {
  id: string;
  pageSlug: string;
  pageUrl: string;
  kind: NoteKind;
  text: string;
  /** Región marcada, en coordenadas reales de la página capturada. */
  region: { x: number; y: number; w: number; h: number };
  /** Recorte de esa región, en JPEG base64. */
  thumb: string;
  viewport: { width: number; height: number };
  createdAt: string;
  author: string;
  status: "Draft" | "Queued";
};
