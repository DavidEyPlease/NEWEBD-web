"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import type { SlideProps } from "@/components/experience/scroll-experience";

const BENEFIT_KEYS: { icon: LucideIcon; labelKey: string; subKey: string }[] = [
  { icon: TrendingUp, labelKey: "growLabel", subKey: "growSub" },
  { icon: Clock, labelKey: "timeLabel", subKey: "timeSub" },
  { icon: Wallet, labelKey: "moneyLabel", subKey: "moneySub" },
];

export function ManifestoSlide(_props: SlideProps) {
  const t = useTranslations("slides.manifesto");
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/25 blur-[180px]" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("titleA")}{" "}
            <span className="text-gradient-brand">{t("titleHighlight")}</span>{" "}
            {t("titleB")}
            <br />
            <span className="text-foreground-muted">{t("titleSub")}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {BENEFIT_KEYS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.labelKey}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.1 }}
                  className="group flex items-center gap-3 rounded-full border border-border-strong bg-foreground/[0.04] py-3 pl-3 pr-5 backdrop-blur"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full gradient-brand text-white">
                    <Icon size={16} />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {t(b.labelKey)}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground-muted">
                      {t(b.subKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
