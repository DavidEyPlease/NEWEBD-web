import { PageHeader, Card, Badge, fmt } from "../ui";
import { auditors } from "@/lib/data";

/** Un año vista: lo que una acreditadora consideraría "próximo a vencer". */
const SOON = new Date("2027-01-01");

export default function AuditorsPage() {
  return (
    <>
      <PageHeader title="Auditor Competence" sub="Credentials and qualifications — the first thing an accreditation body asks to see" />
      <div className="content enter">
        <Card title="Auditors">
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Auditor</th><th>Based in</th><th>Qualified for</th><th>Credential</th><th>Valid until</th><th>Audits (12m)</th></tr>
              </thead>
              <tbody>
                {auditors.map((a) => {
                  const expiringSoon = new Date(a.credentialExpires) < SOON;
                  return (
                    <tr key={a.id}>
                      <td className="strong">{a.name}</td>
                      <td className="muted">{a.base}</td>
                      <td className="muted">{a.species.join(", ")}</td>
                      <td>{a.credential}</td>
                      <td>{expiringSoon ? <Badge>Expiring</Badge> : <span className="muted">{fmt(a.credentialExpires)}</span>}</td>
                      <td className="strong">{a.audits12m}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
