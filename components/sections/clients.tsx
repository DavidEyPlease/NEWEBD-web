"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { DIRECT_CLIENTS } from "@/lib/content/clients";

export function Clients() {
  const t = useTranslations("sections.clients");

  return (
    <section className="relative border-y border-border bg-background py-20">
      <Container size="wide">
        <div className="flex flex-col items-center gap-3">
          <span aria-hidden className="h-px w-12 gradient-brand opacity-80" />
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground-muted">
            {t("label")}
          </p>
        </div>

        <ul
          role="list"
          className="mt-12 grid grid-cols-2 items-center gap-y-10 sm:grid-cols-3 md:grid-cols-5"
        >
          {DIRECT_CLIENTS.map((client, idx) => (
            <motion.li
              key={client.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group relative flex items-center justify-center md:[&:not(:last-child)]:before:absolute md:[&:not(:last-child)]:before:right-0 md:[&:not(:last-child)]:before:top-1/2 md:[&:not(:last-child)]:before:-translate-y-1/2 md:[&:not(:last-child)]:before:h-6 md:[&:not(:last-child)]:before:w-px md:[&:not(:last-child)]:before:bg-border"
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${client.name}`}
                className="relative inline-flex items-baseline gap-1 px-4 py-2 transition-all"
              >
                <span className="text-base font-semibold tracking-[0.08em] text-foreground-muted transition-all duration-300 group-hover:text-foreground sm:text-lg">
                  {client.name.toUpperCase()}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-4 -bottom-1 h-px gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
