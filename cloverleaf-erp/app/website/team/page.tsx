"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader, Card, Badge } from "../../ui";
import {
  GAP_LABEL, LANGS, SEED_VERSION, blankMember, gapsOf, recoveredTeam,
  type Lang, type Member,
} from "@/lib/site-team";

const STORE = "clv-site-team";
const STORE_VERSION = "clv-site-team-v";

export default function TeamManagerPage() {
  const [members, setMembers] = useState<Member[]>(recoveredTeam);
  const [selected, setSelected] = useState<string>(recoveredTeam[0].id);
  const [lang, setLang] = useState<Lang>("en");
  const [dirty, setDirty] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Si la semilla cambió (alguien entró o salió del equipo), el borrador
      // guardado en este navegador queda obsoleto y se descarta.
      const stored = Number(localStorage.getItem(STORE_VERSION) ?? 0);
      if (stored !== SEED_VERSION) {
        localStorage.removeItem(STORE);
        localStorage.setItem(STORE_VERSION, String(SEED_VERSION));
        return;
      }
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

  /** Reasigna order 1..n siguiendo el array recibido. */
  const renumber = (list: Member[]) => list.map((m, i) => ({ ...m, order: i + 1 }));

  /** Mueve una ficha una posición. Sirve al teclado, que no puede arrastrar. */
  const move = (id: string, dir: -1 | 1) => {
    const list = [...members].sort((a, b) => a.order - b.order);
    const i = list.findIndex((m) => m.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    const [item] = list.splice(i, 1);
    list.splice(j, 0, item);
    persist(renumber(list));
  };

  /**
   * Arrastre para reordenar.
   *
   * Con eventos de puntero, no con la API de drag-and-drop de HTML5: aquella no
   * funciona en pantallas táctiles. La lista se recoloca en vivo mientras el
   * dedo o el ratón se mueven, así que se ve el resultado antes de soltar.
   */
  const dragId = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onGripDown = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    // La captura puede fallar si el puntero ya no está activo; el arrastre no
    // debe romperse por eso.
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* seguimos sin captura: los eventos llegan mientras no se salga del asa */
    }
    dragId.current = id;
    setDraggingId(id);
  };

  const onGripMove = (e: React.PointerEvent) => {
    if (!dragId.current || !listRef.current) return;
    const rows = Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-mid]"));
    const overIdx = rows.findIndex((r) => {
      const b = r.getBoundingClientRect();
      return e.clientY >= b.top && e.clientY <= b.bottom;
    });
    if (overIdx < 0) return;

    const overId = rows[overIdx].dataset.mid;
    if (!overId || overId === dragId.current) return;

    const list = [...members].sort((a, b) => a.order - b.order);
    const from = list.findIndex((m) => m.id === dragId.current);
    if (from < 0) return;
    const [item] = list.splice(from, 1);
    list.splice(overIdx, 0, item);
    persist(renumber(list));
  };

  const onGripUp = (e: React.PointerEvent) => {
    if (!dragId.current) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* nunca se llegó a capturar */
    }
    dragId.current = null;
    setDraggingId(null);
  };

  const addMember = () => {
    const next = [...members, blankMember(members.length + 1)];
    persist(next);
    setSelected(next[next.length - 1].id);
    setLang("en");
  };

  const removeMember = (id: string) => {
    const rest = members
      .filter((m) => m.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((m, i) => ({ ...m, order: i + 1 })); // recolocar el orden sin huecos
    persist(rest);
    setConfirmDelete(null);
    if (rest.length) setSelected(rest[0].id);
  };

  const reset = () => {
    try { localStorage.removeItem(STORE); } catch { /* nada que limpiar */ }
    setMembers(recoveredTeam);
    setDirty(false);
    setSelected(recoveredTeam[0].id);
  };

  const needsWork = members.filter((m) => gapsOf(m).length > 0).length;
  const publishable = members.filter((m) => m.published && gapsOf(m).length === 0).length;

  return (
    <>
      <PageHeader title="Our Team" sub="The team shown on your About Us page — drag to reorder, click to edit" />
      <div className="content enter">
        <div className="kpis stagger">
          <div className="kpi"><div className="l">Team profiles</div><div className="v">{members.length}</div><div className="d">{members.filter((m) => m.bio.en?.trim()).length} with a biography, {members.filter((m) => m.photo).length} with a photo</div></div>
          <div className="kpi acc-warn"><div className="l">Need your attention</div><div className="v">{needsWork}</div><div className="d">missing data or translations</div></div>
          <div className="kpi acc-ok"><div className="l">Ready to publish</div><div className="v">{publishable}</div><div className="d">complete in all three languages</div></div>
          <div className="kpi acc-crit"><div className="l">Live on the site today</div><div className="v">0</div><div className="d">the section is hidden — the API is gone</div></div>
        </div>

        <div className="split" style={{ marginTop: 4 }}>
          <Card title={`Profiles — ${members.length}`}>
            <div className="body">
              <button className="btn-solid" style={{ width: "100%", marginBottom: 12 }} onClick={addMember}>
                + Add team member
              </button>
              <div className="tmlist" ref={listRef}>
                {ordered.map((m, i) => {
                  const gaps = gapsOf(m);
                  return (
                    <div
                      key={m.id}
                      data-mid={m.id}
                      className={`tmrow${m.id === current.id ? " on" : ""}${m.id === draggingId ? " drag" : ""}`}
                      onClick={() => setSelected(m.id)}
                    >
                      {/* El asa también responde al teclado: arrastrar no es
                          una opción para quien navega sin ratón. */}
                      <button
                        className="tmgrip"
                        onPointerDown={(e) => onGripDown(e, m.id)}
                        onPointerMove={onGripMove}
                        onPointerUp={onGripUp}
                        onPointerCancel={onGripUp}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp") { e.preventDefault(); move(m.id, -1); }
                          if (e.key === "ArrowDown") { e.preventDefault(); move(m.id, 1); }
                        }}
                        aria-label={`Reorder ${m.name || "profile"} — position ${i + 1} of ${ordered.length}`}
                        title="Drag to reorder"
                      >
                        <span className="grip">⠿</span>
                        <span className="pos">{i + 1}</span>
                      </button>
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

              <div className="danger">
                {confirmDelete === current.id ? (
                  <>
                    <span>Remove {current.name || "this profile"} from the team?</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-danger" onClick={() => removeMember(current.id)}>Yes, remove</button>
                      <button className="btn-quiet" onClick={() => setConfirmDelete(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>No longer part of the team?</span>
                    <button className="btn-quiet" onClick={() => setConfirmDelete(current.id)}>Remove profile</button>
                  </>
                )}
              </div>

              {dirty && (
                <div className="savedrow">
                  <span>Changes saved on this device</span>
                  <button className="btn-quiet" onClick={reset}>Discard changes</button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
