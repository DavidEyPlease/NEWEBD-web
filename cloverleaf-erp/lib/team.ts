/**
 * Directorio, roles y carga de trabajo.
 *
 * La carga NO se inventa: se calcula a partir de las auditorías y hallazgos de
 * `data.ts`, así que lo que muestra el panel de equipo coincide siempre con lo
 * que se ve en las pantallas de operación.
 */
import { audits, auditors, clients, findings, auditorById } from "./data";

// --- Personas ---------------------------------------------------------------

export type PersonType = "Staff" | "Auditor" | "Client contact";
export type RoleId =
  | "admin"
  | "manager"
  | "coordinator"
  | "auditor"
  | "client";

export type Person = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: PersonType;
  role: RoleId;
  org: string;
  location: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  /** Si es auditor, su ficha de competencia en `auditors`. */
  auditorId?: string;
};

const initials = (name: string) =>
  name.replace(/^Dr\.\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export const personInitials = initials;

/** Equipo interno de CloverLeaf. */
const staff: Person[] = [
  { id: "p1", name: "Helen Marsh", email: "hmarsh@cloverleafaws.example", phone: "+1 785 253 4610", type: "Staff", role: "manager", org: "CloverLeaf", location: "St. Joseph, MO", status: "Active", lastActive: "2026-09-10", auditorId: "a1" },
  { id: "p2", name: "Doug Feeney", email: "dfeeney@cloverleafaws.example", phone: "+1 785 253 4611", type: "Staff", role: "admin", org: "CloverLeaf", location: "St. Joseph, MO", status: "Active", lastActive: "2026-09-10" },
  { id: "p3", name: "Priya Raman", email: "praman@cloverleafaws.example", type: "Staff", role: "coordinator", org: "CloverLeaf", location: "St. Joseph, MO", status: "Active", lastActive: "2026-09-09" },
  { id: "p4", name: "Luis Cabrera", email: "lcabrera@cloverleafaws.example", type: "Staff", role: "coordinator", org: "CloverLeaf", location: "Querétaro, MX", status: "Active", lastActive: "2026-09-08" },
  { id: "p5", name: "Erin Sandoval", email: "esandoval@cloverleafaws.example", type: "Staff", role: "coordinator", org: "CloverLeaf", location: "St. Joseph, MO", status: "Invited", lastActive: "—" },
];

/** Auditores: se derivan de su ficha de competencia para no duplicar datos. */
const auditorPeople: Person[] = auditors
  .filter((a) => a.id !== "a1") // Helen ya figura como staff
  .map((a, i) => ({
    id: `pa${i + 1}`,
    name: a.name,
    email: `${a.name.replace(/^Dr\.\s*/, "").toLowerCase().replace(/\s+/g, ".")}@cloverleafaws.example`,
    type: "Auditor" as const,
    role: "auditor" as const,
    org: "CloverLeaf",
    location: a.base,
    status: "Active" as const,
    lastActive: ["2026-09-10", "2026-09-09", "2026-09-05", "2026-09-07"][i] ?? "2026-09-01",
    auditorId: a.id,
  }));

/** Contactos de cliente: los que entran por la puerta externa del portal. */
const clientPeople: Person[] = clients.map((c, i) => ({
  id: `pc${i + 1}`,
  name: c.contact,
  email: c.email,
  type: "Client contact" as const,
  role: "client" as const,
  org: c.name,
  location: c.country,
  status: i === 4 ? "Invited" : i === 3 ? "Suspended" : "Active",
  lastActive: ["2026-09-09", "2026-09-04", "2026-08-30", "—", "—", "2026-09-02"][i] ?? "—",
}));

export const people: Person[] = [...staff, ...auditorPeople, ...clientPeople];

// --- Roles y permisos -------------------------------------------------------

const roleDefs: { id: RoleId; label: string; who: string }[] = [
  { id: "admin", label: "Administrator", who: "Full control, including who gets access" },
  { id: "manager", label: "Certification Manager", who: "Owns certification decisions" },
  { id: "coordinator", label: "Coordinator", who: "Schedules and follows up the work" },
  { id: "auditor", label: "Auditor", who: "Executes audits in the field" },
  { id: "client", label: "Client contact", who: "Sees only their own company" },
];

/** El recuento sale del propio directorio, no de un número escrito a mano. */
export const roles = roleDefs.map((r) => ({
  ...r,
  count: people.filter((p) => p.role === r.id).length,
}));

export type Level = "manage" | "edit" | "view" | "own" | "none";

export const LEVEL_LABEL: Record<Level, string> = {
  manage: "Manage",
  edit: "Edit",
  view: "View",
  own: "Own only",
  none: "—",
};

export const modules = [
  "Leads & CRM",
  "Clients & Facilities",
  "Audits",
  "Findings & CAPA",
  "Certificates",
  "Auditor Competence",
  "Site Feedback",
  "Directory & Roles",
] as const;

/**
 * Matriz de permisos. "Own only" es la pieza que hace seguro abrir el portal a
 * clientes y auditores: ven su propio expediente y nada más.
 */
export const matrix: Record<RoleId, Level[]> = {
  //            Leads      Clients   Audits    Findings  Certs     Competence Website   Directory
  admin:       ["manage", "manage", "manage", "manage", "manage", "manage", "manage", "manage"],
  manager:     ["manage", "manage", "manage", "manage", "manage", "manage", "edit",   "view"],
  coordinator: ["edit",   "edit",   "edit",   "edit",   "view",   "view",   "edit",   "none"],
  auditor:     ["none",   "view",   "own",    "own",    "view",   "own",    "none",   "none"],
  client:      ["none",   "own",    "own",    "own",    "own",    "none",   "edit",   "none"],
};

// --- Carga de trabajo -------------------------------------------------------

export type Workload = {
  auditorId: string;
  name: string;
  base: string;
  assigned: number;
  inProgress: number;
  closed: number;
  reportsDue: number;
  findingsRaised: number;
  avgScore: number | null;
  /** Ocupación respecto al auditor más cargado, para comparar de un vistazo. */
  load: number;
};

const rawWorkload = auditors.map((a) => {
  const mine = audits.filter((x) => x.auditorId === a.id);
  const closed = mine.filter((x) => x.status === "Closed");
  const scored = closed.filter((x) => typeof x.score === "number");
  const myFindings = findings.filter((f) => mine.some((m) => m.id === f.auditId));

  return {
    auditorId: a.id,
    name: a.name,
    base: a.base,
    assigned: mine.length,
    inProgress: mine.filter((x) => x.status === "Scheduled" || x.status === "In progress").length,
    closed: closed.length,
    reportsDue: mine.filter((x) => x.status === "Report due").length,
    findingsRaised: myFindings.length,
    avgScore: scored.length
      ? Math.round(scored.reduce((s, x) => s + (x.score ?? 0), 0) / scored.length)
      : null,
  };
});

const maxAssigned = Math.max(...rawWorkload.map((w) => w.assigned), 1);

export const workload: Workload[] = rawWorkload
  .map((w) => ({ ...w, load: Math.round((w.assigned / maxAssigned) * 100) }))
  .sort((a, b) => b.assigned - a.assigned);

export const auditorName = (id: string) => auditorById(id)?.name ?? "—";
