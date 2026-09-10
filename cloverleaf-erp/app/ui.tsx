import type { ReactNode } from "react";

export function PageHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <div className="sub">{sub}</div>
      </div>
      <div className="who">
        <span>Helen Marsh · Certification Manager</span>
        <span className="av">HM</span>
      </div>
    </header>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** Mapea cada estado del dominio al color que le corresponde. */
const TONE: Record<string, string> = {
  // Instalaciones y certificados
  Certified: "b-ok", Active: "b-ok", "In process": "b-info", Expiring: "b-warn",
  Suspended: "b-crit", Withdrawn: "b-crit", "Not certified": "b-mute",
  // Auditorías
  Scheduled: "b-info", "In progress": "b-warn", "Report due": "b-warn", Closed: "b-ok",
  // Hallazgos
  Critical: "b-crit", Major: "b-warn", Minor: "b-info", Observation: "b-mute",
  Open: "b-crit", "CAPA submitted": "b-warn", Verified: "b-ok",
  // Leads
  New: "b-info", Contacted: "b-info", Qualified: "b-warn", Proposal: "b-warn",
  Won: "b-ok", Lost: "b-mute",
};

export function Badge({ children }: { children: string }) {
  return <span className={`badge ${TONE[children] ?? "b-mute"}`}>{children}</span>;
}

export function fmt(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}
