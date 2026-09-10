"use client";

import Link from "next/link";
import { PageHeader, Card, Badge, fmt } from "../ui";
import { Toolbar, useFilter } from "../widgets";
import { findings, auditById, facilityLabel } from "@/lib/data";

export default function FindingsPage() {
  const { q, setQ, active, setActive, groups, filtered } = useFilter(
    findings,
    (f) => {
      const audit = auditById(f.auditId);
      const fac = audit ? (facilityLabel(audit.facilityId) as { facility: string; client: string }) : null;
      return `${f.clause} ${f.summary} ${fac?.facility ?? ""} ${fac?.client ?? ""} ${audit?.code ?? ""}`;
    },
    (f) => f.severity,
  );

  return (
    <>
      <PageHeader title="Findings & CAPA" sub="Non-conformities, corrective action plans and their verification" />
      <div className="content enter">
        <Toolbar
          q={q} setQ={setQ} placeholder="Search by clause, facility or audit"
          groups={groups} active={active} setActive={setActive} count={filtered.length}
        />
        <Card title="Findings">
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Severity</th><th>Clause</th><th>Finding</th><th>Facility</th><th>Audit</th><th>Due</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((f) => {
                  const audit = auditById(f.auditId);
                  const fac = audit ? (facilityLabel(audit.facilityId) as { facility: string; client: string }) : null;
                  return (
                    <tr key={f.id}>
                      <td><Badge>{f.severity}</Badge></td>
                      <td className="mono">{f.clause.split(" — ")[0]}</td>
                      <td><div className="strong">{f.clause.split(" — ")[1]}</div><div className="muted">{f.summary}</div></td>
                      <td><div className="strong">{fac?.facility}</div><div className="muted">{fac?.client}</div></td>
                      <td><Link href={`/audits/${f.auditId}/`} className="mono">{audit?.code}</Link></td>
                      <td className="muted">{fmt(f.due)}</td>
                      <td><Badge>{f.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">No findings match that search.</div>}
          </div>
        </Card>
      </div>
    </>
  );
}
