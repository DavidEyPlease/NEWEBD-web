"use client";

import { PageHeader, Card, Badge, fmt } from "../ui";
import { Toolbar, useFilter } from "../widgets";
import { certificates, facilityLabel } from "@/lib/data";

export default function CertificatesPage() {
  const { q, setQ, active, setActive, groups, filtered } = useFilter(
    certificates,
    (c) => {
      const f = facilityLabel(c.facilityId) as { facility: string; client: string };
      return `${c.number} ${f.facility} ${f.client} ${c.program}`;
    },
    (c) => c.status,
  );

  return (
    <>
      <PageHeader title="Certificates" sub="Issue, validity, suspension and renewal — every change recorded" />
      <div className="content enter">
        <Toolbar
          q={q} setQ={setQ} placeholder="Search by number, facility or client"
          groups={groups} active={active} setActive={setActive} count={filtered.length}
        />
        <Card title="All certificates">
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Certificate</th><th>Facility</th><th>Program</th><th>Issued</th><th>Expires</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const f = facilityLabel(c.facilityId) as { facility: string; client: string; species: string };
                  return (
                    <tr key={c.id}>
                      <td className="mono strong">{c.number}</td>
                      <td><div className="strong">{f.facility}</div><div className="muted">{f.client} · {f.species}</div></td>
                      <td>{c.program}</td>
                      <td className="muted">{fmt(c.issued)}</td>
                      <td className="muted">{fmt(c.expires)}</td>
                      <td><Badge>{c.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">No certificates match that search.</div>}
          </div>
        </Card>
      </div>
    </>
  );
}
