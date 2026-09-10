import { PageHeader, Card, Badge, fmt } from "../ui";
import { clients, facilitiesByClient, certificateByFacility } from "@/lib/data";

export default function ClientsPage() {
  return (
    <>
      <PageHeader title="Clients & Facilities" sub="A client is a company; what you audit is each of their facilities" />
      <div className="content stagger">
        {clients.map((c) => {
          const fac = facilitiesByClient(c.id);
          return (
            <div key={c.id} style={{ marginBottom: 16 }}>
              <Card title={`${c.name} — ${c.country}`}>
                <div className="body" style={{ paddingBottom: 4 }}>
                  <div className="meta" style={{ flexDirection: "row", gap: 28, flexWrap: "wrap" }}>
                    <div><div className="muted">Main contact</div><div className="strong">{c.contact}</div></div>
                    <div><div className="muted">Email</div><div className="strong">{c.email}</div></div>
                    <div><div className="muted">Client since</div><div className="strong">{fmt(c.since)}</div></div>
                    <div><div className="muted">Programs</div><div className="strong">{c.programs.join(", ")}</div></div>
                  </div>
                </div>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr><th>Facility</th><th>Location</th><th>Species</th><th>Capacity</th><th>Certificate</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {fac.map((f) => {
                        const cert = certificateByFacility(f.id);
                        return (
                          <tr key={f.id}>
                            <td className="strong">{f.name}</td>
                            <td className="muted">{f.location}</td>
                            <td>{f.species}</td>
                            <td className="muted">{f.capacity}</td>
                            <td className="mono">{cert ? cert.number : "—"}</td>
                            <td><Badge>{f.status}</Badge></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
