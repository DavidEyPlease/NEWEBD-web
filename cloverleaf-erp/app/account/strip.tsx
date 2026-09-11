"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fmt } from "../ui";
import { ACCOUNT, TOTAL, daysUntil, usd } from "@/lib/account";

/** Aviso del Dashboard: lo único real en esa pantalla, y así lo dice. */
export function HostingStrip() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntil(ACCOUNT.nextDue)), []);

  return (
    <Link href="/account/" className="acct-strip">
      <span className="acct-dot" />
      <span className="acct-tag">Your account</span>
      <span><b>Hosting paid ✓</b> {usd(TOTAL, false)} USD on {fmt(ACCOUNT.lastPaid)}</span>
      <span className="acct-s2">
        Next payment: {usd(TOTAL, false)} USD on {fmt(ACCOUNT.nextDue)}{days !== null ? ` (in ${days} days)` : ""}
      </span>
      <span className="acct-go">Hosting &amp; Billing →</span>
    </Link>
  );
}
