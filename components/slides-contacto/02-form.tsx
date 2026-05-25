"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/services";
import type { SlideProps } from "@/components/experience/scroll-experience";

export function ContactoFormSlide(_props: SlideProps) {
  const t = useTranslations("contacto.form");
  const locale = useLocale();
  const services = getServices(locale);

  return (
    <section className="relative h-full w-full overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/20 blur-[180px]" />
      </div>

      <Container size="wide" className="relative h-full flex items-center py-8">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          action="https://formsubmit.co/hola@newebd.com"
          method="POST"
          className="mx-auto w-full max-w-2xl rounded-3xl border border-border-strong bg-ink-900/60 p-8 backdrop-blur sm:p-10"
        >
          <input type="hidden" name="_subject" value="Nueva cotización desde newebd.com" />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="/contacto?ok=1" />

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground-subtle">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
            {t("title")}
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Field label={t("nameLabel")} name="nombre" type="text" required placeholder={t("namePlaceholder")} />
            <Field label={t("companyLabel")} name="empresa" type="text" required placeholder={t("companyPlaceholder")} />
            <Field label={t("emailLabel")} name="email" type="email" required placeholder={t("emailPlaceholder")} />
            <Field label={t("phoneLabel")} name="telefono" type="tel" placeholder={t("phonePlaceholder")} />
          </div>

          <div className="mt-4">
            <label htmlFor="servicio" className="block text-sm font-medium text-foreground">
              {t("serviceLabel")} <span className="text-brand-magenta">*</span>
            </label>
            <select
              id="servicio"
              name="servicio"
              required
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-base text-foreground focus:border-brand-purple focus:outline-none"
            >
              <option value="" disabled>
                {t("servicePlaceholder")}
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Unsure">{t("serviceUnsure")}</option>
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="ia" className="block text-sm font-medium text-foreground">
              {t("iaLabel")} <span className="text-brand-magenta">*</span>
            </label>
            <textarea
              id="ia"
              name="ia"
              rows={3}
              required
              placeholder={t("iaPlaceholder")}
              className="mt-2 w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground-subtle focus:border-brand-purple focus:outline-none"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-foreground-subtle">{t("privacy")}</p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_56px_-12px_rgba(189,65,224,0.55)] transition-all hover:-translate-y-0.5"
            >
              {t("submit")}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.form>
      </Container>
    </section>
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
