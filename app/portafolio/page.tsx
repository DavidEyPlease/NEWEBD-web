import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { CASES } from "@/lib/content/cases";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Casos reales: Eyplease, Myanosa, Vegemex, CloverleafAWS, American English. Cómo construimos software con impacto medible.",
};

export default function PortafolioPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-cyan/20 blur-[160px]" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]"
        />

        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-foreground/[0.04] px-4 py-1.5 backdrop-blur">
              <Sparkles size={13} className="text-brand-cyan" />
              <span className="text-xs font-medium tracking-wide uppercase text-foreground-muted">
                Portafolio
              </span>
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl">
              Software con impacto medible.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
              Cinco casos en industrias muy distintas — del SaaS para Mary Kay
              al mobiliario premium para Nobu, Marriott y Vidanta. Lo que nos
              une: construir bien, con métricas y sin humo.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative bg-background pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {CASES.map((c, idx) => (
              <article
                key={c.slug}
                className={`group relative overflow-hidden rounded-2xl border bg-foreground/[0.02] p-8 transition-all hover:bg-foreground/[0.04] ${
                  c.featured
                    ? "border-border-strong md:col-span-2"
                    : "border-border hover:border-border-strong"
                }`}
              >
                {c.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-magenta/20 blur-3xl"
                  />
                )}

                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-subtle">
                    {c.industry}
                  </span>
                  <span className="font-mono text-xs text-foreground-subtle">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="relative mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {c.client}
                </h2>
                <p className="relative mt-3 text-base font-medium text-foreground-muted">
                  {c.tagline}
                </p>
                <p className="relative mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground-muted">
                  {c.description}
                </p>

                {c.metrics && (
                  <ul
                    role="list"
                    className="relative mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6"
                  >
                    {c.metrics.map((m) => (
                      <li key={m.label}>
                        <p className="text-2xl font-semibold tracking-tight text-gradient-brand sm:text-3xl">
                          {m.value}
                        </p>
                        <p className="mt-1 text-xs text-foreground-muted">
                          {m.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {c.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] text-foreground-muted ring-1 ring-inset ring-border"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/portafolio/${c.slug}`}
                  className="absolute inset-0"
                  aria-label={`Ver caso ${c.client}`}
                />
                <ArrowUpRight
                  size={18}
                  className="absolute right-7 bottom-7 text-foreground-subtle transition-all duration-300 group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
