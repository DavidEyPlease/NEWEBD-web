"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { DIRECT_CLIENTS } from "@/lib/content/clients";
import { OTHER_CASES } from "@/lib/content/cases";
import type { SlideProps } from "@/components/experience/scroll-experience";

export function OtherCasesSlide(_props: SlideProps) {
  const t = useTranslations("slides.otherCases");
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-purple/15 blur-[160px]" />
      </div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </motion.h2>

          {/* Muro de logos directos */}
          <motion.ul
            role="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 items-center gap-y-10 sm:grid-cols-3 md:grid-cols-5"
          >
            {DIRECT_CLIENTS.map((client, i) => (
              <motion.li
                key={client.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                className="flex items-center justify-center"
              >
                <span className="text-base font-semibold tracking-[0.08em] text-foreground-muted sm:text-lg">
                  {client.name.toUpperCase()}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Industrias representadas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {OTHER_CASES.map((c) => (
              <span
                key={c.slug}
                className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs text-foreground-muted ring-1 ring-inset ring-border"
              >
                {c.industry}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-10"
          >
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
            >
              {t("viewAll")}
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
