"use client";

import { motion } from "framer-motion";
import { Code2, AppWindow, Database, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SERVICES } from "@/lib/content/services";
import { cn } from "@/lib/utils";
import type { SlideProps } from "@/components/experience/scroll-experience";

const ICONS: Record<string, LucideIcon> = {
  "desarrollo-web": Code2,
  "aplicaciones-a-medida": AppWindow,
  "sistemas-empresariales": Database,
  "soluciones-de-ia": Brain,
};

export function ServicesSlide(_props: SlideProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-magenta/20 blur-[160px]" />
        <div className="absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-brand-cyan/20 blur-[160px]" />
      </div>

      <Container size="wide" className="relative h-full flex flex-col justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle">
            4 pilares
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl">
            Esto construimos para ti.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.slug] ?? Code2;
            const isHero = !!s.isDifferentiator;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className={cn(
                  "group relative rounded-2xl p-[1px] transition-all duration-500",
                  isHero
                    ? "gradient-brand shadow-[0_30px_80px_-30px_rgba(189,65,224,0.55)]"
                    : "bg-border",
                )}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-3 rounded-2xl p-6 backdrop-blur",
                    isHero ? "bg-ink-900" : "bg-background/80",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset",
                        isHero
                          ? "gradient-brand ring-white/20"
                          : "bg-foreground/[0.04] ring-border-strong",
                      )}
                    >
                      <Icon
                        size={22}
                        className={isHero ? "text-white" : "text-foreground"}
                      />
                    </span>
                    <span className="font-mono text-xs text-foreground-subtle tracking-widest">
                      {s.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {s.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
