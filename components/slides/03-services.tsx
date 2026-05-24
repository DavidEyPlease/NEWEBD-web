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

      <Container size="wide" className="relative h-full flex flex-col justify-center py-2 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-center sm:mb-10"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground-subtle sm:text-xs">
            4 pilares
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:mt-4 sm:text-5xl lg:text-6xl">
            Esto construimos para ti.
          </h2>
        </motion.div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-5">
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
                    "relative flex h-full flex-col gap-1.5 rounded-2xl p-3.5 backdrop-blur sm:gap-3 sm:p-6",
                    isHero ? "bg-ink-900" : "bg-background/80",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-inset sm:h-12 sm:w-12",
                        isHero
                          ? "gradient-brand ring-white/20"
                          : "bg-foreground/[0.04] ring-border-strong",
                      )}
                    >
                      <Icon
                        size={18}
                        className={cn(
                          "sm:size-[22px]",
                          isHero ? "text-white" : "text-foreground",
                        )}
                      />
                    </span>
                    <span className="font-mono text-[10px] text-foreground-subtle tracking-widest sm:text-xs">
                      {s.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="text-xs leading-snug text-foreground-muted sm:text-sm sm:leading-relaxed">
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
