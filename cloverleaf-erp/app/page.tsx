import Link from "next/link";
import { PageHeader, Card, Badge, fmt } from "./ui";
import { HostingStrip } from "./account/strip";
import { CountUp, Ring, Trend } from "./widgets";
import { audits, certificates, findings, leads, facilityLabel, auditorById, SPECIES, facilities } from "@/lib/data";

export default function Dashboard() {
  const upcoming = audits.filter((a) => a.status === "Scheduled" || a.status === "In progress");
  const openFindings = findings.filter((f) => f.status !== "Closed");
  const criticalOpen = findings.filter((f) => f.severity === "Critical" && f.status !== "Closed");
  const needsAction = certificates.filter((c) => c.status === "Expiring" || c.status === "Suspended");
  const newLeads = leads.filter((l) => l.stage === "New" || l.stage === "Contacted");

  // Indicadores agregados para los anillos.
  const scored = audits.filter((a) => typeof a.score === "number");
  const avgScore = Math.round(scored.reduce((s, a) => s + (a.score ?? 0), 0) / scored.length);
  const certifiedPct = Math.round(
    (facilities.filter((f) => f.status === "Certified").length / facilities.length) * 100,
  );
  const capaClosed = Math.round(
    (findings.filter((f) => f.status === "Closed" || f.status === "Verified").length / findings.length) * 100,
  );

  const bySpecies = SPECIES.map((s) => ({
    species: s,
    n: facilities.filter((f) => f.species === s).length,
  })).filter((r) => r.n > 0);
  const maxSpecies = Math.max(...bySpecies.map((r) => r.n));

  return (
    <>
      <PageHeader title="Dashboard" sub="Where every certification stands today" />
      <div className="content">
        <HostingStrip />
        <div className="kpis stagger">
          <div className="kpi acc-gold">
            <div className="l">Audits scheduled</div>
            <div className="v"><CountUp to={upcoming.length} /></div>
            <div className="d"><Trend dir="up">next on {fmt(upcoming[0].date)}</Trend></div>
          </div>
          <div className="kpi acc-crit">
            <div className="l">Open findings</div>
            <div className="v"><CountUp to={openFindings.length} /></div>
            <div className="d"><Trend dir="down">{criticalOpen.length} critical, awaiting CAPA</Trend></div>
          </div>
          <div className="kpi acc-warn">
            <div className="l">Certificates needing action</div>
            <div className="v"><CountUp to={needsAction.length} /></div>
            <div className="d"><Trend dir="flat">expiring or suspended</Trend></div>
          </div>
          <div className="kpi acc-ok">
            <div className="l">New inquiries</div>
            <div className="v"><CountUp to={newLeads.length} /></div>
            <div className="d"><Trend dir="up">from the website, this week</Trend></div>
          </div>
        </div>

        <div className="grid3 enter-2">
          <Card title="Compliance at a glance">
            <div className="body">
              <div style={{ display: "flex", gap: 22, justifyContent: "space-around", flexWrap: "wrap" }}>
                <Ring value={certifiedPct} caption="Certified" />
                <Ring value={avgScore} caption="Avg score" />
                <Ring value={capaClosed} caption="CAPA closed" />
              </div>
            </div>
          </Card>

          <Card title="Facilities by species">
            <div className="body">
              <div className="bars">
                {bySpecies.map((r, i) => (
                  <div className="bar-row" key={r.species}>
                    <span>{r.species}</span>
                    <span className="bar">
                      <span style={{ width: `${(r.n / maxSpecies) * 100}%`, animationDelay: `${i * 90}ms` }} />
                    </span>
                    <span className="n">{r.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Certificates needing action">
            <div className="table-scroll">
              <table>
                <thead><tr><th>Certificate</th><th>Expires</th><th>Status</th></tr></thead>
                <tbody>
                  {needsAction.map((c) => {
                    const f = facilityLabel(c.facilityId) as { facility: string; client: string };
                    return (
                      <tr key={c.id}>
                        <td><div className="mono strong">{c.number}</div><div className="muted">{f.client}</div></td>
                        <td className="muted">{fmt(c.expires)}</td>
                        <td><Badge>{c.status}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="grid2 enter-3" style={{ marginTop: 16 }}>
          <Card title="Upcoming audits">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Audit</th><th>Facility</th><th>Auditor</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {upcoming.map((a) => {
                    const f = facilityLabel(a.facilityId) as { facility: string; client: string };
                    return (
                      <tr key={a.id}>
                        <td><Link href={`/audits/${a.id}/`} className="mono strong">{a.code}</Link></td>
                        <td><div className="strong">{f.facility}</div><div className="muted">{f.client}</div></td>
                        <td className="muted">{auditorById(a.auditorId)?.name}</td>
                        <td className="muted">{fmt(a.date)}</td>
                        <td><Badge>{a.status}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Findings awaiting response">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Severity</th><th>Clause</th><th>Due</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {openFindings.map((f) => (
                    <tr key={f.id}>
                      <td><Badge>{f.severity}</Badge></td>
                      <td><div className="strong">{f.clause}</div><div className="muted">{f.summary.slice(0, 58)}…</div></td>
                      <td className="muted">{fmt(f.due)}</td>
                      <td><Badge>{f.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
