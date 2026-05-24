"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Wallet, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const BENEFIT_KEYS: { icon: LucideIcon; titleKey: string; bodyKey: string }[] = [
  { icon: TrendingUp, titleKey: "benefits.growTitle", bodyKey: "benefits.growBody" },
  { icon: Clock, titleKey: "benefits.timeTitle", bodyKey: "benefits.timeBody" },
  { icon: Wallet, titleKey: "benefits.moneyTitle", bodyKey: "benefits.moneyBody" },
];

export function Manifesto() {
  const t = useTranslations("sections.manifesto");

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/15 blur-[160px]" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      {/* Isotipo decorativo — solo mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 bottom-12 opacity-50 mix-blend-screen lg:hidden"
      >
        <Isotipo size={180} spin />
      </div>

      <Container size="wide">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Badge variant="default">{t("badge")}</Badge>

            <div className="mt-6 flex items-start gap-4">
              <Quote
                size={32}
                className="mt-2 shrink-0 text-brand-magenta"
                aria-hidden
              />
              <p className="text-balance text-3xl font-medium leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                {t("quoteA")}{" "}
                <span className="text-gradient-brand">{t("quoteHighlight")}</span>
                {t("quoteB")}
              </p>
            </div>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground-muted">
              {t("body")}
            </p>
          </div>

          <div className="lg:col-span-6">
            <ul role="list" className="grid gap-4">
              {BENEFIT_KEYS.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <motion.li
                    key={b.titleKey}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="group relative flex items-start gap-5 rounded-2xl border border-border bg-foreground/[0.02] p-6 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.6)]">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {t(b.titleKey)}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-muted">
                        {t(b.bodyKey)}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
