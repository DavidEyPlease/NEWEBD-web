"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader, Card, Badge } from "../ui";
import {
  NETWORKS, posts, calendarItems, aiBrief, aiOutputs, aiSteps,
  type Lang, type Network,
} from "@/lib/social";

type Tab = "posts" | "calendar" | "ai";
const TABS: { id: Tab; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "calendar", label: "Calendar" },
  { id: "ai", label: "AI assistant" },
];
const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "pt", label: "Português" },
];

const TODAY = "2026-09-10";
const shortDate = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const k = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

function NetIcon({ n }: { n: Network }) {
  return <span className={`soc-ico ${n}`} aria-hidden>{n === "facebook" ? "f" : "◎"}</span>;
}

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("posts");
  const upcoming = calendarItems.filter((c) => c.status !== "Published" && c.date >= TODAY).length;
  const engagement = Math.round(
    (posts.reduce((s, p) => s + p.likes + p.comments + p.third, 0) /
      posts.reduce((s, p) => s + p.reach, 0)) * 1000,
  ) / 10;

  return (
    <>
      <PageHeader title="Social Media" sub="Facebook and Instagram in one place — with an AI assistant for your posts" />
      <div className="content enter">
        <div className="soc-top stagger">
          {(Object.keys(NETWORKS) as Network[]).map((n) => (
            <a key={n} className={`soc-acc ${n}`} href={NETWORKS[n].url} target="_blank" rel="noopener">
              <NetIcon n={n} />
              <div className="soc-acc-b">
                <div className="strong">{NETWORKS[n].label}</div>
                <div className="muted">{NETWORKS[n].handle}</div>
              </div>
              <div className="soc-num"><b>{k(NETWORKS[n].followers)}</b><span>followers</span></div>
            </a>
          ))}
          <div className="kpi acc-gold"><div className="l">Coming up</div><div className="v">{upcoming}</div><div className="d">scheduled or in draft</div></div>
          <div className="kpi acc-ok"><div className="l">Avg. engagement</div><div className="v">{engagement}%</div><div className="d">last 8 posts</div></div>
        </div>
        <p className="soc-sample">Accounts link to your real pages. Posts, figures and the calendar are sample data until your accounts are connected.</p>

        <div className="chips" style={{ margin: "4px 0 16px" }}>
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? "fchip on" : "fchip"} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "posts" && <Posts />}
        {tab === "calendar" && <Calendar />}
        {tab === "ai" && <Assistant />}
      </div>
    </>
  );
}

function Posts() {
  const [net, setNet] = useState<"all" | Network>("all");
  const shown = posts.filter((p) => net === "all" || p.network === net);
  return (
    <>
      <div className="chips" style={{ marginBottom: 14 }}>
        {(["all", "facebook", "instagram"] as const).map((n) => (
          <button key={n} className={net === n ? "fchip on" : "fchip"} onClick={() => setNet(n)}>
            {n === "all" ? "All" : NETWORKS[n].label}
          </button>
        ))}
      </div>
      <div className="soc-grid stagger">
        {shown.map((p) => (
          <article key={p.id} className="soc-post">
            <div className="soc-img"><img src={p.image} alt="" loading="lazy" /><NetIcon n={p.network} /></div>
            <div className="soc-body">
              <div className="soc-date">{shortDate(p.date)}</div>
              <p>{p.caption}</p>
              <div className="soc-metrics">
                <span>♥ {p.likes}</span>
                <span>💬 {p.comments}</span>
                <span>{p.network === "facebook" ? "↗" : "🔖"} {p.third}</span>
                <span className="soc-reach">{k(p.reach)} reached</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Calendar() {
  const [ym, setYm] = useState({ y: 2026, m: 8 }); // septiembre (mes 0-based)
  const first = new Date(Date.UTC(ym.y, ym.m, 1));
  const days = new Date(Date.UTC(ym.y, ym.m + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(first.getUTCDay()).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const iso = (d: number) => `${ym.y}-${String(ym.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const byDay = useMemo(() => {
    const m = new Map<string, typeof calendarItems>();
    calendarItems.forEach((c) => m.set(c.date, [...(m.get(c.date) ?? []), c]));
    return m;
  }, []);
  const move = (d: number) => setYm(({ y, m }) => { const t = new Date(Date.UTC(y, m + d, 1)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() }; });

  return (
    <Card title="Content calendar">
      <div className="body">
        <div className="cal-head">
          <button className="fchip" onClick={() => move(-1)} aria-label="Previous month">←</button>
          <b>{first.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</b>
          <button className="fchip" onClick={() => move(1)} aria-label="Next month">→</button>
          <span className="cal-legend">
            <span><i className="dot facebook" /> Facebook</span>
            <span><i className="dot instagram" /> Instagram</span>
          </span>
        </div>
        <div className="cal">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="cal-dow">{d}</div>)}
          {cells.map((d, i) => (
            <div key={i} className={`cal-day${d === null ? " empty" : ""}${d !== null && iso(d) === TODAY ? " today" : ""}`}>
              {d !== null && (
                <>
                  <span className="cal-n">{d}</span>
                  {(byDay.get(iso(d)) ?? []).map((c) => (
                    <div key={c.id} className={`cal-item ${c.network}${c.status === "Published" ? " done" : ""}`} title={`${NETWORKS[c.network].label} · ${c.status}`}>
                      {c.time && <b>{c.time}</b>} {c.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="cal-foot">
          <Badge>Published</Badge> <Badge>Scheduled</Badge> <Badge>Needs approval</Badge> <Badge>Draft</Badge>
        </div>
      </div>
    </Card>
  );
}

function Assistant() {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const run = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStep(aiSteps.length); setState("done"); return; }
    setState("running");
    setStep(0);
    aiSteps.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i + 1), 650 * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => setState("done"), 650 * (aiSteps.length + 1)));
  };

  return (
    <div className="ai-wrap">
      <Card title="How your posts would be managed with AI">
        <div className="body">
          <div className="ai-brief">
            <span className="muted">Your team writes one line:</span>
            <p>“{aiBrief}”</p>
          </div>
          <button className="btn-solid" onClick={run} disabled={state === "running"}>
            {state === "idle" ? "Run the example ✦" : state === "running" ? "Working…" : "Run it again"}
          </button>

          {state !== "idle" && (
            <ol className="ai-steps">
              {aiSteps.map((s, i) => (
                <li key={s} className={i < step ? "ok" : i === step && state === "running" ? "now" : ""}>
                  <span className="ai-tick">{i < step ? "✓" : i === step && state === "running" ? "•" : ""}</span>
                  {s}
                </li>
              ))}
            </ol>
          )}
          <p className="soc-sample" style={{ marginTop: 14 }}>
            This is a recorded example of how the assistant works once connected. Your team reviews and approves every post — nothing is published on its own.
          </p>
        </div>
      </Card>

      {state === "done" && (
        <div className="ai-out enter">
          <div className="chips" style={{ marginBottom: 12 }}>
            {LANGS.map((l) => (
              <button key={l.id} className={lang === l.id ? "fchip on" : "fchip"} onClick={() => setLang(l.id)}>{l.label}</button>
            ))}
          </div>
          <div className="ai-cards">
            {(Object.keys(aiOutputs) as Network[]).map((n) => {
              const o = aiOutputs[n];
              return (
                <div key={n} className={`ai-card ${n}`}>
                  <div className="ai-card-h"><NetIcon n={n} /><b>{NETWORKS[n].label}</b><span className="ai-best">Best time: {o.best}</span></div>
                  <img src={o.image} alt="" />
                  <p>{o.caption[lang]}</p>
                  <div className="ai-tags">{o.hashtags}</div>
                  <button className="btn-quiet" disabled title="Available once your accounts are connected">Schedule for {o.best.split(" · ")[0]}</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
