export type Client = {
  name: string;
  slug: string;
  url?: string;
};

/**
 * Clientes directos de NEWEBD — usados en el muro de prueba social de la home.
 * Cada uno corresponde a un caso del portafolio.
 */
export const DIRECT_CLIENTS: Client[] = [
  { name: "Eyplease", slug: "eyplease", url: "https://eyplease.com.mx/" },
  { name: "Myanosa", slug: "myanosa", url: "https://myanosa.mx/" },
  { name: "Vegemex", slug: "vegemex", url: "https://vegemex.com.mx/" },
  { name: "CloverleafAWS", slug: "cloverleafaws", url: "https://www.cloverleafaws.com/" },
  { name: "American English", slug: "american-english", url: "https://americanenglish.mx/" },
];
