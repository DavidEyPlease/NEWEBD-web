"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, FileText } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { SlideProps } from "@/components/experience/scroll-experience";

export function ContactoIntroSlide({ next }: SlideProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-brand-purple/35 blur-[160px] animate-aurora" />
        <div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-cyan/30 blur-[160px] animate-aurora"
          style={{ animationDelay: "-8s" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan"
          >
            Contacto
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Hablemos.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
          >
            Elige cómo prefieres. Respondemos rápido en todos los canales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 grid gap-4 sm:grid-cols-3"
          >
            <a
              href="https://wa.me/5210000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-foreground/[0.02] p-7 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/[0.04] ring-1 ring-inset ring-border-strong transition-colors group-hover:bg-foreground/[0.08]">
                <MessageCircle size={20} className="text-foreground" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                WhatsApp
              </span>
              <span className="text-sm text-foreground">
                Lo más rápido
              </span>
            </a>

            <a
              href="mailto:hola@newebd.com"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-foreground/[0.02] p-7 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/[0.04] ring-1 ring-inset ring-border-strong transition-colors group-hover:bg-foreground/[0.08]">
                <Mail size={20} className="text-foreground" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                Email
              </span>
              <span className="text-sm text-foreground">
                hola@newebd.com
              </span>
            </a>

            <button
              type="button"
              onClick={next}
              className="group flex flex-col items-center gap-3 rounded-2xl p-[1px] gradient-brand shadow-[0_20px_60px_-20px_rgba(189,65,224,0.55)] transition-all hover:-translate-y-0.5"
            >
              <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-ink-900 p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-brand text-white">
                  <FileText size={20} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  Cotización
                </span>
                <span className="text-sm text-foreground-muted">
                  Cuéntanos del proyecto
                </span>
              </div>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 text-xs text-foreground-subtle"
          >
            ↓ Scroll para ir a la cotización
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
