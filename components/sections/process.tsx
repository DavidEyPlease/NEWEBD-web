"use client";

import { motion } from "framer-motion";
import { MessagesSquare, FileSearch, Wrench, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const STEPS: { number: string; icon: LucideIcon; titleKey: string; bodyKey: string }[] = [
  { number: "01", icon: MessagesSquare, titleKey: "step1Title", bodyKey: "step1Body" },
  { number: "02", icon: FileSearch, titleKey: "step2Title", bodyKey: "step2Body" },
  { number: "03", icon: Wrench, titleKey: "step3Title", bodyKey: "step3Body" },
  { number: "04", icon: Handshake, titleKey: "step4Title", bodyKey: "step4Body" },
];

export function Process() {
  const t = useTranslations("sections.process");

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Isotipo decorativo — solo mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-16 opacity-50 mix-blend-screen lg:hidden"
      >
        <Isotipo size={160} spin />
      </div>

      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default">{t("badge")}</Badge>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />

          <ol
            role="list"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="relative flex flex-col items-start"
                >
                  <div className="relative">
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background ring-1 ring-inset ring-border-strong">
                      <Icon size={22} className="text-foreground" />
                    </span>
                    <span
                      aria-hidden
                      className="absolute -top-2 -right-2 inline-flex h-6 w-auto items-center justify-center rounded-full bg-foreground px-2 font-mono text-[10px] font-semibold text-ink-900"
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                    {t(step.bodyKey)}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
