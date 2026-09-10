import { PageHeader, Card, Badge, fmt } from "../ui";
import { leads } from "@/lib/data";

const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;

export default function LeadsPage() {
  return (
    <>
      <PageHeader title="Leads & CRM" sub="Every inquiry from the website, with the campaign that produced it" />
      <div className="content enter">
        <Card title="Pipeline">
          <div className="body">
            <div className="pipe stagger">
              {STAGES.map((stage) => {
                const inStage = leads.filter((l) => l.stage === stage);
                return (
                  <div className="col" key={stage}>
                    <h3>{stage}<b>{inStage.length}</b></h3>
                    {inStage.map((l) => (
                      <div className="lead" key={l.id}>
                        <div className="n">{l.name}</div>
                        <div className="c">{l.company}</div>
                        <div className="c">{l.subject}</div>
                        {l.source !== "direct" && l.campaign !== "—" ? (
                          <div className="src">{l.source} · {l.campaign}</div>
                        ) : (
                          <div className="src">{l.source}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div style={{ marginTop: 16 }}>
          <Card title="All inquiries">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Received</th><th>Contact</th><th>Interested in</th><th>Country</th><th>Source</th><th>Stage</th></tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id}>
                      <td className="muted">{fmt(l.received)}</td>
                      <td><div className="strong">{l.name}</div><div className="muted">{l.company}</div></td>
                      <td>{l.subject}</td>
                      <td className="muted">{l.country}</td>
                      <td><div className="strong">{l.source}</div><div className="muted">{l.campaign}</div></td>
                      <td><Badge>{l.stage}</Badge></td>
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
