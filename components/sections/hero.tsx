"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  const t = useTranslations("sections.hero");

  return (
    <section className="relative overflow-hidden bg-background pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Aurora blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-[560px] w-[560px] rounded-full bg-brand-purple/40 blur-[150px] animate-aurora" />
        <div
          className="absolute top-20 right-0 h-[480px] w-[480px] rounded-full bg-brand-magenta/35 blur-[150px] animate-aurora"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-0 h-[480px] w-[480px] rounded-full bg-brand-cyan/30 blur-[150px] animate-aurora"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-vignette" />

      {/* Isotipo decorativo flotante — solo mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-[55%] -translate-y-1/2 opacity-60 mix-blend-screen lg:hidden"
      >
        <Isotipo size={280} spin />
      </div>

      {/* Degradado de salida */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background"
      />

      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-foreground/[0.04] px-4 py-1.5 backdrop-blur"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <Sparkles size={13} className="text-brand-magenta" />
              <span className="text-xs font-medium tracking-wide uppercase text-foreground-muted">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-7 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[5.25rem]"
            >
              {t("titleA")}
              <br />
              {t("titleB")}{" "}
              <span className="relative whitespace-nowrap">
                <span className="text-gradient-brand">{t("titleC")}</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-px gradient-brand opacity-70"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
            >
              {t("subtitleA")}{" "}
              <span className="text-foreground">{t("subtitleStrongA")}</span>,{" "}
              <span className="text-foreground">{t("subtitleStrongB")}</span>{" "}
              <span className="text-foreground-muted">{t("subtitleAnd")}</span>{" "}
              <span className="text-foreground">{t("subtitleStrongC")}</span>
              {t("subtitleB")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/contacto" size="lg">
                {t("ctaPrimary")}
                <ArrowRight size={18} />
              </Button>
              <Button href="/portafolio" variant="secondary" size="lg">
                {t("ctaSecondary")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-foreground-subtle"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                {t("trustA")}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                {t("trustB")}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:col-span-5 lg:flex lg:justify-center"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full gradient-brand opacity-35 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute inset-[15%] -z-10 rounded-full bg-brand-purple/30 blur-2xl"
              />
              <div className="animate-float">
                <Isotipo size={360} spin />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
