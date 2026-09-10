"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "../../ui";
import {
  GAP_LABEL, LANGS, RECOVERY, gapsOf, recoveredTeam,
  type Lang, type Member,
} from "@/lib/site-team";

const STORE = "clv-site-team";

export default function TeamManagerPage() {
  const [members, setMembers] = useState<Member[]>(recoveredTeam);
  const [selected, setSelected] = useState<string>(recoveredTeam[0].id);
  const [lang, setLang] = useState<Lang>("en");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) setMembers(JSON.parse(raw) as Member[]);
    } catch {
      /* sin almacenamiento: se trabaja sobre el borrador recuperado */
    }
  }, []);

  const persist = useCallback((next: Member[]) => {
    setMembers(next);
    setDirty(true);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* el guardado puede fallar en modo privado; los cambios siguen en pantalla */
    }
  }, []);

  const ordered = [...members].sort((a, b) => a.order - b.order);
  const current = members.find((m) => m.id === selected) ?? ordered[0];

  const update = (patch: Partial<Member>) =>
    persist(members.map((m) => (m.id === current.id ? { ...m, ...patch } : m)));

  const updateBio = (value: string) =>
    update({ bio: { ...current.bio, [lang]: value } });

  const updatePosition = (value: string) => {
    // El cargo en inglés es el que manda: es el que se muestra por defecto.
    const i18n = { ...current.positionI18n, [lang]: value };
    update(lang === "en" ? { position: value, positionI18n: i18n } : { positionI18n: i18n });
  };

  /** Mueve una ficha en el orden de aparición del sitio. */
  const move = (id: string, dir: -1 | 1) => {
    const list = [...members].sort((a, b) => a.order - b.order);
    const i = list.findIndex((m) => m.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i].order, list[j].order] = [list[j].order, list[i].order];
    persist(list);
  };

  const reset = () => {
    try { localStorage.removeItem(STORE); } catch { /* nada que limpiar */ }
    setMembers(recoveredTeam);
    setDirty(false);
  };

  const needsWork = members.filter((m) => gapsOf(m).length > 0).length;
  const publishable = members.filter((m) => m.published && gapsOf(m).length === 0).length;

  return (
    <>
      <PageHeader title="Our Team" sub="The section on your About Us page — recovered and waiting for your review" />
      <div className="content enter">
        <div className="recov">
          <div>
            <strong>This content was recovered from web archives, not from a live source.</strong>
            <p>
              Biographies come from your site as archived on {RECOVERY.bios.date}; photos from{" "}
              {RECOVERY.photos.date}. Your team has almost certainly changed since. Nothing here is
              published to your website — review it, correct it, and tell us when it is right.
            </p>
          </div>
        </div>

        <div className="kpis stagger" style={{ marginTop: 16 }}>
          <div className="kpi"><div className="l">Recovered profiles</div><div className="v">{members.length}</div><div className="d">7 with a biography, 6 with a photo</div></div>
          <div className="kpi acc-warn"><div className="l">Need your attention</div><div className="v">{needsWork}</div><div className="d">missing data or translations</div></div>
          <div className="kpi acc-ok"><div className="l">Ready to publish</div><div className="v">{publishable}</div><div className="d">complete in all three languages</div></div>
          <div className="kpi acc-crit"><div className="l">Live on the site today</div><div className="v">0</div><div className="d">the section is hidden — the API is gone</div></div>
        </div>

        <div className="split" style={{ marginTop: 4 }}>
          <Card title={`Profiles — ${members.length}`}>
            <div className="body">
              <div className="tmlist">
                {ordered.map((m, i) => {
                  const gaps = gapsOf(m);
                  return (
                    <div
                      key={m.id}
                      className={`tmrow${m.id === current.id ? " on" : ""}`}
                      onClick={() => setSelected(m.id)}
                    >
                      <div className="tmord">
                        <button onClick={(e) => { e.stopPropagation(); move(m.id, -1); }} disabled={i === 0} aria-label="Move up">▲</button>
                        <span>{i + 1}</span>
                        <button onClick={(e) => { e.stopPropagation(); move(m.id, 1); }} disabled={i === ordered.length - 1} aria-label="Move down">▼</button>
                      </div>
                      {m.photo
                        ? <img className="tmph" src={m.photo} alt={m.name || "Unidentified"} />
                        : <span className="tmph tmph-none">no photo</span>}
                      <div className="tmb">
                        <div className="strong">{m.name || <em style={{ color: "var(--faint)" }}>Unidentified</em>}</div>
                        <div className="muted">{m.position || "—"}</div>
                        {gaps.length > 0 && (
                          <div className="tmgaps">
                            {gaps.map((g) => <span key={g} className="gap">{GAP_LABEL[g]}</span>)}
                          </div>
                        )}
                      </div>
                      <Badge>{m.published ? "Published" : "Hidden"}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card title={current.name ? `Editing — ${current.name}` : "Editing — unidentified profile"}>
            <div className="body">
              <label className="fld">
                <span>Name</span>
                <input value={current.name} onChange={(e) => update({ name: e.target.value })} placeholder="Full name" />
              </label>

              <div className="chips" style={{ margin: "14px 0 10px" }}>
                {LANGS.map((l) => (
                  <button key={l.code} className={lang === l.code ? "fchip on" : "fchip"} onClick={() => setLang(l.code)}>
                    {l.label}
                    {!current.bio[l.code]?.trim() && <span className="dotmiss" />}
                  </button>
                ))}
              </div>

              <label className="fld">
                <span>Position ({lang.toUpperCase()})</span>
                <input
                  value={current.positionI18n[lang] ?? ""}
                  onChange={(e) => updatePosition(e.target.value)}
                  placeholder={lang === "en" ? "e.g. Director of Global Operations" : "Translate the position"}
                />
              </label>

              <label className="fld">
                <span>Biography ({lang.toUpperCase()})</span>
                <textarea
                  className="note-input"
                  rows={9}
                  value={current.bio[lang] ?? ""}
                  onChange={(e) => updateBio(e.target.value)}
                  placeholder={lang === "en" ? "Their biography" : "Translation pending — this never made it out of the old database"}
                />
              </label>

              <div className="fld-row">
                <label className="tgl">
                  <input type="checkbox" checked={current.published} onChange={(e) => update({ published: e.target.checked })} />
                  <span>Show on the website</span>
                </label>
                {current.photo && <span className="muted">Photo: {current.photo.split("/").pop()}</span>}
              </div>

              {dirty && (
                <div className="savedrow">
                  <span>Changes saved on this device</span>
                  <button className="btn-quiet" onClick={reset}>Reset to recovered</button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
