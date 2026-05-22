"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { FEATURED_CASE } from "@/lib/content/cases";

function Counter({
  value,
  duration = 1600,
  active,
}: {
  value: string;
  duration?: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;
    // Detecta el número y conserva sufijo (h, K, M, +, etc.)
    const match = value.match(/^([+-]?)(\d+(?:\.\d+)?)([^0-9].*)?$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const sign = match[1] ?? "";
    const target = parseFloat(match[2]);
    const suffix = match[3] ?? "";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(`${sign}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, active]);

  return <span>{display}</span>;
}

export function FeaturedCase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const c = FEATURED_CASE;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px gradient-brand opacity-50"
      />

      <Container size="wide">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-border-strong bg-ink-900/60 p-8 backdrop-blur sm:p-12 lg:p-16"
        >
          {/* Backdrop gradient sutil dentro de la card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-magenta/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="brand">Caso estrella</Badge>
                <Badge variant="outline">{c.industry}</Badge>
              </div>

              <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {c.client} —{" "}
                <span className="text-foreground-muted">{c.tagline}</span>
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground-muted sm:text-base">
                {c.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {c.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs text-foreground-muted ring-1 ring-inset ring-border"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`/portafolio/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5"
                >
                  Ver caso completo
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-foreground-muted ring-1 ring-inset ring-border-strong transition-colors hover:text-foreground hover:bg-foreground/[0.04]"
                >
                  Visitar sitio
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ul role="list" className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-1">
                {(c.metrics ?? []).map((m, idx) => (
                  <motion.li
                    key={m.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="flex flex-col items-start gap-1 bg-ink-900 p-6 lg:p-7"
                  >
                    <span className="text-4xl font-semibold tracking-tight text-gradient-brand sm:text-5xl">
                      <Counter value={m.value} active={inView} />
                    </span>
                    <span className="text-xs leading-relaxed text-foreground-muted sm:text-sm">
                      {m.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
