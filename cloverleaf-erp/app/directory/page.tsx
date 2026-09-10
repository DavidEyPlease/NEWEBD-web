"use client";

import { PageHeader, Card, Badge, fmt } from "../ui";
import { Toolbar, useFilter } from "../widgets";
import { people, personInitials, roles } from "@/lib/team";

export default function DirectoryPage() {
  const { q, setQ, active, setActive, groups, filtered } = useFilter(
    people,
    (p) => `${p.name} ${p.email} ${p.org} ${p.location}`,
    (p) => p.type,
  );

  const roleLabel = (id: string) => roles.find((r) => r.id === id)?.label ?? id;

  return (
    <>
      <PageHeader title="Directory" sub="Everyone with access to the system, and what they are" />
      <div className="content enter">
        <div className="kpis stagger">
          {["Staff", "Auditor", "Client contact"].map((t) => {
            const list = people.filter((p) => p.type === t);
            return (
              <div className="kpi" key={t}>
                <div className="l">{t === "Client contact" ? "Client contacts" : t === "Staff" ? "Internal team" : "Auditors"}</div>
                <div className="v">{list.length}</div>
                <div className="d">{list.filter((p) => p.status === "Active").length} active</div>
              </div>
            );
          })}
          <div className="kpi acc-warn">
            <div className="l">Pending or blocked</div>
            <div className="v">{people.filter((p) => p.status !== "Active").length}</div>
            <div className="d">invitations and suspensions</div>
          </div>
        </div>

        <Toolbar
          q={q} setQ={setQ} placeholder="Search by name, email, company or location"
          groups={groups} active={active} setActive={setActive} count={filtered.length}
        />

        <Card title="People">
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Person</th><th>Role</th><th>Organisation</th><th>Location</th><th>Last active</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="person">
                        <span className="pav">{personInitials(p.name)}</span>
                        <div>
                          <div className="strong">{p.name}</div>
                          <div className="muted">{p.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{roleLabel(p.role)}</td>
                    <td className="muted">{p.org}</td>
                    <td className="muted">{p.location}</td>
                    <td className="muted">{p.lastActive === "—" ? "—" : fmt(p.lastActive)}</td>
                    <td><Badge>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">Nobody matches that search.</div>}
          </div>
        </Card>
      </div>
    </>
  );
}
