"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge, fmt } from "../ui";
import { ACCOUNT, PAYMENTS, SUBTOTAL, TOTAL, VAT, daysUntil, usd } from "@/lib/account";

export default function AccountPage() {
  // La cuenta atrás se calcula en el navegador: el HTML es estático.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntil(ACCOUNT.nextDue)), []);

  return (
    <>
      <PageHeader mode="account" title="Hosting & Billing" sub="Your website's server and plan with NEWEBD" />
      <div className="content enter">
        <div className="kpis stagger">
          <div className="kpi acc-ok">
            <div className="l">Service</div>
            <div className="v">Active</div>
            <div className="d">server ready since {fmt(ACCOUNT.liveSince)}</div>
          </div>
          <div className="kpi">
            <div className="l">Plan</div>
            <div className="v">Annual</div>
            <div className="d">{usd(ACCOUNT.monthlyUsd, false)}/month, billed yearly</div>
          </div>
          <div className="kpi acc-gold">
            <div className="l">Next payment</div>
            <div className="v" style={{ fontSize: 23 }}>{fmt(ACCOUNT.nextDue)}</div>
            <div className="d">{days === null ? " " : `in ${days} days`}</div>
          </div>
          <div className="kpi">
            <div className="l">Amount due then</div>
            <div className="v">{usd(TOTAL, false)}</div>
            <div className="d">USD, VAT included</div>
          </div>
        </div>

        <div className="split">
          <Card title="Payments">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Date</th><th>Concept</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {PAYMENTS.map((p) => (
                    <tr key={p.date}>
                      <td>{fmt(p.date)}</td>
                      <td><div className="strong">{p.concept}</div><div className="muted">{p.period}</div></td>
                      <td style={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{usd(p.amount)} USD</td>
                      <td><Badge>{p.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="How the amount is calculated">
            <div className="body">
              <div className="acct-break">
                <div><span>{usd(ACCOUNT.monthlyUsd)} × {ACCOUNT.months} months</span><b>{usd(SUBTOTAL)}</b></div>
                <div><span>VAT (IVA, Mexico) {Math.round(ACCOUNT.vatRate * 100)}%</span><b>{usd(VAT)}</b></div>
                <div className="tot"><span>Total per year</span><b>{usd(TOTAL)} USD</b></div>
              </div>
              <p className="acct-note">
                Your next payment of {usd(TOTAL)} USD is due on {fmt(ACCOUNT.nextDue)} and covers
                Sep 10, 2027 – Sep 10, 2028.
              </p>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 16 }}>
          <Card title="Your service">
            <div className="body">
              <div className="acct-rows">
                <div><span><span className="k">Website</span> <span className="s">· {ACCOUNT.site}</span></span><Badge>Live</Badge></div>
                <div><span><span className="k">Server</span> <span className="s">· NEWEBD, migrated and live since {fmt(ACCOUNT.liveSince)}</span></span><Badge>Active</Badge></div>
                <div><span><span className="k">Secure connection</span> <span className="s">· HTTPS on your site, renewed automatically</span></span><Badge>Active</Badge></div>
                <div><span><span className="k">Admin</span> <span className="s">· {ACCOUNT.admin} — Our Team and Site Feedback</span></span><Badge>Active</Badge></div>
              </div>
              <p className="acct-note">
                Questions about your plan or an invoice?{" "}
                <a href="https://newebd.com/contacto" target="_blank" rel="noopener" className="kpi-link">Write to NEWEBD ↗</a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
