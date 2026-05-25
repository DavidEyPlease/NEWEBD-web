"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { getFeaturedCase } from "@/lib/content/cases";
import type { SlideProps } from "@/components/experience/scroll-experience";

function Counter({ value, active }: { value: string; active: boolean }) {
  const [display, setDisplay] = useState(active ? "0" : value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const match = value.match(/^([+-]?)(\d+(?:\.\d+)?)([^0-9].*)?$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const sign = match[1] ?? "";
    const target = parseFloat(match[2]);
    const suffix = match[3] ?? "";

    const start = performance.now();
    const duration = 1800;
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
  }, [active, value]);

  return <span>{display}</span>;
}

export function FeaturedCaseSlide({ isActive }: SlideProps) {
  const t = useTranslations("slides.featuredCase");
  const locale = useLocale();
  const c = getFeaturedCase(locale);

  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-magenta/30 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-brand-cyan/30 blur-[160px]" />
      </div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle"
          >
            {t("eyebrow")} · {c.industry}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {c.client} {t("titleA")}{" "}
            <span className="text-gradient-brand">{t("titleHighlight")}</span>{" "}
            {t("titleB")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border"
          >
            {(c.metrics ?? []).map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.12 }}
                className="bg-ink-900 px-4 py-8 sm:px-6 sm:py-10"
              >
                <p className="text-5xl font-semibold tracking-tight text-gradient-brand sm:text-6xl lg:text-7xl">
                  <Counter value={m.value} active={isActive} />
                </p>
                <p className="mt-3 text-xs leading-relaxed text-foreground-muted sm:text-sm">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link
              href={{ pathname: "/portafolio/[slug]", params: { slug: c.slug } }}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5"
            >
              {t("viewCase")}
              <ArrowUpRight size={16} />
            </Link>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-foreground-muted ring-1 ring-inset ring-border-strong transition-colors hover:text-foreground hover:bg-foreground/[0.04]"
            >
              {t("visitSite")}
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
