"use client";

import { motion } from "framer-motion";
import {
  MessagesSquare,
  FileSearch,
  Wrench,
  Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { SlideProps } from "@/components/experience/scroll-experience";

const STEPS: { number: string; icon: LucideIcon; title: string; sub: string }[] =
  [
    {
      number: "01",
      icon: MessagesSquare,
      title: "Briefing",
      sub: "Hablamos sin jerga.",
    },
    {
      number: "02",
      icon: FileSearch,
      title: "Propuesta",
      sub: "Alcance y precio claros.",
    },
    {
      number: "03",
      icon: Wrench,
      title: "Construcción",
      sub: "Iteraciones cortas, visibilidad total.",
    },
    {
      number: "04",
      icon: Handshake,
      title: "Acompañamiento",
      sub: "Seguimos contigo después.",
    },
  ];

export function ProcessSlide(_props: SlideProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/15 blur-[180px]" />
      </div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground-subtle sm:text-xs">
              Cómo trabajamos
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:mt-6 sm:text-5xl lg:text-6xl">
              Cuatro pasos, cero misterios.
            </h2>
          </motion.div>

          <div className="relative mt-7 sm:mt-16">
            {/* Línea conectora con gradient */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block"
            />
            <ol
              role="list"
              className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4 md:gap-4"
            >
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.li
                    key={s.number}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                    className="relative flex flex-col items-center text-center md:items-start md:text-left"
                  >
                    <div className="relative">
                      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background ring-1 ring-inset ring-border-strong sm:h-[72px] sm:w-[72px]">
                        <Icon size={20} className="text-foreground sm:size-6" />
                      </span>
                      <span
                        aria-hidden
                        className="absolute -right-2 -top-2 inline-flex h-6 px-2 items-center justify-center rounded-full gradient-brand text-[10px] font-bold text-white sm:h-7 sm:px-2.5"
                      >
                        {s.number}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground sm:mt-6 sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-foreground-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                      {s.sub}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
