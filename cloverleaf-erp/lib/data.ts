/**
 * Datos de muestra del ERP de CloverLeaf.
 *
 * Todo es ficticio pero coherente: los certificados cuadran con sus auditorías,
 * los hallazgos con sus instalaciones y los auditores con las especies que
 * están calificados para auditar. La demo no tiene backend — este archivo es
 * la única fuente de datos.
 */

export type Species = "Swine" | "Beef & Dairy Cattle" | "Poultry" | "Sheep & Goats" | "Aquaculture";
export type Program = "Certified Care" | "Prop 12" | "3rd Party Auditing" | "Remote Video Auditing" | "Training";

export const SPECIES: Species[] = ["Swine", "Beef & Dairy Cattle", "Poultry", "Sheep & Goats", "Aquaculture"];

export type Facility = {
  id: string;
  clientId: string;
  name: string;
  location: string;
  species: Species;
  capacity: string;
  status: "Certified" | "In process" | "Suspended" | "Not certified";
};

export type Client = {
  id: string;
  name: string;
  country: string;
  contact: string;
  email: string;
  since: string;
  programs: Program[];
};

export type Auditor = {
  id: string;
  name: string;
  base: string;
  species: Species[];
  credential: string;
  credentialExpires: string;
  audits12m: number;
};

export type Audit = {
  id: string;
  code: string;
  facilityId: string;
  auditorId: string;
  program: Program;
  type: "On-site" | "Remote video";
  date: string;
  status: "Scheduled" | "In progress" | "Report due" | "Closed";
  score?: number;
  standard: string;
};

export type Finding = {
  id: string;
  auditId: string;
  clause: string;
  severity: "Critical" | "Major" | "Minor" | "Observation";
  summary: string;
  status: "Open" | "CAPA submitted" | "Verified" | "Closed";
  due: string;
};

export type Certificate = {
  id: string;
  number: string;
  facilityId: string;
  program: Program;
  issued: string;
  expires: string;
  status: "Active" | "Expiring" | "Suspended" | "Withdrawn";
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  country: string;
  subject: Program | "Other";
  source: string;
  campaign: string;
  received: string;
  stage: "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";
};

export const clients: Client[] = [
  { id: "c1", name: "Prairie Ridge Pork", country: "United States", contact: "Karen Whitfield", email: "kwhitfield@prairieridge.example", since: "2023-04-11", programs: ["Certified Care", "Prop 12"] },
  { id: "c2", name: "Blue Valley Dairy Co.", country: "United States", contact: "Tom Brennan", email: "tbrennan@bluevalley.example", since: "2024-01-22", programs: ["Certified Care"] },
  { id: "c3", name: "Granjas del Bajío", country: "Mexico", contact: "Alejandra Ruiz", email: "aruiz@granjasbajio.example", since: "2024-06-03", programs: ["Certified Care", "3rd Party Auditing"] },
  { id: "c4", name: "Northwind Poultry Group", country: "Canada", contact: "S. Okafor", email: "sokafor@northwind.example", since: "2022-09-15", programs: ["Certified Care", "Remote Video Auditing"] },
  { id: "c5", name: "Aurora Salmon Farms", country: "Chile", contact: "Matías Solar", email: "msolar@aurorasalmon.example", since: "2025-02-27", programs: ["3rd Party Auditing"] },
  { id: "c6", name: "Highland Sheep Cooperative", country: "United States", contact: "Rachel Lindqvist", email: "rlindqvist@highlandsheep.example", since: "2025-08-19", programs: ["Certified Care"] },
];

export const facilities: Facility[] = [
  { id: "f1", clientId: "c1", name: "Prairie Ridge — Site 4", location: "Carroll, Iowa", species: "Swine", capacity: "6,400 sows", status: "Certified" },
  { id: "f2", clientId: "c1", name: "Prairie Ridge — Site 7", location: "Sac City, Iowa", species: "Swine", capacity: "4,900 sows", status: "In process" },
  { id: "f3", clientId: "c2", name: "Blue Valley — Home Farm", location: "Abilene, Kansas", species: "Beef & Dairy Cattle", capacity: "1,850 head", status: "Certified" },
  { id: "f4", clientId: "c3", name: "Bajío — Unidad Celaya", location: "Celaya, Guanajuato", species: "Swine", capacity: "3,200 sows", status: "Certified" },
  { id: "f5", clientId: "c3", name: "Bajío — Unidad Irapuato", location: "Irapuato, Guanajuato", species: "Swine", capacity: "2,100 sows", status: "Suspended" },
  { id: "f6", clientId: "c4", name: "Northwind — Barn Complex A", location: "Abbotsford, BC", species: "Poultry", capacity: "180,000 layers", status: "Certified" },
  { id: "f7", clientId: "c4", name: "Northwind — Barn Complex C", location: "Chilliwack, BC", species: "Poultry", capacity: "240,000 broilers", status: "Certified" },
  { id: "f8", clientId: "c5", name: "Aurora — Sea Site Reloncaví", location: "Puerto Montt, Los Lagos", species: "Aquaculture", capacity: "12 pens", status: "In process" },
  { id: "f9", clientId: "c6", name: "Highland — North Range", location: "Bozeman, Montana", species: "Sheep & Goats", capacity: "3,400 head", status: "Not certified" },
];

export const auditors: Auditor[] = [
  { id: "a1", name: "Dr. Helen Marsh", base: "Des Moines, IA", species: ["Swine", "Beef & Dairy Cattle"], credential: "Lead Auditor — ISO 19011", credentialExpires: "2027-03-30", audits12m: 41 },
  { id: "a2", name: "Dr. Rafael Ontiveros", base: "Querétaro, MX", species: ["Swine", "Poultry"], credential: "Lead Auditor — ISO 19011", credentialExpires: "2026-11-14", audits12m: 37 },
  { id: "a3", name: "Janet Osei", base: "Vancouver, BC", species: ["Poultry"], credential: "Auditor — Poultry Welfare", credentialExpires: "2026-10-02", audits12m: 28 },
  { id: "a4", name: "Dr. Ingrid Lassen", base: "Puerto Montt, CL", species: ["Aquaculture"], credential: "Auditor — Aquaculture Welfare", credentialExpires: "2028-01-19", audits12m: 16 },
  { id: "a5", name: "Marcus Bell", base: "Billings, MT", species: ["Sheep & Goats", "Beef & Dairy Cattle"], credential: "Auditor — Ruminant Welfare", credentialExpires: "2026-09-28", audits12m: 22 },
];

export const audits: Audit[] = [
  { id: "au1", code: "CL-2026-0418", facilityId: "f2", auditorId: "a1", program: "Prop 12", type: "On-site", date: "2026-09-16", status: "Scheduled", standard: "Prop 12 v3.1" },
  { id: "au2", code: "CL-2026-0417", facilityId: "f8", auditorId: "a4", program: "3rd Party Auditing", type: "On-site", date: "2026-09-23", status: "Scheduled", standard: "CL Aquaculture v2.0" },
  { id: "au3", code: "CL-2026-0411", facilityId: "f5", auditorId: "a2", program: "Certified Care", type: "On-site", date: "2026-09-02", status: "Report due", score: 71, standard: "Certified Care v4.2" },
  { id: "au4", code: "CL-2026-0409", facilityId: "f7", auditorId: "a3", program: "Remote Video Auditing", type: "Remote video", date: "2026-08-28", status: "Closed", score: 94, standard: "Certified Care v4.2" },
  { id: "au5", code: "CL-2026-0404", facilityId: "f1", auditorId: "a1", program: "Certified Care", type: "On-site", date: "2026-08-14", status: "Closed", score: 97, standard: "Certified Care v4.2" },
  { id: "au6", code: "CL-2026-0398", facilityId: "f4", auditorId: "a2", program: "Certified Care", type: "On-site", date: "2026-07-30", status: "Closed", score: 89, standard: "Certified Care v4.1" },
  { id: "au7", code: "CL-2026-0421", facilityId: "f9", auditorId: "a5", program: "Certified Care", type: "On-site", date: "2026-10-07", status: "Scheduled", standard: "Certified Care v4.2" },
  { id: "au8", code: "CL-2026-0413", facilityId: "f3", auditorId: "a1", program: "Certified Care", type: "On-site", date: "2026-09-08", status: "In progress", standard: "Certified Care v4.2" },
];

export const findings: Finding[] = [
  { id: "n1", auditId: "au3", clause: "4.2.1 — Space allowance", severity: "Critical", summary: "Gestation pens below the minimum area required per animal in two of six barns.", status: "Open", due: "2026-09-19" },
  { id: "n2", auditId: "au3", clause: "6.1.4 — Euthanasia records", severity: "Major", summary: "Euthanasia log incomplete for the last quarter; three entries missing an operator signature.", status: "CAPA submitted", due: "2026-09-26" },
  { id: "n3", auditId: "au3", clause: "3.3.2 — Water access", severity: "Minor", summary: "Two drinkers with flow below specification in the finishing barn.", status: "Verified", due: "2026-09-12" },
  { id: "n4", auditId: "au4", clause: "5.1.1 — Litter condition", severity: "Minor", summary: "Litter moisture above target in the north end of Complex C.", status: "Closed", due: "2026-09-05" },
  { id: "n5", auditId: "au6", clause: "7.2.3 — Staff training", severity: "Major", summary: "Two handlers without documented welfare training in the current cycle.", status: "Closed", due: "2026-08-20" },
  { id: "n6", auditId: "au5", clause: "2.4.1 — Enrichment", severity: "Observation", summary: "Enrichment material present but rotation not documented.", status: "Closed", due: "2026-08-28" },
];

export const certificates: Certificate[] = [
  { id: "cert1", number: "CL-CC-2026-0142", facilityId: "f1", program: "Certified Care", issued: "2026-08-21", expires: "2027-08-21", status: "Active" },
  { id: "cert2", number: "CL-CC-2025-0098", facilityId: "f3", program: "Certified Care", issued: "2025-10-04", expires: "2026-10-04", status: "Expiring" },
  { id: "cert3", number: "CL-CC-2026-0131", facilityId: "f6", program: "Certified Care", issued: "2026-06-12", expires: "2027-06-12", status: "Active" },
  { id: "cert4", number: "CL-CC-2026-0138", facilityId: "f7", program: "Certified Care", issued: "2026-09-01", expires: "2027-09-01", status: "Active" },
  { id: "cert5", number: "CL-CC-2026-0107", facilityId: "f4", program: "Certified Care", issued: "2026-08-06", expires: "2027-08-06", status: "Active" },
  { id: "cert6", number: "CL-CC-2025-0071", facilityId: "f5", program: "Certified Care", issued: "2025-09-18", expires: "2026-09-18", status: "Suspended" },
];

export const leads: Lead[] = [
  { id: "l1", name: "Dana Whitmore", company: "Cedar Hollow Farms", email: "dwhitmore@cedarhollow.example", country: "United States", subject: "Prop 12", source: "google", campaign: "prop12-search", received: "2026-09-09", stage: "New" },
  { id: "l2", name: "Paulo Mendes", company: "Agropecuária Serra Verde", email: "pmendes@serraverde.example", country: "Brazil", subject: "Certified Care", source: "linkedin", campaign: "certified-care-2026", received: "2026-09-08", stage: "Contacted" },
  { id: "l3", name: "Sarah Kline", company: "Kline Family Poultry", email: "sarah@klinepoultry.example", country: "United States", subject: "Remote Video Auditing", source: "direct", campaign: "—", received: "2026-09-05", stage: "Qualified" },
  { id: "l4", name: "Ana Lucía Torres", company: "Porcícola del Norte", email: "atorres@porcinorte.example", country: "Mexico", subject: "3rd Party Auditing", source: "referral", campaign: "—", received: "2026-09-02", stage: "Proposal" },
  { id: "l5", name: "Greg Salter", company: "Salter Cattle Co.", email: "greg@saltercattle.example", country: "United States", subject: "Training", source: "google", campaign: "training-generic", received: "2026-08-29", stage: "Won" },
  { id: "l6", name: "Marta Nowak", company: "Baltic Aqua", email: "mnowak@balticaqua.example", country: "Poland", subject: "Certified Care", source: "linkedin", campaign: "certified-care-2026", received: "2026-08-24", stage: "Lost" },
];

// --- Utilidades de consulta -------------------------------------------------

export const clientById = (id: string) => clients.find((c) => c.id === id);
export const facilityById = (id: string) => facilities.find((f) => f.id === id);
export const auditorById = (id: string) => auditors.find((a) => a.id === id);
export const auditById = (id: string) => audits.find((a) => a.id === id);
export const findingsByAudit = (auditId: string) => findings.filter((f) => f.auditId === auditId);
export const facilitiesByClient = (clientId: string) => facilities.filter((f) => f.clientId === clientId);
export const certificateByFacility = (facilityId: string) => certificates.find((c) => c.facilityId === facilityId);

/** Etiqueta legible de una instalación con su cliente, para tablas. */
export const facilityLabel = (facilityId: string) => {
  const f = facilityById(facilityId);
  if (!f) return "—";
  const c = clientById(f.clientId);
  return { facility: f.name, client: c?.name ?? "—", location: f.location, species: f.species };
};
