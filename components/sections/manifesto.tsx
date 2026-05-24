"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Wallet, Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Crecer",
    description:
      "Llega a más clientes, vende más, abre canales nuevos. La IA escala lo que tú haces bien.",
  },
  {
    icon: Clock,
    title: "Ahorrar tiempo",
    description:
      "Horas que se iban en tareas repetitivas vuelven al equipo. Para enfocarse en lo que sí pide criterio.",
  },
  {
    icon: Wallet,
    title: "Ahorrar dinero",
    description:
      "Menos errores, menos doble captura, menos software disperso. Tu operación más liviana.",
  },
];

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Backdrop sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/15 blur-[160px]" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <Container size="wide">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Badge variant="default">Manifiesto</Badge>

            <div className="mt-6 flex items-start gap-4">
              <Quote
                size={32}
                className="mt-2 shrink-0 text-brand-magenta"
                aria-hidden
              />
              <p className="text-balance text-3xl font-medium leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                La IA o te ayuda a{" "}
                <span className="text-gradient-brand">
                  revolucionar tu negocio
                </span>
                , o te deja en el pasado si no la aprovechas.
              </p>
            </div>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground-muted">
              No vendemos workshops abstractos ni implementaciones "para
              después". Somos el equipo que pone IA <em>dentro</em> de tu
              operación, conectada a lo que ya tienes y con resultados que se
              miden en tiempo y dinero ahorrado.
            </p>
          </div>

          <div className="lg:col-span-6">
            <ul role="list" className="grid gap-4">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.li
                    key={benefit.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="group relative flex items-start gap-5 rounded-2xl border border-border bg-foreground/[0.02] p-6 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.6)]">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
