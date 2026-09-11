"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UNAUTHORIZED_EVENT, api } from "@/lib/api";
import { useSession } from "./session";

/**
 * CloverLeaf AI, el asistente de la esquina. Mismo patrón que el copiloto de
 * Vegemex: dos asistentes en un lugar. El de CloverLeaf responde sobre su
 * admin, su web y sus números (con datos reales, vía API); el de NEWEBD es su
 * equipo de desarrollo: pedir cambios y ver en qué van.
 */
const OPEN_EVENT = "clv:open-assistant";
export const openAssistant = () => window.dispatchEvent(new Event(OPEN_EVENT));

type Msg = { id: number; role: "user" | "assistant"; content: string };
type Note = { id: string; pageSlug: string; text: string; status: string; createdAt: string; author: string };

const SHORTCUTS = [
  { label: "Our Team", href: "/website/team/" },
  { label: "Site Feedback", href: "/website/" },
  { label: "Analytics", href: "/website/analytics/" },
  { label: "Hosting & Billing", href: "/account/" },
];

const SUGGESTIONS = [
  "How is my website doing this month?",
  "How do I add someone to Our Team?",
  "Is my website accessible?",
  "When is my next payment?",
  "Which team profiles are missing translations?",
  "What does NEWEBD's proposal include?",
];

const STEPS = ["Received", "In progress", "Done"];
const stepOf = (s: string) => (s === "Done" ? 2 : s === "In progress" ? 1 : 0);

let seed = 1;
const nextId = () => seed++;

/** Markdown mínimo: **negritas**, viñetas, saltos de línea y [enlaces](/ruta/). */
function Rich({ text, onNavigate }: { text: string; onNavigate: (href: string) => void }) {
  const inline = (line: string, key: string) =>
    line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean).map((p, j) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={`${key}-${j}`}>{p.slice(2, -2)}</strong>;
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(p);
      if (link) {
        const [, label, href] = link;
        if (href.startsWith("/") && !href.startsWith("//")) {
          return (
            <button key={`${key}-${j}`} className="cp-link" onClick={() => onNavigate(href)}>
              {label}
            </button>
          );
        }
        if (/^https:\/\//.test(href)) {
          return <a key={`${key}-${j}`} className="cp-link" href={href} target="_blank" rel="noopener">{label} ↗</a>;
        }
        return <span key={`${key}-${j}`}>{label}</span>;
      }
      return <span key={`${key}-${j}`}>{p}</span>;
    });

  return (
    <div className="cp-rich">
      {text.split("\n").map((line, i) => {
        const bullet = /^\s*[-*•]\s+/.test(line);
        const clean = line.replace(/^\s*[-*•]\s+/, "").replace(/^#{1,4}\s+/, "");
        if (!clean.trim()) return <div key={i} className="cp-gap" />;
        return bullet ? (
          <div key={i} className="cp-li"><i />{<span>{inline(clean, `l${i}`)}</span>}</div>
        ) : (
          <p key={i}>{inline(clean, `p${i}`)}</p>
        );
      })}
    </div>
  );
}

export function Assistant() {
  const router = useRouter();
  const { user } = useSession();
  const first = user?.displayName.split(/\s+/)[0] ?? "";
  const greeting = `Hi${first ? ` ${first}` : ""} 👋 I'm **CloverLeaf AI**. I can see your team page, your Site Feedback notes and your website's traffic, and I know this admin inside out. What can I help you with?`;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ai" | "newebd">("ai");
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ id: nextId(), role: "assistant", content: greeting }]);
  const [notes, setNotes] = useState<Note[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const onOpen = () => { setTab("ai"); setOpen(true); };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    if (tab === "ai") window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, tab]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open, busy]);

  useEffect(() => {
    if (!open || tab !== "newebd") return;
    api<{ data: Note[] }>("/feedback").then((r) => setNotes(r.data)).catch(() => setNotes([]));
  }, [open, tab]);

  const go = (href: string) => { router.push(href); setOpen(false); };

  async function ask(text: string) {
    if (busy || !text.trim()) return;
    const userMsg: Msg = { id: nextId(), role: "user", content: text.trim() };
    const history = [...msgs, userMsg];
    const botId = nextId();
    setMsgs([...history, { id: botId, role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json", "x-clv": "1" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: ac.signal,
      });
      if (res.status === 401) { window.dispatchEvent(new Event(UNAUTHORIZED_EVENT)); return; }
      if (res.status === 429) throw new Error("You're asking a lot at once — give me a minute and try again.");
      if (!res.ok || !res.body) throw new Error("I couldn't reach the server. Please try again.");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs((m) => m.map((x) => (x.id === botId ? { ...x, content: acc } : x)));
      }
    } catch (err) {
      if (ac.signal.aborted) return;
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMsgs((m) => m.map((x) => (x.id === botId ? { ...x, content: `⚠️ ${msg}` } : x)));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const close = () => { abortRef.current?.abort(); setOpen(false); };

  return (
    <>
      {!open && (
        <button className="cp-launch" onClick={() => { setTab("ai"); setOpen(true); }} aria-label="Open CloverLeaf AI assistant">
          <span className="cp-orb" aria-hidden><span /></span>
          <span className="cp-launch-t">Ask CloverLeaf AI</span>
        </button>
      )}

      <div className={`cp-wrap${open ? " on" : ""}`} role="dialog" aria-modal="false" aria-label="Assistant" aria-hidden={!open}>
        <div className="cp-panel">
          <div className={`cp-head ${tab}`}>
            {tab === "ai" ? (
              <span className="cp-orb big" aria-hidden><span /></span>
            ) : (
              <img src="/brand/newebd-isotipo.png" alt="" className="cp-nw-logo" />
            )}
            <div className="cp-head-t">
              <b>{tab === "ai" ? "CloverLeaf AI" : "NEWEBD"}</b>
              <span><i />{tab === "ai" ? "Connected to your admin and website" : "Your development team · changes and support"}</span>
            </div>
            <button className="cp-x" onClick={close} aria-label="Close assistant">✕</button>
          </div>

          <div className="cp-tabs" role="tablist" aria-label="Assistant">
            <button role="tab" aria-selected={tab === "ai"} className={tab === "ai" ? "on ai" : ""} onClick={() => setTab("ai")}>CloverLeaf AI</button>
            <button role="tab" aria-selected={tab === "newebd"} className={tab === "newebd" ? "on nw" : ""} onClick={() => setTab("newebd")}>NEWEBD</button>
          </div>

          {tab === "ai" ? (
            <>
              <div className="cp-msgs" ref={scrollRef} aria-live="polite">
                {msgs.map((m) => (
                  <div key={m.id} className={`cp-msg ${m.role}`}>
                    <div className="cp-bubble">
                      {m.role === "assistant" ? (
                        m.content ? <Rich text={m.content} onNavigate={go} /> : <span className="cp-dots" aria-label="Thinking"><i /><i /><i /></span>
                      ) : m.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cp-row">
                <span className="cp-row-l">Go to</span>
                {SHORTCUTS.map((s) => <button key={s.href} onClick={() => go(s.href)}>{s.label}</button>)}
              </div>
              {msgs.length <= 1 && (
                <div className="cp-row sugg">
                  {SUGGESTIONS.map((s) => <button key={s} onClick={() => void ask(s)}>{s}</button>)}
                </div>
              )}

              <form className="cp-input" onSubmit={(e) => { e.preventDefault(); void ask(input); }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your website, team or numbers…"
                  aria-label="Message CloverLeaf AI"
                  disabled={busy}
                  maxLength={2000}
                />
                <button type="submit" disabled={!input.trim() || busy} aria-label="Send">➤</button>
              </form>
            </>
          ) : (
            <div className="cp-nw">
              <p className="cp-nw-lede">
                We build and run this admin and your website. Spotted something to change, or need a hand? Mark it on your
                site and it comes straight to us — you&apos;ll see here how it&apos;s going.
              </p>
              <button className="cp-nw-btn" onClick={() => go("/website/")}>Mark something on your website →</button>

              <div className="cp-nw-list">
                <b>Your requests</b>
                {notes === null ? (
                  <p className="cp-nw-empty">Loading…</p>
                ) : notes.length === 0 ? (
                  <p className="cp-nw-empty">Nothing sent yet. Your notes from Site Feedback will show up here.</p>
                ) : (
                  notes.slice(0, 8).map((n) => (
                    <div key={n.id} className="cp-nw-item">
                      <p>{n.text}</p>
                      <div className="cp-steps" aria-label={`Status: ${n.status}`}>
                        {STEPS.map((s, i) => (
                          <span key={s} className={i <= stepOf(n.status) ? "on" : ""}>{s}</span>
                        ))}
                      </div>
                      <small>{n.pageSlug} · {n.author} · {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small>
                    </div>
                  ))
                )}
              </div>
              <a className="cp-nw-contact" href="https://newebd.com/contacto" target="_blank" rel="noopener">Prefer to talk? Contact NEWEBD ↗</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
