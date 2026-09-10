"use client";

import { useState } from "react";
import { PageHeader, Badge, fmt } from "../ui";
import { certificates, facilityLabel } from "@/lib/data";

/**
 * Registro público de verificación.
 *
 * En el sistema real esta pantalla vive fuera del portal, en el dominio de
 * CloverLeaf, y no pide login: cualquier comprador teclea un número y confirma
 * si el certificado existe y sigue vigente.
 */
export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);

  const match = certificates.find(
    (c) => c.number.toLowerCase() === query.trim().toLowerCase(),
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
  };

  return (
    <>
      <PageHeader title="Public Verification Registry" sub="What a buyer sees when they check one of your certificates" />
      <div className="content">
        <div className="verify enter">
          <div className="box">
            <div className="box-in">
            <h2>Verify a CloverLeaf certificate</h2>
            <p style={{ color: "var(--muted)", marginTop: 0, marginBottom: 22, fontSize: 13.5 }}>
              Enter the certificate number exactly as it appears on the document.
            </p>

            <form onSubmit={submit}>
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setChecked(false); }}
                placeholder="CL-CC-2026-0142"
                aria-label="Certificate number"
              />
              <button type="submit">Verify</button>
            </form>

            {checked && (
              <div className="res">
                {match ? (
                  <>
                    <div style={{ marginBottom: 14 }}>
                      <Badge>{match.status}</Badge>
                    </div>
                    <div className="meta">
                      <div className="row"><span className="k">Certificate</span><span className="v mono">{match.number}</span></div>
                      <div className="row"><span className="k">Facility</span><span className="v">{(facilityLabel(match.facilityId) as { facility: string }).facility}</span></div>
                      <div className="row"><span className="k">Company</span><span className="v">{(facilityLabel(match.facilityId) as { client: string }).client}</span></div>
                      <div className="row"><span className="k">Species</span><span className="v">{(facilityLabel(match.facilityId) as { species: string }).species}</span></div>
                      <div className="row"><span className="k">Program</span><span className="v">{match.program}</span></div>
                      <div className="row"><span className="k">Issued</span><span className="v">{fmt(match.issued)}</span></div>
                      <div className="row"><span className="k">Valid until</span><span className="v">{fmt(match.expires)}</span></div>
                    </div>
                    {match.status === "Suspended" && (
                      <p style={{ color: "var(--crit)", fontSize: 13, marginBottom: 0 }}>
                        This certificate is currently suspended and must not be presented as valid.
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ color: "var(--crit)", margin: 0, fontSize: 13.5 }}>
                    No certificate found with that number. If it was presented to you as a CloverLeaf
                    certificate, please contact CloverLeaf directly.
                  </p>
                )}
              </div>
            )}

            <p style={{ color: "var(--faint)", fontSize: 12, marginTop: 24, marginBottom: 0 }}>
              Try <code className="mono">CL-CC-2026-0142</code> (active) or{" "}
              <code className="mono">CL-CC-2025-0071</code> (suspended).
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
