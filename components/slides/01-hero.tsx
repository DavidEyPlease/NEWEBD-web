"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Typewriter } from "@/components/experience/typewriter";
import { TypingDots } from "@/components/experience/typing-dots";
import { Container } from "@/components/ui/container";

import type { SlideProps } from "@/components/experience/scroll-experience";

type Phase = "q1" | "thinking" | "answer" | "done";

export function HeroSlide({ isActive }: SlideProps) {
  const t = useTranslations("slides.hero");
  const [phase, setPhase] = useState<Phase>("q1");

  // Resetear cuando el slide vuelva a activarse
  useEffect(() => {
    if (isActive) setPhase("q1");
  }, [isActive]);

  // Encadenamiento de fases
  useEffect(() => {
    if (!isActive) return;
    if (phase === "thinking") {
      const t = window.setTimeout(() => setPhase("answer"), 1600);
      return () => window.clearTimeout(t);
    }
  }, [phase, isActive]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      {/* Aurora dramática de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[680px] w-[680px] rounded-full bg-brand-purple/45 blur-[180px] animate-aurora" />
        <div
          className="absolute top-20 right-0 h-[560px] w-[560px] rounded-full bg-brand-magenta/40 blur-[160px] animate-aurora"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-0 h-[560px] w-[560px] rounded-full bg-brand-cyan/35 blur-[160px] animate-aurora"
          style={{ animationDelay: "-12s" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      {/* Isotipo decorativo gigante en la esquina */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 opacity-30 mix-blend-screen md:opacity-50"
      >
        <Isotipo size={520} spin />
      </div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="w-full max-w-4xl">
          {/* Fila 1: Pregunta */}
          <div className="min-h-[1.2em]">
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-7xl lg:text-[5.5rem]">
              <Typewriter
                key={t("question")}
                text={t("question")}
                startAfterMs={300}
                charDelayMs={55}
                showCursor
                onDone={() =>
                  window.setTimeout(() => setPhase("thinking"), 500)
                }
              />
            </h1>
          </div>

          {/* Fila 2: Dots (la IA está pensando) — visible solo durante "thinking" */}
          <div className="mt-10 min-h-[60px] flex items-center">
            <AnimatePresence>
              {phase === "thinking" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <TypingDots />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fila 3: Respuesta */}
          <div className="mt-2 min-h-[1.2em]">
            <AnimatePresence>
              {(phase === "answer" || phase === "done") && (
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]"
                >
                  <span className="text-foreground-muted">{t("answerA")}</span>
                  <span className="text-gradient-brand">
                    <Typewriter
                      key={t("answerB")}
                      text={t("answerB")}
                      startAfterMs={150}
                      charDelayMs={55}
                      showCursor
                      onDone={() =>
                        window.setTimeout(() => setPhase("done"), 400)
                      }
                    />
                  </span>
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          {/* Caption sutil — aparece al final */}
          <AnimatePresence>
            {phase === "done" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg"
              >
                {t("caption")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
