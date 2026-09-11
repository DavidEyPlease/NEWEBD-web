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
      <span><b>Hosting active</b> · paid through {fmt(ACCOUNT.nextDue)}</span>
      <span className="acct-s2">
        Next payment {usd(TOTAL, false)} USD{days !== null ? ` · in ${days} days` : ""}
      </span>
      <span className="acct-go">Hosting &amp; Billing →</span>
    </Link>
  );
}
