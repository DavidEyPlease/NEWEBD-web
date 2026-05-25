"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, AppWindow, Database, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "desarrollo-web": Code2,
  "aplicaciones-a-medida": AppWindow,
  "sistemas-empresariales": Database,
  "soluciones-de-ia": Brain,
};

export function Services() {
  const t = useTranslations("sections.services");
  const locale = useLocale();
  const services = getServices(locale);

  return (
    <section id="servicios" className="relative bg-background py-24 sm:py-32">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default">{t("badge")}</Badge>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl">
            {t("titleA")}
            <br className="hidden sm:block" /> {t("titleB")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service, idx) => {
            const Icon = ICONS[service.slug] ?? Code2;
            const isHero = !!service.isDifferentiator;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={cn(
                  "group relative rounded-2xl p-[1px] transition-all duration-500",
                  isHero
                    ? "gradient-brand shadow-[0_30px_80px_-30px_rgba(139,92,246,0.55)]"
                    : "bg-border hover:bg-border-strong",
                )}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-5 rounded-2xl bg-background p-8 transition-all duration-300",
                    !isHero && "group-hover:bg-foreground/[0.02]",
                    isHero && "bg-ink-900",
                  )}
                >
                  {isHero && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-60 gradient-brand-soft"
                    />
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "relative inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset",
                          isHero
                            ? "gradient-brand ring-white/20"
                            : "bg-foreground/[0.04] ring-border-strong",
                        )}
                      >
                        <Icon
                          size={20}
                          className={isHero ? "text-white" : "text-foreground"}
                        />
                      </span>
                      <span className="font-mono text-xs text-foreground-subtle tracking-widest">
                        {service.number}
                      </span>
                    </div>
                    {service.isDifferentiator && (
                      <Badge
                        variant="outline"
                        className="border-white/20 text-foreground"
                      >
                        {t("differentiator")}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-foreground-muted">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-[15px] leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>

                  <ul className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 pt-4 text-sm">
                    {service.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-foreground-muted"
                      >
                        <span
                          className={cn(
                            "h-1 w-1 rounded-full",
                            isHero ? "bg-brand-magenta" : "bg-brand-cyan",
                          )}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/servicios#${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
                  >
                    {t("cta")}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
