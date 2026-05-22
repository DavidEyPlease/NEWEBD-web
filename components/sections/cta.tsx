"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Isotipo } from "@/components/brand/isotipo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-ink-900 p-10 sm:p-16 lg:p-20">
          {/* Backdrop gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90 gradient-brand-soft"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 h-[400px] w-[400px] rounded-full bg-brand-purple/40 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-brand-cyan/30 blur-[120px]"
          />

          {/* Isotipo decorativo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-30 mix-blend-screen lg:block"
          >
            <Isotipo size={360} spin />
          </div>

          <div className="relative max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl"
            >
              Listo para que tu negocio entre a{" "}
              <span className="text-gradient-brand">la era de la IA.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted"
            >
              Cuéntanos qué quieres construir. Te respondemos rápido, sin
              promesas vacías, con un plan claro y un precio honesto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/contacto" size="lg">
                Cotiza tu proyecto
                <ArrowRight size={18} />
              </Button>
              <Button
                href="https://wa.me/5210000000000"
                variant="secondary"
                size="lg"
              >
                <MessageCircle size={18} />
                WhatsApp
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-sm text-foreground-subtle"
            >
              O escríbenos a{" "}
              <a
                href="mailto:hola@newebd.com"
                className="text-foreground underline-offset-4 hover:underline"
              >
                hola@newebd.com
              </a>
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
