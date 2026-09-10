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

/**
 * Versión del contenido semilla. Al subirla, los borradores guardados en el
 * navegador se descartan: si no, quien ya hubiera abierto el gestor seguiría
 * viendo a personas que han salido del equipo.
 */
export const SEED_VERSION = 2;

export const recoveredTeam: Member[] = [
  {
    id: "t1", order: 1, name: "Jason McAlister", position: "President — Global",
    photo: "/team/picture-jason.webp", published: true,
    positionI18n: {
      en: "President — Global",
      es: "Presidente — Global",
      pt: "Presidente — Global",
    },
    bio: {
      en: "One of the world's leading experts on meat animal welfare from the beginning to harvest, has been in the industry since the early '90s, working in all areas of production from his start in a small mom and pop shop in rural Iowa. Going on to work with two of the biggest names in the industry. Jason has decades of successful program direction while working with both customers and the government that puts him in a unique position to deliver effective results for your business. Twice featured in Meat and Poultry magazine for his efforts in animal welfare advancement he has also served on advisory committees for multiple national organizations and is a sought after speaker around the world.",
      es: "Uno de los mayores expertos del mundo en bienestar de animales de carne, desde la cría hasta el sacrificio. Lleva en el sector desde principios de los noventa y ha trabajado en todas las áreas de la producción, empezando en un pequeño negocio familiar del Iowa rural y pasando después por dos de los nombres más grandes de la industria. Jason acumula décadas dirigiendo programas con éxito, tanto con clientes como con la administración, lo que lo sitúa en una posición única para lograr resultados efectivos en su empresa. La revista Meat and Poultry ha destacado en dos ocasiones su labor en favor del bienestar animal; además, ha formado parte de comités asesores de varias organizaciones nacionales y es un ponente solicitado en todo el mundo.",
      pt: "Um dos maiores especialistas do mundo em bem-estar de animais de corte, do nascimento ao abate. Está no setor desde o início dos anos 1990 e já atuou em todas as áreas da produção, começando num pequeno negócio familiar no interior de Iowa e passando depois por dois dos maiores nomes da indústria. Jason acumula décadas de direção bem-sucedida de programas, tanto junto a clientes quanto a órgãos governamentais, o que o coloca numa posição única para entregar resultados efetivos ao seu negócio. A revista Meat and Poultry destacou duas vezes o seu trabalho pelo avanço do bem-estar animal; ele também integrou comitês consultivos de várias organizações nacionais e é um palestrante requisitado em todo o mundo.",
    },
  },
  {
    id: "t3", order: 2, name: "Dr. Julia Souto", position: "South American Field Operations Lead",
    photo: "/team/picture-julia.webp", published: true,
    positionI18n: {
      en: "South American Field Operations Lead",
      es: "Directora de Operaciones de Campo para Sudamérica",
      pt: "Líder de Operações de Campo na América do Sul",
    },
    bio: {
      en: "Julia graduated from Sao Paulo state university with a degree in veterinary medicine. She joins our team after multiple years working with some of the largest protein harvest plants in Brazil. She has worked closely with the Federal Inspection Service for process implementation and is well versed in how to get companies in compliance with Federal regulations. Her first-hand knowledge of Federal rules and regulations in Brazil is indispensable for startups and process changes. Julia is also bilingual, fluent in both English and Portuguese.",
      es: "Julia se licenció en Medicina Veterinaria por la Universidad Estatal de São Paulo. Se incorporó al equipo tras varios años trabajando en algunas de las mayores plantas de sacrificio de Brasil. Ha colaborado estrechamente con el Servicio de Inspección Federal en la implantación de procesos y conoce a fondo cómo llevar a una empresa al cumplimiento de la normativa federal. Su conocimiento de primera mano de las reglas y regulaciones federales brasileñas resulta indispensable en puestas en marcha y cambios de proceso. Julia es bilingüe, con dominio de inglés y portugués.",
      pt: "Julia é formada em Medicina Veterinária pela Universidade Estadual de São Paulo. Integrou a equipe após vários anos atuando em algumas das maiores plantas frigoríficas do Brasil. Trabalhou lado a lado com o Serviço de Inspeção Federal na implantação de processos e conhece a fundo como levar uma empresa à conformidade com a legislação federal. Seu conhecimento de primeira mão das regras e regulamentos federais brasileiros é indispensável em startups e mudanças de processo. Julia é bilíngue, fluente em inglês e português.",
    },
  },
  {
    id: "t5", order: 3, name: "M. Verónica", position: "",
    photo: "/team/picture-veronica.webp", published: true,
    positionI18n: {},
    bio: {
      en: "Graduated as a veterinarian at the Universidad Mayor, Santiago, Chile in 2013. She decided to change the course of her profession, entering the Master of Ethology and Animal Welfare in 2015, and since 2016 she has been dedicated to training, consulting and animal welfare audits.",
      es: "Se tituló como médica veterinaria en la Universidad Mayor de Santiago de Chile en 2013. Decidió reorientar su carrera e ingresó en 2015 al Máster en Etología y Bienestar Animal, y desde 2016 se dedica a la formación, la consultoría y las auditorías de bienestar animal.",
      pt: "Formou-se médica-veterinária pela Universidad Mayor, em Santiago do Chile, em 2013. Decidiu mudar o rumo da profissão e ingressou em 2015 no Mestrado em Etologia e Bem-Estar Animal; desde 2016 dedica-se à formação, à consultoria e a auditorias de bem-estar animal.",
    },
  },
  {
    id: "t6", order: 4, name: "Micah Gwartney", position: "Food Safety Systems Program Director",
    photo: null, published: true,
    positionI18n: {
      en: "Food Safety Systems Program Director",
      es: "Director del Programa de Sistemas de Inocuidad Alimentaria",
      pt: "Diretor do Programa de Sistemas de Segurança de Alimentos",
    },
    bio: {
      en: "Micah Gwartney is a meat industry veteran. He has spent the last 15 years working for some of the largest meat producers in the United States, and for small, family run companies. He has focused on food safety and quality in all of those roles. He holds a B.S. degree in Animal Science from North Carolina State University and is completing his M.S. degree in Meat Science from Texas A&M University.",
      es: "Micah Gwartney es un veterano de la industria cárnica. Ha dedicado los últimos quince años a trabajar tanto para algunos de los mayores productores de carne de Estados Unidos como para pequeñas empresas familiares, siempre centrado en la inocuidad y la calidad alimentaria. Es licenciado en Zootecnia por la Universidad Estatal de Carolina del Norte y está finalizando su máster en Ciencia de la Carne en la Universidad Texas A&M.",
      pt: "Micah Gwartney é um veterano da indústria da carne. Dedicou os últimos quinze anos a trabalhar tanto para alguns dos maiores produtores de carne dos Estados Unidos quanto para pequenas empresas familiares, sempre com foco em segurança e qualidade de alimentos. É bacharel em Zootecnia pela Universidade Estadual da Carolina do Norte e está concluindo o mestrado em Ciência da Carne na Universidade Texas A&M.",
    },
  },
  {
    id: "t7", order: 5, name: "Liliana S. Batista", position: "Translation and Interpretation Specialist",
    photo: null, published: true,
    positionI18n: {
      en: "Translation and Interpretation Specialist",
      es: "Especialista en Traducción e Interpretación",
      pt: "Especialista em Tradução e Interpretação",
    },
    bio: {
      en: "Animal Scientist with a master's degree in production at State University of Sao Paulo, currently studying an MBA in International Business in Germany. She worked for more than 15 years in certification bodies as an auditor, quality coordinator, quality director and operations director, always acting in management of certifications, audits of suppliers, training and competence of auditors in Latin America. Lead auditor and instructor of several standards such as BRC, IFS, GlobalG.A.P and Animal Welfare.",
      es: "Zootecnista con máster en producción por la Universidad Estatal de São Paulo, actualmente cursando un MBA en Negocios Internacionales en Alemania. Trabajó más de quince años en organismos de certificación como auditora, coordinadora de calidad, directora de calidad y directora de operaciones, siempre en la gestión de certificaciones, auditorías de proveedores, formación y competencia de auditores en América Latina. Es auditora líder e instructora de varios estándares, entre ellos BRC, IFS, GlobalG.A.P. y Bienestar Animal.",
      pt: "Zootecnista com mestrado em produção pela Universidade Estadual de São Paulo, atualmente cursando um MBA em Negócios Internacionais na Alemanha. Trabalhou mais de quinze anos em organismos de certificação como auditora, coordenadora da qualidade, diretora da qualidade e diretora de operações, sempre na gestão de certificações, auditorias de fornecedores, treinamento e competência de auditores na América Latina. É auditora líder e instrutora de diversos padrões, como BRC, IFS, GlobalG.A.P. e Bem-Estar Animal.",
    },
  },
  {
    // Foto real del archivo, sin identificar: no figura en las biografias de
    // 2022, asi que probablemente se incorporo despues. Se deja sin publicar.
    id: "t8", order: 6, name: "", position: "",
    photo: "/team/picture-luna.jpg", published: false,
    positionI18n: {}, bio: {},
  },
];

/** Ficha en blanco para dar de alta a alguien nuevo. */
export function blankMember(order: number): Member {
  return {
    id: `t${Date.now()}`,
    order,
    name: "",
    position: "",
    bio: {},
    positionI18n: {},
    photo: null,
    published: false,
  };
}

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
