"use client";

import Link from "next/link";
import { PageHeader, Card, Badge, fmt } from "../ui";
import { Toolbar, useFilter } from "../widgets";
import { audits, facilityLabel, auditorById } from "@/lib/data";

export default function AuditsPage() {
  const sorted = [...audits].sort((a, b) => a.date.localeCompare(b.date));

  const { q, setQ, active, setActive, groups, filtered } = useFilter(
    sorted,
    (a) => {
      const f = facilityLabel(a.facilityId) as { facility: string; client: string };
      return `${a.code} ${f.facility} ${f.client} ${a.program} ${auditorById(a.auditorId)?.name ?? ""}`;
    },
    (a) => a.status,
  );

  return (
    <>
      <PageHeader title="Audits" sub="Scheduling and execution, on site or by remote video" />
      <div className="content enter">
        <Toolbar
          q={q} setQ={setQ} placeholder="Search by code, facility, client or auditor"
          groups={groups} active={active} setActive={setActive} count={filtered.length}
        />
        <Card title="All audits">
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Audit</th><th>Facility</th><th>Program</th><th>Type</th><th>Auditor</th><th>Date</th><th>Score</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const f = facilityLabel(a.facilityId) as { facility: string; client: string; species: string };
                  return (
                    <tr key={a.id}>
                      <td><Link href={`/audits/${a.id}/`} className="mono strong">{a.code}</Link></td>
                      <td><div className="strong">{f.facility}</div><div className="muted">{f.client} · {f.species}</div></td>
                      <td>{a.program}</td>
                      <td className="muted">{a.type}</td>
                      <td className="muted">{auditorById(a.auditorId)?.name}</td>
                      <td className="muted">{fmt(a.date)}</td>
                      <td className="strong">{a.score ? `${a.score}%` : "—"}</td>
                      <td><Badge>{a.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">No audits match that search.</div>}
          </div>
        </Card>
      </div>
    </>
  );
}
