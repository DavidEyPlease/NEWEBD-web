"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader, Card } from "../ui";
import { NOTE_KINDS, sitePages, type NoteKind, type SiteNote } from "@/lib/site-pages";

const STORE = "clv-site-notes";

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

  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const page = sitePages.find((p) => p.slug === pageSlug)!;

  // --- Persistencia local ---------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) setNotes(JSON.parse(raw) as SiteNote[]);
    } catch {
      /* sin almacenamiento: las notas duran lo que la pestaña */
    }
  }, []);

  const persist = useCallback((next: SiteNote[]) => {
    setNotes(next);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* el guardado puede fallar en modo privado; la nota sigue en pantalla */
    }
  }, []);

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
    const region = {
      x: Math.round(box.x * scale),
      y: Math.round(box.y * scale),
      w: Math.round(box.w * scale),
      h: Math.round(box.h * scale),
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

  const save = () => {
    if (!draft || text.trim().length < 3) return;
    setSaving(true);
    const { thumb, region } = crop(draft);

    const note: SiteNote = {
      id: `n${Date.now()}`,
      pageSlug: page.slug,
      pageUrl: page.url,
      kind,
      text: text.trim(),
      region,
      thumb,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      createdAt: new Date().toISOString(),
      author: "Helen Marsh",
      status: "Queued",
    };

    persist([note, ...notes]);
    setDraft(null);
    setText("");
    setSaving(false);
  };

  const remove = (id: string) => persist(notes.filter((n) => n.id !== id));

  /** Exporta las notas para poder enviarlas mientras no hay backend. */
  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cloverleaf-site-notes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const forPage = notes.filter((n) => n.pageSlug === page.slug);

  return (
    <>
      <PageHeader mode="live" title="Site Feedback" sub="Review your website, mark an area and tell us what to change" />
      <div className="content enter">
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
                    <div style={{ display: "flex", gap: 9, marginTop: 11 }}>
                      <button className="btn-solid" onClick={save} disabled={text.trim().length < 3 || saving}>
                        Save note
                      </button>
                      <button className="btn-quiet" onClick={() => { setDraft(null); setText(""); }}>
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
                {notes.length === 0 ? (
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    Nothing yet. Your notes stay on this device until they are sent.
                  </p>
                ) : (
                  <>
                    <div className="notes">
                      {notes.map((n) => {
                        const k = NOTE_KINDS.find((x) => x.id === n.kind)!;
                        const pg = sitePages.find((p) => p.slug === n.pageSlug);
                        return (
                          <div className="note" key={n.id}>
                            <img src={n.thumb} alt="Marked area" />
                            <div className="note-b">
                              <span className={`badge ${k.tone}`}>{k.label}</span>
                              <p>{n.text}</p>
                              <div className="note-m">
                                {pg?.title} · {new Date(n.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                                <button onClick={() => remove(n.id)} aria-label="Delete note">Delete</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button className="btn-solid" style={{ width: "100%", marginTop: 13 }} onClick={exportNotes}>
                      Export notes for NEWEBD
                    </button>
                    <p style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 9, marginBottom: 0 }}>
                      Sending straight to NEWEBD is the next step. For now the export gives you a file
                      you can email us, and nothing is lost.
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
