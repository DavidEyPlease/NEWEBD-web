import { PageHeader, Card, Badge } from "../ui";
import { CountUp, Ring } from "../widgets";
import { workload, people, personInitials } from "@/lib/team";
import { audits, findings } from "@/lib/data";

export default function TeamPage() {
  const totalAssigned = workload.reduce((s, w) => s + w.assigned, 0);
  const reportsDue = workload.reduce((s, w) => s + w.reportsDue, 0);
  const openFindings = findings.filter((f) => f.status !== "Closed").length;
  const closedRate = Math.round(
    (audits.filter((a) => a.status === "Closed").length / audits.length) * 100,
  );

  // Quien más carga tiene frente a quien menos: el dato que sirve para repartir.
  const busiest = workload[0];
  const lightest = workload[workload.length - 1];
  const activeAuditors = people.filter((p) => p.type === "Auditor" && p.status === "Active").length;

  return (
    <>
      <PageHeader title="Team" sub="Who is carrying what, and where the work is getting stuck" />
      <div className="content enter">
        <div className="kpis stagger">
          <div className="kpi acc-gold">
            <div className="l">Audits in the book</div>
            <div className="v"><CountUp to={totalAssigned} /></div>
            <div className="d">across {activeAuditors + 1} auditors</div>
          </div>
          <div className="kpi acc-warn">
            <div className="l">Reports overdue</div>
            <div className="v"><CountUp to={reportsDue} /></div>
            <div className="d">audit done, report not delivered</div>
          </div>
          <div className="kpi acc-crit">
            <div className="l">Findings awaiting response</div>
            <div className="v"><CountUp to={openFindings} /></div>
            <div className="d">across all auditors</div>
          </div>
          <div className="kpi acc-ok">
            <div className="l">Busiest vs lightest</div>
            <div className="v"><CountUp to={busiest.assigned - lightest.assigned} /></div>
            <div className="d">audits apart — room to rebalance</div>
          </div>
        </div>

        <div className="grid3 enter-2">
          <Card title="Workload by auditor">
            <div className="body">
              <div className="bars">
                {workload.map((w, i) => (
                  <div className="bar-row" key={w.auditorId}>
                    <span>{w.name.replace(/^Dr\.\s*/, "")}</span>
                    <span className="bar"><span style={{ width: `${w.load}%`, animationDelay: `${i * 90}ms` }} /></span>
                    <span className="n">{w.assigned}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Audits closed">
            <div className="body" style={{ display: "flex", justifyContent: "center" }}>
              <Ring value={closedRate} caption="Closed" size={112} />
            </div>
          </Card>

          <Card title="Needs attention">
            <div className="body">
              {workload.filter((w) => w.reportsDue > 0).length === 0 ? (
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>No overdue reports right now.</p>
              ) : (
                workload
                  .filter((w) => w.reportsDue > 0)
                  .map((w) => (
                    <div className="attn" key={w.auditorId}>
                      <span className="pav">{personInitials(w.name)}</span>
                      <div>
                        <div className="strong">{w.name}</div>
                        <div className="muted">{w.reportsDue} report{w.reportsDue > 1 ? "s" : ""} pending delivery</div>
                      </div>
                      <Badge>Report due</Badge>
                    </div>
                  ))
              )}
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 16 }} className="enter-3">
          <Card title="Detail by auditor">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Auditor</th><th>Based in</th><th>Assigned</th><th>Upcoming</th><th>Closed</th><th>Reports due</th><th>Findings raised</th><th>Avg score</th></tr>
                </thead>
                <tbody>
                  {workload.map((w) => (
                    <tr key={w.auditorId}>
                      <td>
                        <div className="person">
                          <span className="pav">{personInitials(w.name)}</span>
                          <span className="strong">{w.name}</span>
                        </div>
                      </td>
                      <td className="muted">{w.base}</td>
                      <td className="strong">{w.assigned}</td>
                      <td className="muted">{w.inProgress}</td>
                      <td className="muted">{w.closed}</td>
                      <td>{w.reportsDue > 0 ? <Badge>Report due</Badge> : <span className="muted">—</span>}</td>
                      <td className="muted">{w.findingsRaised}</td>
                      <td className="strong">{w.avgScore !== null ? `${w.avgScore}%` : "—"}</td>
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
