"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { OTHER_CASES } from "@/lib/content/cases";

export function CasesGrid() {
  return (
    <section className="relative bg-background py-24 sm:py-32">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Badge variant="default">Portafolio</Badge>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Más empresas que ya operan con nosotros.
            </h2>
          </div>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
          >
            Ver portafolio completo
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {OTHER_CASES.map((c, idx) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + idx * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] p-7 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-purple/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-subtle">
                  {c.industry}
                </span>
                <span className="font-mono text-xs text-foreground-subtle">
                  0{idx + 2}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                {c.client}
              </h3>
              <p className="mt-3 text-sm font-medium text-foreground-muted">
                {c.tagline}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-foreground-muted">
                {c.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
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
                aria-label={`Ver caso ${c.client}`}
                className="absolute inset-0"
              />
              <ArrowUpRight
                size={18}
                className="absolute right-6 bottom-6 text-foreground-subtle transition-all duration-300 group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
