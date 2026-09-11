"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aviso de demo con la marca de NEWEBD.
 *
 * Sale en la primera visita y se puede reabrir desde el menú o la barra
 * superior. Deja claro qué se puede usar de verdad (Site Feedback y Our Team)
 * y que el resto es una vista previa con datos de muestra.
 */
const KEY = "clv-demo-intro-v1";
const OPEN_EVENT = "clv:open-demo";

export function openDemoModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function DemoInfoButton() {
  return (
    <button className="demobar-btn" onClick={openDemoModal}>
      What is this?
    </button>
  );
}

export function DemoModal() {
  const [open, setOpen] = useState(false);
  const primary = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* sin almacenamiento: se muestra, y ya */
    }
    if (!seen) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* volverá a salir en la próxima visita; no pasa nada */
    }
  };

  useEffect(() => {
    if (!open) return;
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="nw-overlay" role="dialog" aria-modal="true" aria-labelledby="nw-title" onClick={close}>
      <div className="nw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nw-glow" aria-hidden />
        <div className="nw-head">
          <img src="/brand/newebd-negativo.svg" alt="NEWEBD" className="nw-logo" />
          <span className="nw-eyebrow">Demo</span>
        </div>

        <h2 id="nw-title">
          A preview of your <span className="nw-g">new platform.</span>
        </h2>
        <p className="nw-lede">
          NEWEBD built this demo so you can see how CloverLeaf&apos;s certification work would run in one
          place. Everything here can be tailored to how you work. Two parts are already live; the rest shows what&apos;s coming, with sample data.
        </p>

        <div className="nw-cols">
          <div className="nw-col live">
            <b>Yours to use today</b>
            <ul>
              <li><strong>Site Feedback</strong> — mark any part of your website and tell us what you&apos;d change.</li>
              <li><strong>Our Team</strong> — edit the profiles, photos, order and translations shown on your About Us page.</li>
            </ul>
          </div>
          <div className="nw-col">
            <b>Preview with sample data</b>
            <ul>
              <li>Leads, clients, audits, certificates, team and social media.</li>
              <li>Nothing there is real client information.</li>
            </ul>
          </div>
        </div>

        <p className="nw-note">
          Site Feedback and Our Team are connected: notes reach NEWEBD as soon as you send them, and team changes
          show on cloverleafaws.com within a minute.
        </p>

        <div className="nw-actions">
          <button ref={primary} className="nw-btn" onClick={close}>
            Explore the demo →
          </button>
          <a className="nw-ghost" href="https://newebd.com/cloverleaf" target="_blank" rel="noopener">
            See NEWEBD&apos;s proposal
          </a>
        </div>
      </div>
    </div>
  );
}
