import { PageHeader, Card } from "../ui";
import { LEVEL_LABEL, matrix, modules, roles, type Level } from "@/lib/team";

/** Cada nivel con su intensidad, para que la matriz se lea de un vistazo. */
const CELL: Record<Level, string> = {
  manage: "lv lv-manage",
  edit: "lv lv-edit",
  view: "lv lv-view",
  own: "lv lv-own",
  none: "lv lv-none",
};

export default function RolesPage() {
  return (
    <>
      <PageHeader title="Roles & Permissions" sub="Who can see what — the reason the portal can be opened to clients" />
      <div className="content enter">
        <div className="rolecards stagger">
          {roles.map((r) => (
            <div className="rolecard" key={r.id}>
              <div className="rc-h">
                <span className="rc-n">{r.label}</span>
                <span className="rc-c">{r.count}</span>
              </div>
              <p>{r.who}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <Card title="Permission matrix">
            <div className="table-scroll">
              <table className="matrix">
                <thead>
                  <tr>
                    <th>Module</th>
                    {roles.map((r) => <th key={r.id}>{r.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr key={m}>
                      <td className="strong">{m}</td>
                      {roles.map((r) => {
                        const lv = matrix[r.id][i];
                        return (
                          <td key={r.id}>
                            <span className={CELL[lv]}>{LEVEL_LABEL[lv]}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="body" style={{ borderTop: "1px solid var(--line)" }}>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 12.5 }}>
                <strong style={{ color: "var(--text)" }}>Own only</strong> is what makes the outside doors safe:
                an auditor sees the audits assigned to them, and a client contact sees their own company&apos;s
                facilities, findings and certificates — never anybody else&apos;s.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
