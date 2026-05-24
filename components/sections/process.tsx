"use client";

import { motion } from "framer-motion";
import { MessagesSquare, FileSearch, Wrench, Handshake } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const STEPS = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Briefing",
    description:
      "Una conversación honesta sobre tu negocio, lo que duele y lo que quieres lograr. Sin jerga.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Propuesta",
    description:
      "Alcance claro, tiempos realistas, inversión transparente. Decisiones tomadas con datos, no con humo.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Construcción",
    description:
      "Iteraciones cortas, visibilidad total, releases continuas. Trabajamos con tu equipo, no encerrados.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Acompañamiento",
    description:
      "Cuando lanzamos, seguimos contigo. Soporte, evolución, métricas. No desaparecemos al firmar.",
  },
];

export function Process() {
  return (
    <section className="relative bg-background py-24 sm:py-32">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default">Cómo trabajamos</Badge>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Un proceso pensado para que tú no tengas que pensarlo.
          </h2>
        </div>

        <div className="mt-16 relative">
          {/* Línea conectora horizontal en desktop */}
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
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                    {step.description}
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
