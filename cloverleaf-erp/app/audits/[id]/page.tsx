import Link from "next/link";
import { PageHeader, Card, Badge, fmt } from "../../ui";
import { audits, auditById, auditorById, facilityById, clientById, findingsByAudit } from "@/lib/data";

/** Export estático: hay que declarar de antemano cada auditoría. */
export function generateStaticParams() {
  return audits.map((a) => ({ id: a.id }));
}

/** Checklist de muestra. En el sistema real vendría del estándar versionado. */
const CHECKLIST = [
  { clause: "1.1", text: "Written animal welfare policy, signed by management", result: "pass" },
  { clause: "2.4.1", text: "Environmental enrichment present and rotated", result: "pass" },
  { clause: "3.3.2", text: "Water access: flow rate and drinker ratio", result: "fail" },
  { clause: "4.2.1", text: "Space allowance per animal meets the standard", result: "fail" },
  { clause: "5.2.0", text: "Stockmanship: handling observed during movement", result: "pass" },
  { clause: "6.1.4", text: "Euthanasia records complete and signed", result: "fail" },
  { clause: "7.2.3", text: "Staff welfare training current for all handlers", result: "pass" },
  { clause: "8.0.1", text: "Emergency plan posted and tested in the last 12 months", result: "na" },
];

export default async function AuditDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audit = auditById(id);
  if (!audit) return null;

  const facility = facilityById(audit.facilityId);
  const client = facility ? clientById(facility.clientId) : undefined;
  const auditor = auditorById(audit.auditorId);
  const auditFindings = findingsByAudit(audit.id);
  const done = audit.status === "Closed" || audit.status === "Report due";

  return (
    <>
      <PageHeader title={audit.code} sub={`${audit.program} · ${audit.type} · ${facility?.name ?? ""}`} />
      <div className="content enter">
        <Link href="/audits/" className="back"><span>←</span> Back to audits</Link>

        <div className="split">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title={`Checklist — ${audit.standard}`}>
              <div className="body">
                {done ? (
                  CHECKLIST.map((c) => (
                    <div className="check" key={c.clause}>
                      <span className={`st ${c.result === "pass" ? "p" : c.result === "fail" ? "f" : "n"}`}>
                        {c.result === "pass" ? "✓" : c.result === "fail" ? "✕" : "–"}
                      </span>
                      <div>
                        <div className="cl">{c.clause}</div>
                        <div className="tx">{c.text}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    The checklist opens when the auditor starts the visit. This audit is still {audit.status.toLowerCase()}.
                  </p>
                )}
              </div>
            </Card>

            {auditFindings.length > 0 && (
              <Card title="Findings raised">
                <div className="table-scroll">
                  <table>
                    <thead><tr><th>Severity</th><th>Clause</th><th>Finding</th><th>Due</th><th>Status</th></tr></thead>
                    <tbody>
                      {auditFindings.map((f) => (
                        <tr key={f.id}>
                          <td><Badge>{f.severity}</Badge></td>
                          <td className="mono">{f.clause.split(" — ")[0]}</td>
                          <td>{f.summary}</td>
                          <td className="muted">{fmt(f.due)}</td>
                          <td><Badge>{f.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {done && (
              <Card title="Evidence">
                <div className="body">
                  <div className="evid">
                    <div className="ph"><span>Gestation barn — pen measurement</span></div>
                    <div className="ph"><span>Drinker flow test</span></div>
                    <div className="ph"><span>Euthanasia log — page 4</span></div>
                    <div className="ph"><span>Handling during movement</span></div>
                  </div>
                  <p style={{ marginBottom: 0, marginTop: 13, color: "var(--muted)", fontSize: 12.5 }}>
                    Each file is stored with its timestamp and origin, attached to the finding it supports, and cannot be edited afterwards.
                  </p>
                </div>
              </Card>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title="Audit details">
              <div className="body">
                <div className="meta">
                  <div className="row"><span className="k">Status</span><span className="v"><Badge>{audit.status}</Badge></span></div>
                  <div className="row"><span className="k">Date</span><span className="v">{fmt(audit.date)}</span></div>
                  <div className="row"><span className="k">Program</span><span className="v">{audit.program}</span></div>
                  <div className="row"><span className="k">Type</span><span className="v">{audit.type}</span></div>
                  <div className="row"><span className="k">Standard</span><span className="v">{audit.standard}</span></div>
                  {audit.score && <div className="row"><span className="k">Score</span><span className="v">{audit.score}%</span></div>}
                </div>
              </div>
            </Card>

            <Card title="Facility">
              <div className="body">
                <div className="meta">
                  <div className="row"><span className="k">Client</span><span className="v">{client?.name}</span></div>
                  <div className="row"><span className="k">Facility</span><span className="v">{facility?.name}</span></div>
                  <div className="row"><span className="k">Location</span><span className="v">{facility?.location}</span></div>
                  <div className="row"><span className="k">Species</span><span className="v">{facility?.species}</span></div>
                  <div className="row"><span className="k">Capacity</span><span className="v">{facility?.capacity}</span></div>
                </div>
              </div>
            </Card>

            <Card title="Auditor">
              <div className="body">
                <div className="meta">
                  <div className="row"><span className="k">Assigned</span><span className="v">{auditor?.name}</span></div>
                  <div className="row"><span className="k">Based in</span><span className="v">{auditor?.base}</span></div>
                  <div className="row"><span className="k">Credential</span><span className="v">{auditor?.credential}</span></div>
                  <div className="row"><span className="k">Valid until</span><span className="v">{auditor ? fmt(auditor.credentialExpires) : "—"}</span></div>
                </div>
                <p style={{ marginTop: 13, marginBottom: 0, color: "var(--muted)", fontSize: 12.5 }}>
                  Assignment was allowed because this auditor is qualified for {facility?.species} and has no declared conflict with {client?.name}.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
