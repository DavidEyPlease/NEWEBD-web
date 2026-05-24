"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import type { SlideProps } from "@/components/experience/scroll-experience";

export function ContactoThanksSlide(_props: SlideProps) {
  const t = useTranslations("contacto.thanks");

  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/25 blur-[160px]" />
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center mix-blend-screen"
      >
        <Isotipo size={520} spin />
      </motion.div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-white shadow-[0_20px_60px_-20px_rgba(189,65,224,0.6)]"
          >
            <CheckCircle2 size={28} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg leading-relaxed text-foreground-muted sm:text-xl"
          >
            {t("body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5"
            >
              {t("ctaPortfolio")}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-foreground-muted ring-1 ring-inset ring-border-strong transition-colors hover:text-foreground hover:bg-foreground/[0.04]"
            >
              {t("ctaHome")}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
