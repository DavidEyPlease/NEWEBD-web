"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader, Card, Badge } from "../ui";
import { api, ApiError } from "@/lib/api";
import { useSession } from "../session";
import { ComplianceStrip } from "./compliance";
import { NOTE_KINDS, sitePages, type NoteKind, type SiteNote } from "@/lib/site-pages";

/** Rectángulo en coordenadas del contenedor mostrado (no de la imagen real). */
type Box = { x: number; y: number; w: number; h: number };

const norm = (a: { x: number; y: number }, b: { x: number; y: number }): Box => ({
  x: Math.min(a.x, b.x),
  y: Math.min(a.y, b.y),
  w: Math.abs(b.x - a.x),
  h: Math.abs(b.y - a.y),
});

export default function WebsitePage() {
  const [pageSlug, setPageSlug] = useState(sitePages[0].slug);
  const [notes, setNotes] = useState<SiteNote[]>([]);
  const [draft, setDraft] = useState<Box | null>(null);
  // El origen del arrastre va en un ref, no en estado: un ref se actualiza al
  // instante y el primer mousemove ya lo ve, sin esperar a un re-render.
  const dragFrom = useRef<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("");
  const [kind, setKind] = useState<NoteKind>("change");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const { user } = useSession();

  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const page = sitePages.find((p) => p.slug === pageSlug)!;

  // --- Notas en el servidor: llegan a NEWEBD en cuanto se envían ------------
  const load = useCallback(async () => {
    try {
      const r = await api<{ data: SiteNote[] }>("/feedback");
      setNotes(r.data);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // --- Selección de la zona -------------------------------------------------
  const pointIn = (e: React.MouseEvent) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const pointFromTouch = (t: React.Touch) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };

  /**
   * En táctil el mismo gesto podría querer decir dos cosas: desplazar la
   * captura (que es muy alta) o marcar una zona. Se decide con la dirección
   * del primer movimiento: horizontal marca, vertical deja desplazar.
   */
  const touchIntent = useRef<"undecided" | "select" | "scroll">("undecided");

  const onTouchStart = (e: React.TouchEvent) => {
    const p = pointFromTouch(e.touches[0]);
    dragFrom.current = p;
    touchIntent.current = "undecided";
    setDraft(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragFrom.current) return;
    const p = pointFromTouch(e.touches[0]);

    if (touchIntent.current === "undecided") {
      const dx = Math.abs(p.x - dragFrom.current.x);
      const dy = Math.abs(p.y - dragFrom.current.y);
      if (dx < 10 && dy < 10) return; // aún no hay dirección clara
      touchIntent.current = dx > dy ? "select" : "scroll";
      if (touchIntent.current === "select") setDragging(true);
    }

    if (touchIntent.current === "scroll") return; // el navegador desplaza
    e.preventDefault();
    setDraft(norm(dragFrom.current, p));
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!dragFrom.current) return;
    if (touchIntent.current !== "select") {
      dragFrom.current = null;
      return;
    }
    const t = e.changedTouches[0];
    const box = norm(dragFrom.current, pointFromTouch(t));
    dragFrom.current = null;
    setDragging(false);
    setDraft(box.w >= 24 && box.h >= 24 ? box : null);
  };

  const onDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const p = pointIn(e);
    dragFrom.current = p;
    setDragging(true);
    setDraft({ x: p.x, y: p.y, w: 0, h: 0 });
  };

  const onMove = (e: React.MouseEvent) => {
    if (!dragFrom.current) return;
    setDraft(norm(dragFrom.current, pointIn(e)));
  };

  const onUp = (e: React.MouseEvent) => {
    if (!dragFrom.current) return;
    // El tamaño se calcula aquí y no se lee del estado, que en un arrastre
    // rápido podría ir un render por detrás.
    const box = norm(dragFrom.current, pointIn(e));
    dragFrom.current = null;
    setDragging(false);
    // Un clic suelto no es una selección: hace falta un área con sentido.
    setDraft(box.w >= 24 && box.h >= 24 ? box : null);
  };

  /** Recorta la región marcada de la captura y la devuelve como JPEG base64. */
  const crop = (box: Box): { thumb: string; region: Box } => {
    const img = imgRef.current!;
    const scale = page.width / img.clientWidth; // mostrado → real
    // Recortada a los límites de la captura: el arrastre puede salirse del borde.
    const x = Math.max(0, Math.round(box.x * scale));
    const y = Math.max(0, Math.round(box.y * scale));
    const region = {
      x,
      y,
      w: Math.max(1, Math.min(page.width - x, Math.round(box.w * scale))),
      h: Math.max(1, Math.min(page.height - y, Math.round(box.h * scale))),
    };

    const canvas = document.createElement("canvas");
    // Tope de ancho para que el recorte no pese de más al guardarlo.
    const outW = Math.min(region.w, 560);
    const ratio = outW / region.w;
    canvas.width = outW;
    canvas.height = Math.round(region.h * ratio);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, region.x, region.y, region.w, region.h, 0, 0, canvas.width, canvas.height);

    return { thumb: canvas.toDataURL("image/jpeg", 0.75), region };
  };

  const save = async () => {
    if (!draft || text.trim().length < 3 || saving) return;
    setSaving(true);
    setError(null);
    try {
      const { thumb, region } = crop(draft);
      const note = await api<SiteNote>("/feedback", {
        method: "POST",
        body: {
          pageSlug: page.slug,
          pageUrl: page.url,
          kind,
          text: text.trim(),
          region,
          thumb,
          viewport: { width: Math.round(window.innerWidth), height: Math.round(window.innerHeight) },
        },
      });
      setNotes((list) => [note, ...list]);
      setDraft(null);
      setText("");
    } catch (err) {
      // El borrador se queda en pantalla para poder reintentar sin reescribirlo.
      setError(err instanceof ApiError ? err.message : "Could not send the note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await api(`/feedback/${id}`, { method: "DELETE" });
      setNotes((list) => list.filter((n) => n.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not remove the note.");
    }
  };

  const forPage = notes.filter((n) => n.pageSlug === page.slug);

  return (
    <>
      <PageHeader mode="live" title="Site Feedback" sub="Review your website, mark an area and tell us what to change" />
      <div className="content enter">
        <ComplianceStrip />
        <div className="toolbar">
          <div className="chips">
            {sitePages.map((p) => (
              <button
                key={p.slug}
                className={p.slug === pageSlug ? "fchip on" : "fchip"}
                onClick={() => { setPageSlug(p.slug); setDraft(null); }}
              >
                {p.title}
              </button>
            ))}
          </div>
          <a className="fchip" href={page.url} target="_blank" rel="noopener" style={{ marginLeft: "auto" }}>
            Open live page ↗
          </a>
        </div>

        <div className="split">
          <Card title={`${page.title} — drag over the area you want to comment on`}>
            <div className="body" style={{ padding: 14 }}>
              <div
                ref={stageRef}
                className={`stage${dragging ? " dragging" : ""}`}
                onMouseDown={onDown}
                onMouseMove={onMove}
                onMouseUp={onUp}
                onMouseLeave={onUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* La captura es del propio origen, así que el canvas puede
                    leerla para recortar sin quedar "tainted". */}
                <img ref={imgRef} src={page.image} alt={`${page.title} screenshot`} draggable={false} />

                {forPage.map((n, i) => {
                  const img = imgRef.current;
                  const s = img ? img.clientWidth / page.width : 0;
                  if (!s) return null;
                  return (
                    <span
                      key={n.id}
                      className="pin"
                      style={{ left: n.region.x * s, top: n.region.y * s, width: n.region.w * s, height: n.region.h * s }}
                    >
                      <b>{forPage.length - i}</b>
                    </span>
                  );
                })}

                {draft && (
                  <span className="sel" style={{ left: draft.x, top: draft.y, width: draft.w, height: draft.h }} />
                )}
              </div>
            </div>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title={draft ? "New note" : "Mark an area to start"}>
              <div className="body">
                {draft ? (
                  <>
                    <div className="chips" style={{ marginBottom: 12 }}>
                      {NOTE_KINDS.map((k) => (
                        <button key={k.id} className={kind === k.id ? "fchip on" : "fchip"} onClick={() => setKind(k.id)}>
                          {k.label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="note-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="What should change here? Be as specific as you like."
                      rows={4}
                    />
                    {error && <p className="drop-err">{error}</p>}
                    <div style={{ display: "flex", gap: 9, marginTop: 11 }}>
                      <button className="btn-solid" onClick={() => void save()} disabled={text.trim().length < 3 || saving}>
                        {saving ? "Sending…" : "Send to NEWEBD"}
                      </button>
                      <button className="btn-quiet" onClick={() => { setDraft(null); setText(""); setError(null); }}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    Drag a rectangle over any part of the page on the left. We keep a picture of exactly
                    that area, so there is no confusion about which element you mean.
                  </p>
                )}
              </div>
            </Card>

            <Card title={`Notes — ${notes.length}`}>
              <div className="body">
                {loadState === "loading" ? (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>Loading notes…</p>
                ) : loadState === "error" ? (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    We couldn&apos;t load your notes right now.{" "}
                    <button className="btn-quiet" onClick={() => { setLoadState("loading"); void load(); }}>Try again</button>
                  </p>
                ) : notes.length === 0 ? (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    Nothing yet. Notes you send here go straight to the NEWEBD team.
                  </p>
                ) : (
                  <>
                    <div className="notes">
                      {notes.map((n) => {
                        const k = NOTE_KINDS.find((x) => x.id === n.kind)!;
                        const pg = sitePages.find((p) => p.slug === n.pageSlug);
                        return (
                          <div className="note" key={n.id}>
                            {n.thumb ? <img src={n.thumb} alt="Marked area" /> : <span className="note-nothumb" />}
                            <div className="note-b">
                              <span className={`badge ${k.tone}`}>{k.label}</span>
                              <p>{n.text}</p>
                              <div className="note-m">
                                <Badge>{n.status}</Badge>
                                {pg?.title} · {n.author} · {new Date(n.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                                {/* Cada quien retira las suyas mientras NEWEBD no las haya tomado. */}
                                {n.authorUsername === user?.username && n.status === "New" && (
                                  <button onClick={() => void remove(n.id)} aria-label="Delete note">Delete</button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 12, marginBottom: 0 }}>
                      Every note reaches the NEWEBD team the moment you send it. We update its status here
                      as we work on it.
                    </p>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
