"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { Container } from "@/components/ui/container";
import { SERVICES } from "@/lib/content/services";

/**
 * Versión mobile de /contacto: scroll natural con Hero + canales + form.
 * Reemplaza el ScrollExperience slide-based en viewports <md.
 */
export function MobileContacto() {
  const t = useTranslations("contacto");
  const tf = useTranslations("contacto.form");

  return (
    <>
      <section className="relative overflow-hidden bg-background pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-purple/30 blur-[160px] animate-aurora" />
          <div
            className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-cyan/25 blur-[160px] animate-aurora"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-12 opacity-40 mix-blend-screen lg:hidden"
        >
          <Isotipo size={180} spin />
        </div>

        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted"
            >
              {t("subtitle")}
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="relative bg-background pb-16">
        <Container size="wide">
          <div className="mx-auto grid max-w-3xl gap-3">
            <motion.a
              href="https://wa.me/5210000000000"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-foreground/[0.02] p-5 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.04] ring-1 ring-inset ring-border-strong transition-colors group-hover:bg-foreground/[0.08]">
                <MessageCircle size={20} className="text-foreground" />
              </span>
              <div className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                  {t("whatsappTitle")}
                </span>
                <span className="mt-1 block text-sm text-foreground">
                  {t("whatsappSub")}
                </span>
              </div>
              <ArrowRight size={16} className="text-foreground-subtle" />
            </motion.a>

            <motion.a
              href="mailto:hola@newebd.com"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-foreground/[0.02] p-5 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.04] ring-1 ring-inset ring-border-strong transition-colors group-hover:bg-foreground/[0.08]">
                <Mail size={20} className="text-foreground" />
              </span>
              <div className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                  {t("emailTitle")}
                </span>
                <span className="mt-1 block text-sm text-foreground">
                  hola@newebd.com
                </span>
              </div>
              <ArrowRight size={16} className="text-foreground-subtle" />
            </motion.a>

            <motion.a
              href="#form"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="group flex items-center gap-4 rounded-2xl p-[1px] gradient-brand shadow-[0_18px_56px_-12px_rgba(189,65,224,0.45)]"
            >
              <div className="flex w-full items-center gap-4 rounded-2xl bg-ink-900 p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
                  <FileText size={20} />
                </span>
                <div className="flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
                    {t("cotizacionTitle")}
                  </span>
                  <span className="mt-1 block text-sm text-foreground-muted">
                    {t("cotizacionSub")}
                  </span>
                </div>
                <ArrowRight size={16} className="text-foreground" />
              </div>
            </motion.a>
          </div>
        </Container>
      </section>

      <section
        id="form"
        className="relative scroll-mt-24 overflow-hidden bg-background py-20 sm:py-28"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/15 blur-[160px]" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-24 opacity-40 mix-blend-screen lg:hidden"
        >
          <Isotipo size={180} spin />
        </div>

        <Container size="wide">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            action="https://formsubmit.co/hola@newebd.com"
            method="POST"
            className="mx-auto w-full max-w-2xl rounded-3xl border border-border-strong bg-ink-900/60 p-7 backdrop-blur sm:p-10"
          >
            <input type="hidden" name="_subject" value="Nueva cotización desde newebd.com" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="/contacto?ok=1" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle">
              {tf("eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
              {tf("title")}
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field label={tf("nameLabel")} name="nombre" type="text" required placeholder={tf("namePlaceholder")} />
              <Field label={tf("companyLabel")} name="empresa" type="text" required placeholder={tf("companyPlaceholder")} />
              <Field label={tf("emailLabel")} name="email" type="email" required placeholder={tf("emailPlaceholder")} />
              <Field label={tf("phoneLabel")} name="telefono" type="tel" placeholder={tf("phonePlaceholder")} />
            </div>

            <div className="mt-4">
              <label htmlFor="servicio" className="block text-sm font-medium text-foreground">
                {tf("serviceLabel")} <span className="text-brand-magenta">*</span>
              </label>
              <select
                id="servicio"
                name="servicio"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-base text-foreground focus:border-brand-purple focus:outline-none"
              >
                <option value="" disabled>
                  {tf("servicePlaceholder")}
                </option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Unsure">{tf("serviceUnsure")}</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="ia" className="block text-sm font-medium text-foreground">
                {tf("iaLabel")} <span className="text-brand-magenta">*</span>
              </label>
              <textarea
                id="ia"
                name="ia"
                rows={3}
                required
                placeholder={tf("iaPlaceholder")}
                className="mt-2 w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground-subtle focus:border-brand-purple focus:outline-none"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-foreground-subtle">{tf("privacy")}</p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_56px_-12px_rgba(189,65,224,0.55)] transition-all hover:-translate-y-0.5"
              >
                {tf("submit")}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.form>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-brand-magenta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground-subtle focus:border-brand-purple focus:outline-none"
      />
    </div>
  );
}
