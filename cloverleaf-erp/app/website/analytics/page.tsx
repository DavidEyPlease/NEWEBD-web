"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card } from "../../ui";
import { api } from "@/lib/api";
import { ComplianceCard } from "../compliance";

type Row = { key: string; value: number };
type Summary = {
  days: number;
  since: string | null;
  totals: { pageviews: number; visits: number };
  daily: { date: string; pageviews: number; visits: number }[];
  pages: Row[];
  sources: Row[];
  languages: Row[];
  devices: Row[];
};

const RANGES = [7, 30, 90];
const PAGE: Record<string, string> = {
  "/": "Home", "/about-us": "About Us", "/auditing-services": "Auditing Services",
  "/certified-care": "Certified Care", "/contact-us": "Contact Us", "/accessibility": "Accessibility",
};
const LANG: Record<string, string> = { en: "English", es: "Spanish", pt: "Portuguese" };
const DEVICE: Record<string, string> = { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" };
const source = (k: string) => (k === "direct" ? "Direct or bookmark" : k);

function Bars({ rows, label }: { rows: Row[]; label: (k: string) => string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return <p className="an-empty">No data yet.</p>;
  return (
    <div className="an-bars">
      {rows.map((r) => (
        <div key={r.key} className="an-bar">
          <span className="an-l">{label(r.key)}</span>
          <span className="an-t"><i style={{ width: `${(r.value / max) * 100}%` }} /></span>
          <b>{r.value.toLocaleString("en-US")}</b>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Summary | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let live = true;
    setState("loading");
    api<Summary>(`/analytics/summary?days=${days}`)
      .then((d) => { if (live) { setData(d); setState("ready"); } })
      .catch(() => { if (live) setState("error"); });
    return () => { live = false; };
  }, [days]);

  const maxDay = Math.max(1, ...(data?.daily ?? []).map((d) => d.pageviews));
  const perVisit = data && data.totals.visits ? (data.totals.pageviews / data.totals.visits).toFixed(1) : "—";
  const mobile = data?.devices.find((d) => d.key === "mobile")?.value ?? 0;
  const mobilePct = data && data.totals.visits ? Math.round((mobile / data.totals.visits) * 100) : 0;

  return (
    <>
      <PageHeader mode="data" title="Analytics" sub="Who visits cloverleafaws.com, what they read and where they come from" />
      <div className="content enter">
        <div className="toolbar">
          <div className="chips">
            {RANGES.map((r) => (
              <button key={r} className={days === r ? "fchip on" : "fchip"} onClick={() => setDays(r)}>
                Last {r} days
              </button>
            ))}
          </div>
          <a className="fchip" href="https://cloverleafaws.com" target="_blank" rel="noopener" style={{ marginLeft: "auto" }}>
            Open the website ↗
          </a>
        </div>

        <ComplianceCard />

        {state === "error" && (
          <Card title="Analytics"><div className="body loadcard"><span>We couldn&apos;t load the numbers right now.</span></div></Card>
        )}

        {state !== "error" && (
          <>
            <div className="kpis stagger">
              <div className="kpi acc-ok"><div className="l">Visits</div><div className="v">{data ? data.totals.visits.toLocaleString("en-US") : "…"}</div><div className="d">people arriving at the site</div></div>
              <div className="kpi"><div className="l">Page views</div><div className="v">{data ? data.totals.pageviews.toLocaleString("en-US") : "…"}</div><div className="d">every page opened</div></div>
              <div className="kpi acc-gold"><div className="l">Pages per visit</div><div className="v">{perVisit}</div><div className="d">how far people read</div></div>
              <div className="kpi"><div className="l">On mobile</div><div className="v">{data ? `${mobilePct}%` : "…"}</div><div className="d">of visits</div></div>
            </div>

            <Card title={`Daily traffic — last ${days} days`}>
              <div className="body">
                <div className="an-chart" role="img" aria-label={`Page views per day for the last ${days} days`}>
                  {(data?.daily ?? []).map((d) => (
                    <span key={d.date} className="an-col" title={`${d.date}: ${d.pageviews} page views, ${d.visits} visits`}>
                      <i style={{ height: `${(d.pageviews / maxDay) * 100}%` }} />
                      <em style={{ height: `${(d.visits / maxDay) * 100}%` }} />
                    </span>
                  ))}
                </div>
                <div className="an-legend"><span><i className="pv" /> Page views</span><span><i className="vi" /> Visits</span></div>
              </div>
            </Card>

            <div className="grid2" style={{ marginTop: 16 }}>
              <Card title="Most visited pages"><div className="body"><Bars rows={data?.pages ?? []} label={(k) => PAGE[k] ?? k} /></div></Card>
              <Card title="Where visitors come from"><div className="body"><Bars rows={data?.sources ?? []} label={source} /></div></Card>
              <Card title="Language"><div className="body"><Bars rows={data?.languages ?? []} label={(k) => LANG[k] ?? k} /></div></Card>
              <Card title="Device"><div className="body"><Bars rows={data?.devices ?? []} label={(k) => DEVICE[k] ?? k} /></div></Card>
            </div>

            <p className="an-note">
              Measured without cookies and without personal data: no IP addresses, no tracking across sites, nothing
              that identifies a visitor, so no consent banner is needed. Automated traffic (search engine bots, monitors)
              is left out.{data?.since ? ` Collecting since ${new Date(data.since).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.` : " Collection starts with the first visit."}
            </p>
          </>
        )}
      </div>
    </>
  );
}
