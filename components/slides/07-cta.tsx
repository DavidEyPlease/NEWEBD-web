"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Isotipo } from "@/components/brand/isotipo";
import { Container } from "@/components/ui/container";
import type { SlideProps } from "@/components/experience/scroll-experience";

export function FinalCTASlide(_props: SlideProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      {/* Aurora maxima */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[700px] w-[700px] rounded-full bg-brand-purple/40 blur-[180px] animate-aurora" />
        <div
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-brand-magenta/35 blur-[160px] animate-aurora"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Isotipo gigante decorativo de fondo */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center mix-blend-screen"
      >
        <Isotipo size={720} spin />
      </motion.div>

      <Container size="wide" className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan"
          >
            Te toca
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-balance text-6xl font-semibold leading-[1.0] tracking-[-0.035em] text-foreground sm:text-7xl lg:text-[7rem]"
          >
            Tu <span className="text-gradient-brand">turno</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 text-lg leading-relaxed text-foreground-muted sm:text-xl"
          >
            Cuéntanos qué quieres construir. Respondemos rápido, sin promesas
            vacías.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-full gradient-brand px-8 py-4 text-base font-semibold text-white shadow-[0_18px_56px_-12px_rgba(189,65,224,0.75)] transition-all hover:-translate-y-0.5"
            >
              Cotiza tu proyecto
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="https://wa.me/5210000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-medium text-foreground ring-1 ring-inset ring-border-strong backdrop-blur transition-colors hover:bg-foreground/[0.06]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 text-sm text-foreground-subtle"
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
      </Container>
    </section>
  );
}
