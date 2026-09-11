"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader, Card, Badge } from "../../ui";
import { ImageError, preparePhoto } from "@/lib/image";
import { GAP_LABEL, LANGS, gapsOf, type Lang, type Member } from "@/lib/site-team";
import { api, ApiError } from "@/lib/api";

/** Forma en la que la API devuelve cada ficha. */
type ApiMember = {
  id: string;
  order: number;
  name: string;
  positionI18n: Partial<Record<Lang, string>>;
  bio: Partial<Record<Lang, string>>;
  photo: string | null;
  published: boolean;
};

const fromApi = (m: ApiMember): Member => ({
  id: m.id,
  order: m.order,
  name: m.name,
  position: m.positionI18n.en ?? "",
  positionI18n: m.positionI18n,
  bio: m.bio,
  photo: m.photo,
  published: m.published,
});

const SITE_URL = "https://cloverleafaws.com/about-us";
/** Pausa tras la última tecla antes de guardar el texto. */
const SAVE_DELAY = 700;

type Sync = "idle" | "saving" | "saved" | "error";

export default function TeamManagerPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [selected, setSelected] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [sync, setSync] = useState<Sync>("idle");
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [overDrop, setOverDrop] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Copia síncrona de la lista: los guardados diferidos y el arrastre la leen
  // sin esperar a un render.
  const listRef = useRef<Member[]>([]);
  const commit = (next: Member[]) => {
    listRef.current = next;
    setMembers(next);
  };
  const patchLocal = (id: string, patch: Partial<Member>) =>
    commit(listRef.current.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      const r = await api<{ data: ApiMember[] }>("/team");
      const list = r.data.map(fromApi);
      listRef.current = list;
      setMembers(list);
      setSelected((s) => (s && list.some((m) => m.id === s) ? s : list[0]?.id ?? null));
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // --- Guardado en el servidor ----------------------------------------------
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const inflight = useRef(0);

  const run = async <T,>(fn: () => Promise<T>): Promise<{ ok: true; value: T } | { ok: false }> => {
    inflight.current += 1;
    setSync("saving");
    setSyncMsg(null);
    try {
      const value = await fn();
      inflight.current -= 1;
      if (inflight.current === 0 && timers.current.size === 0) setSync("saved");
      return { ok: true, value };
    } catch (err) {
      inflight.current -= 1;
      setSync("error");
      setSyncMsg(err instanceof ApiError ? err.message : "Could not save. Check your connection.");
      return { ok: false };
    }
  };

  /** Envía nombre, cargos y biografías tal como están ahora mismo. */
  const pushText = (id: string) => {
    timers.current.delete(id);
    const m = listRef.current.find((x) => x.id === id);
    if (!m) return;
    void run(() => api(`/team/${id}`, { method: "PATCH", body: { name: m.name, positionI18n: m.positionI18n, bio: m.bio } }));
  };

  const cancelText = (id: string) => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
  };

  const scheduleText = (id: string) => {
    cancelText(id);
    timers.current.set(id, setTimeout(() => pushText(id), SAVE_DELAY));
    setSync("saving");
  };

  // Al salir de la pantalla no se pierde lo último que se escribió; al cerrar
  // la pestaña con algo pendiente, el navegador pregunta.
  useEffect(() => {
    const pending = timers.current;
    const onUnload = (e: BeforeUnloadEvent) => {
      if (pending.size || inflight.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      for (const id of [...pending.keys()]) {
        cancelText(id);
        pushText(id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordered = [...members].sort((a, b) => a.order - b.order);
  const current = members.find((m) => m.id === selected) ?? ordered[0];

  const editText = (patch: Partial<Member>) => {
    if (!current) return;
    patchLocal(current.id, patch);
    scheduleText(current.id);
  };

  const updateBio = (value: string) => editText({ bio: { ...current!.bio, [lang]: value } });

  const updatePosition = (value: string) => {
    // El cargo en inglés es el que manda: es el que se muestra por defecto.
    const i18n = { ...current!.positionI18n, [lang]: value };
    editText(lang === "en" ? { position: value, positionI18n: i18n } : { positionI18n: i18n });
  };

  const setPublished = async (value: boolean) => {
    if (!current) return;
    const id = current.id;
    cancelText(id); // el texto pendiente viaja en la misma petición
    patchLocal(id, { published: value });
    const m = listRef.current.find((x) => x.id === id)!;
    const r = await run(() =>
      api(`/team/${id}`, { method: "PATCH", body: { name: m.name, positionI18n: m.positionI18n, bio: m.bio, published: value } }),
    );
    if (!r.ok) patchLocal(id, { published: !value });
  };

  // --- Orden ----------------------------------------------------------------
  const renumber = (list: Member[]) => list.map((m, i) => ({ ...m, order: i + 1 }));
  const idsInOrder = () => [...listRef.current].sort((a, b) => a.order - b.order).map((m) => m.id);
  const pushOrder = () => void run(() => api("/team/order", { method: "PUT", body: { ids: idsInOrder() } }));

  /** Mueve una ficha una posición. Sirve al teclado, que no puede arrastrar. */
  const move = (id: string, dir: -1 | 1) => {
    const list = [...listRef.current].sort((a, b) => a.order - b.order);
    const i = list.findIndex((m) => m.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    const [item] = list.splice(i, 1);
    list.splice(j, 0, item);
    commit(renumber(list));
    pushOrder();
  };

  /**
   * Arrastre para reordenar, con eventos de puntero (la API de drag-and-drop
   * de HTML5 no funciona en pantallas táctiles). La lista se recoloca en vivo
   * y el orden se guarda una sola vez, al soltar.
   */
  const dragId = useRef<string | null>(null);
  const orderAtStart = useRef<string>("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  const onGripDown = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* seguimos sin captura: los eventos llegan mientras no se salga del asa */
    }
    dragId.current = id;
    orderAtStart.current = idsInOrder().join();
    setDraggingId(id);
  };

  const onGripMove = (e: React.PointerEvent) => {
    if (!dragId.current || !rowsRef.current) return;
    const rows = Array.from(rowsRef.current.querySelectorAll<HTMLElement>("[data-mid]"));
    const overIdx = rows.findIndex((r) => {
      const b = r.getBoundingClientRect();
      return e.clientY >= b.top && e.clientY <= b.bottom;
    });
    if (overIdx < 0) return;
    const overId = rows[overIdx].dataset.mid;
    if (!overId || overId === dragId.current) return;

    const list = [...listRef.current].sort((a, b) => a.order - b.order);
    const from = list.findIndex((m) => m.id === dragId.current);
    if (from < 0) return;
    const [item] = list.splice(from, 1);
    list.splice(overIdx, 0, item);
    commit(renumber(list));
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
    if (idsInOrder().join() !== orderAtStart.current) pushOrder();
  };

  // --- Fotos ----------------------------------------------------------------
  const applyPhoto = async (file: File) => {
    if (!current) return;
    const id = current.id;
    setPhotoError(null);
    setUploading(true);
    try {
      const image = await preparePhoto(file); // reducida en el navegador: sube rápido
      const r = await run(() => api<ApiMember>(`/team/${id}/photo`, { method: "PUT", body: { image } }));
      if (r.ok) patchLocal(id, { photo: r.value.photo });
    } catch (err) {
      setPhotoError(err instanceof ImageError ? err.message : "Could not use that image.");
    } finally {
      setUploading(false);
    }
  };

  const clearPhoto = async () => {
    if (!current) return;
    const id = current.id;
    setPhotoError(null);
    const r = await run(() => api<ApiMember>(`/team/${id}/photo`, { method: "DELETE" }));
    if (r.ok) patchLocal(id, { photo: null });
  };

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void applyPhoto(file);
    e.target.value = ""; // permite volver a elegir el mismo archivo
  };

  const onDropPhoto = (e: React.DragEvent) => {
    e.preventDefault();
    setOverDrop(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void applyPhoto(file);
  };

  // --- Altas y bajas --------------------------------------------------------
  const addMember = async () => {
    const r = await run(() => api<ApiMember>("/team", { method: "POST", body: {} }));
    if (!r.ok) return;
    commit([...listRef.current, fromApi(r.value)]);
    setSelected(r.value.id);
    setLang("en");
  };

  const removeMember = async (id: string) => {
    cancelText(id);
    const r = await run(() => api(`/team/${id}`, { method: "DELETE" }));
    setConfirmDelete(null);
    if (!r.ok) return;
    const rest = renumber(listRef.current.filter((m) => m.id !== id).sort((a, b) => a.order - b.order));
    commit(rest);
    setSelected(rest[0]?.id ?? null);
  };

  const needsWork = members.filter((m) => gapsOf(m).length > 0).length;
  const publishable = members.filter((m) => m.published && gapsOf(m).length === 0).length;
  const live = members.filter((m) => m.published && m.name.trim()).length;

  const header = (
    <PageHeader mode="live" title="Our Team" sub="The team shown on your About Us page — drag to reorder, click to edit" />
  );

  if (loadState !== "ready") {
    return (
      <>
        {header}
        <div className="content enter">
          <Card title="Our Team">
            <div className="body loadcard">
              {loadState === "loading" ? (
                <span>Loading your team…</span>
              ) : (
                <>
                  <span>We couldn&apos;t load your team right now.</span>
                  <button className="btn-quiet" onClick={() => void load()}>Try again</button>
                </>
              )}
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <div className="content enter">
        <div className="kpis stagger">
          <div className="kpi"><div className="l">Team profiles</div><div className="v">{members.length}</div><div className="d">{members.filter((m) => m.bio.en?.trim()).length} with a biography, {members.filter((m) => m.photo).length} with a photo</div></div>
          <div className="kpi acc-warn"><div className="l">Need your attention</div><div className="v">{needsWork}</div><div className="d">missing data or translations</div></div>
          <div className="kpi acc-ok"><div className="l">Complete &amp; published</div><div className="v">{publishable}</div><div className="d">full profile in all three languages</div></div>
          <div className="kpi"><div className="l">Live on your website</div><div className="v">{live}</div><div className="d"><a className="kpi-link" href={SITE_URL} target="_blank" rel="noopener">See About Us ↗</a></div></div>
        </div>

        <div className="split" style={{ marginTop: 4 }}>
          <Card title={`Profiles — ${members.length}`}>
            <div className="body">
              <button className="btn-solid" style={{ width: "100%", marginBottom: 12 }} onClick={() => void addMember()}>
                + Add team member
              </button>
              {ordered.length === 0 && (
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>No profiles yet.</p>
              )}
              <div className="tmlist" ref={rowsRef}>
                {ordered.map((m, i) => {
                  const gaps = gapsOf(m);
                  return (
                    <div
                      key={m.id}
                      data-mid={m.id}
                      className={`tmrow${m.id === current?.id ? " on" : ""}${m.id === draggingId ? " drag" : ""}`}
                      onClick={() => { setSelected(m.id); setPhotoError(null); setConfirmDelete(null); }}
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

          {current ? (
            <Card title={current.name ? `Editing — ${current.name}` : "Editing — unidentified profile"}>
              <div className="body">
                <label className="fld">
                  <span>Name</span>
                  <input value={current.name} onChange={(e) => editText({ name: e.target.value })} placeholder="Full name" maxLength={120} />
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
                    maxLength={200}
                  />
                </label>

                <label className="fld">
                  <span>Biography ({lang.toUpperCase()})</span>
                  <textarea
                    className="note-input"
                    rows={9}
                    value={current.bio[lang] ?? ""}
                    onChange={(e) => updateBio(e.target.value)}
                    placeholder={lang === "en" ? "Their biography" : "Translation pending — if empty, the website shows the English text"}
                    maxLength={4000}
                  />
                </label>

                <div className="fld">
                  <span>Photo</span>
                  <div
                    className={`drop${overDrop ? " over" : ""}${uploading ? " busy" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setOverDrop(true); }}
                    onDragLeave={() => setOverDrop(false)}
                    onDrop={onDropPhoto}
                    onClick={() => fileRef.current?.click()}
                  >
                    {current.photo
                      ? <img src={current.photo} alt={current.name || "Team member"} />
                      : <span className="drop-none">No photo</span>}
                    <div className="drop-txt">
                      <strong>{uploading ? "Uploading…" : current.photo ? "Replace photo" : "Upload a photo"}</strong>
                      <span>Drop an image here, or click to choose one</span>
                    </div>
                    {current.photo && (
                      <button
                        className="drop-x"
                        onClick={(e) => { e.stopPropagation(); void clearPhoto(); }}
                        aria-label="Remove photo"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} style={{ display: "none" }} />
                  {photoError && <p className="drop-err">{photoError}</p>}
                </div>

                <div className="fld-row">
                  <label className="tgl">
                    <input type="checkbox" checked={current.published} onChange={(e) => void setPublished(e.target.checked)} />
                    <span>Show on the website</span>
                  </label>
                </div>

                <div className="danger">
                  {confirmDelete === current.id ? (
                    <>
                      <span>Remove {current.name || "this profile"} from the team?</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn-danger" onClick={() => void removeMember(current.id)}>Yes, remove</button>
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

                <div className={`sync ${sync}`} role="status" aria-live="polite">
                  <span>
                    <i className="dot" />
                    {sync === "saving" && "Saving…"}
                    {sync === "saved" && (current.published
                      ? "Saved — live on your website within a minute"
                      : "Saved — hidden from the website until you publish it")}
                    {sync === "idle" && "Changes save automatically"}
                    {sync === "error" && (syncMsg ?? "Could not save")}
                  </span>
                  {sync === "error"
                    ? <button className="btn-quiet" onClick={() => void load()}>Reload</button>
                    : <a className="btn-quiet" href={SITE_URL} target="_blank" rel="noopener">View page ↗</a>}
                </div>
              </div>
            </Card>
          ) : (
            <Card title="Editing">
              <div className="body loadcard"><span>Add a team member to get started.</span></div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
