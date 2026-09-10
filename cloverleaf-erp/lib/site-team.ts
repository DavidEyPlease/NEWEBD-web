/**
 * "Our Team" del sitio público.
 *
 * El contenido NO viene de una fuente viva: se recupero del archivo web despues
 * de que el servidor antiguo quedara fuera de servicio. Las biografias son de la
 * web archivada en agosto de 2022 y las fotos del almacenamiento de la API en
 * febrero de 2023, asi que todo entra como BORRADOR pendiente de revision.
 *
 * El modelo sigue el contrato del panel original (`cloverleaf-admin`):
 * nombre, cargo, biografia, foto, orden y traducciones por idioma.
 */

export type Lang = "en" | "es" | "pt";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

export type Member = {
  id: string;
  order: number;
  name: string;
  position: string;
  /** Biografía por idioma. Solo se recuperó el inglés. */
  bio: Partial<Record<Lang, string>>;
  /** Cargo traducido. Vacío en es/pt: vivía solo en la base de datos perdida. */
  positionI18n: Partial<Record<Lang, string>>;
  photo: string | null;
  published: boolean;
};

/** De dónde salió cada cosa, para poder auditarlo después. */
export const RECOVERY = {
  bios: { source: "web.archive.org — cloverleafaws.com/company", date: "2022-08-19" },
  photos: { source: "web.archive.org — api.cloverleafaws.com/storage/team", date: "2023-02-04" },
};

export const recoveredTeam: Member[] = [
  {
    id: "t1", order: 1, name: "Jason McAlister", position: "President — Global",
    photo: "/team/picture-jason.webp", published: true,
    positionI18n: { en: "President — Global" },
    bio: {
      en: "One of the world's leading experts on meat animal welfare from the beginning to harvest, has been in the industry since the early '90s, working in all areas of production from his start in a small mom and pop shop in rural Iowa. Going on to work with two of the biggest names in the industry. Jason has decades of successful program direction while working with both customers and the government that puts him in a unique position to deliver effective results for your business. Twice featured in Meat and Poultry magazine for his efforts in animal welfare advancement he has also served on advisory committees for multiple national organizations and is a sought after speaker around the world.",
    },
  },
  {
    id: "t2", order: 2, name: "Lauren Davis", position: "Director of Global Operations",
    photo: "/team/picture-lauren.webp", published: true,
    positionI18n: { en: "Director of Global Operations" },
    bio: {
      en: "Lauren graduated with a bachelor's degree in animal science from Kansas State University before working with two of the largest protein harvest companies in the world. Serving in various roles from food safety to animal welfare manager and livestock operations. She has served on the animal welfare committee for national organizations and holds several certifications in training and auditing. Lauren works closely with our successful central and south American harvest plants. Lauren is a trusted name in the animal welfare community around the world.",
    },
  },
  {
    id: "t3", order: 3, name: "Dr. Julia Souto", position: "South American Field Operations Lead",
    photo: "/team/picture-julia.webp", published: true,
    positionI18n: { en: "South American Field Operations Lead" },
    bio: {
      en: "Julia graduated from Sao Paulo state university with a degree in veterinary medicine. She joins our team after multiple years working with some of the largest protein harvest plants in Brazil. She has worked closely with the Federal Inspection Service for process implementation and is well versed in how to get companies in compliance with Federal regulations. Her first-hand knowledge of Federal rules and regulations in Brazil is indispensable for startups and process changes. Julia is also bilingual, fluent in both English and Portuguese.",
    },
  },
  {
    id: "t4", order: 4, name: "Dr. Elein Hernandez", position: "Veterinarian and Animal Welfare Education Specialist",
    photo: "/team/picture-elein.webp", published: true,
    positionI18n: { en: "Veterinarian and Animal Welfare Education Specialist" },
    bio: {
      en: "Dr. Elein Hernandez is a veterinarian and Animal Welfare Specialist with international experience on the application of scientific knowledge to improve animal welfare in practice. She completed her graduate studies on animal welfare in Canada and is a diplomate of the European College of Animal Welfare and Behavioral Medicine. Her aim is to support producers and different stakeholders into creating and implementing animal welfare policies and solutions.",
    },
  },
  {
    id: "t5", order: 5, name: "M. Verónica", position: "",
    photo: "/team/picture-veronica.webp", published: true,
    positionI18n: {},
    bio: {
      en: "Graduated as a veterinarian at the Universidad Mayor, Santiago, Chile in 2013. She decided to change the course of her profession, entering the Master of Ethology and Animal Welfare in 2015, and since 2016 she has been dedicated to training, consulting and animal welfare audits.",
    },
  },
  {
    id: "t6", order: 6, name: "Micah Gwartney", position: "Food Safety Systems Program Director",
    photo: null, published: true,
    positionI18n: { en: "Food Safety Systems Program Director" },
    bio: {
      en: "Micah Gwartney is a meat industry veteran. He has spent the last 15 years working for some of the largest meat producers in the United States, and for small, family run companies. He has focused on food safety and quality in all of those roles. He holds a B.S. degree in Animal Science from North Carolina State University and is completing his M.S. degree in Meat Science from Texas A&M University.",
    },
  },
  {
    id: "t7", order: 7, name: "Liliana S. Batista", position: "Translation and Interpretation Specialist",
    photo: null, published: true,
    positionI18n: { en: "Translation and Interpretation Specialist" },
    bio: {
      en: "Animal Scientist with a master's degree in production at State University of Sao Paulo, currently studying an MBA in International Business in Germany. She worked for more than 15 years in certification bodies as an auditor, quality coordinator, quality director and operations director, always acting in management of certifications, audits of suppliers, training and competence of auditors in Latin America. Lead auditor and instructor of several standards such as BRC, IFS, GlobalG.A.P and Animal Welfare.",
    },
  },
  {
    // Foto real del archivo, sin identificar: no figura en las biografias de
    // 2022, asi que probablemente se incorporo despues. Se deja sin publicar.
    id: "t8", order: 8, name: "", position: "",
    photo: "/team/picture-luna.jpg", published: false,
    positionI18n: {}, bio: {},
  },
];

/** Qué le falta a una ficha para poder publicarse con dignidad. */
export type Gap = "name" | "position" | "bio" | "photo" | "es" | "pt";

export function gapsOf(m: Member): Gap[] {
  const gaps: Gap[] = [];
  if (!m.name.trim()) gaps.push("name");
  if (!m.position.trim()) gaps.push("position");
  if (!m.bio.en?.trim()) gaps.push("bio");
  if (!m.photo) gaps.push("photo");
  if (!m.bio.es?.trim()) gaps.push("es");
  if (!m.bio.pt?.trim()) gaps.push("pt");
  return gaps;
}

export const GAP_LABEL: Record<Gap, string> = {
  name: "No name",
  position: "No position",
  bio: "No biography",
  photo: "No photo",
  es: "Missing Spanish",
  pt: "Missing Portuguese",
};
