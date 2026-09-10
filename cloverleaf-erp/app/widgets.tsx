"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Número que cuenta desde cero al montar. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  // El estado de reposo es el valor final: el HTML servido ya trae el dato
  // correcto y, si nunca llegamos a animar, se lee el número de verdad.
  const [n, setN] = useState(to);

  useEffect(() => {
    if (reduced()) return;

    let raf = 0;
    let failsafe = 0;

    const animate = () => {
      const dur = 950;
      let started: number | null = null;
      setN(0);
      const step = (ts: number) => {
        if (started === null) started = ts;
        const p = Math.min((ts - started) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      // Por si el navegador congela rAF a mitad de camino.
      failsafe = window.setTimeout(() => setN(to), dur + 500);
    };

    // Con la pestaña oculta rAF no corre: animar ahí dejaría el contador en
    // cero hasta que alguien mirase. Mejor esperar a que sea visible.
    const onVisible = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onVisible);
      animate();
    };

    if (document.hidden) {
      document.addEventListener("visibilitychange", onVisible);
    } else {
      animate();
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, [to]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/**
 * Anillo de progreso. El trazo se dibuja al montar usando stroke-dashoffset,
 * y el gradiente se define una sola vez en <RingGradient/> (en el layout).
 */
export function Ring({
  value,
  caption,
  size = 96,
  stroke = 8,
}: {
  value: number;
  caption: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
        <circle
          className="val"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ ["--circ" as string]: `${circ}` }}
        />
      </svg>
      <div className="mid">
        <span className="num">
          <CountUp to={value} suffix="%" />
        </span>
        <span className="cap">{caption}</span>
      </div>
    </div>
  );
}

/** Definición del gradiente que usan todos los anillos. */
export function RingGradient() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF61" />
          <stop offset="55%" stopColor="#6FCF8A" />
          <stop offset="100%" stopColor="#63E0C4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Normaliza para buscar: minúsculas y sin acentos. Muchos nombres del negocio
 * llevan tilde (Bajío, Granjas del Bajío) y nadie los teclea con ella.
 */
const norm = (v: string) =>
  v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

/**
 * Buscador + filtros por estado sobre una tabla ya renderizada.
 * Trabaja sobre los datos en memoria y devuelve las filas que pasan el filtro,
 * para no duplicar el marcado de la tabla en cada página.
 */
export function useFilter<T>(
  rows: T[],
  text: (row: T) => string,
  group?: (row: T) => string,
) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("All");

  const groups = group ? ["All", ...Array.from(new Set(rows.map(group)))] : [];
  const needle = norm(q);
  const filtered = rows.filter((r) => {
    const okText = needle === "" || norm(text(r)).includes(needle);
    const okGroup = !group || active === "All" || group(r) === active;
    return okText && okGroup;
  });

  return { q, setQ, active, setActive, groups, filtered };
}

export function Toolbar({
  q,
  setQ,
  placeholder,
  groups,
  active,
  setActive,
  count,
}: {
  q: string;
  setQ: (v: string) => void;
  placeholder: string;
  groups: string[];
  active: string;
  setActive: (v: string) => void;
  count: number;
}) {
  return (
    <div className="toolbar">
      <div className="search">
        <span className="mg">⌕</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
      </div>
      {groups.length > 1 && (
        <div className="chips">
          {groups.map((g) => (
            <button key={g} className={active === g ? "fchip on" : "fchip"} onClick={() => setActive(g)}>
              {g}
            </button>
          ))}
        </div>
      )}
      <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--faint)" }}>
        {count} {count === 1 ? "result" : "results"}
      </span>
    </div>
  );
}

/** Marca visual de tendencia junto a un KPI. */
export function Trend({ dir, children }: { dir: "up" | "down" | "flat"; children: React.ReactNode }) {
  const color = dir === "up" ? "var(--ok)" : dir === "down" ? "var(--crit)" : "var(--faint)";
  const glyph = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color }}>
      <span style={{ fontSize: 8 }}>{glyph}</span>
      <span style={{ color: "var(--faint)" }}>{children}</span>
    </span>
  );
}
