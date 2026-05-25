import type { Metadata } from "next";
import {
  Code2,
  AppWindow,
  Database,
  Brain,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Isotipo } from "@/components/brand/isotipo";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "desarrollo-web": Code2,
  "aplicaciones-a-medida": AppWindow,
  "sistemas-empresariales": Database,
  "soluciones-de-ia": Brain,
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.servicios" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("serviciosPage");
  const services = getServices(locale);

  return (
    <>
      {services.map((s) => (
        <ServiceJsonLd key={s.slug} service={s} locale={locale} />
      ))}
      <section className="relative overflow-hidden bg-background pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-purple/25 blur-[160px]" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-28 opacity-50 mix-blend-screen lg:hidden"
        >
          <Isotipo size={220} spin />
        </div>

        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-foreground/[0.04] px-4 py-1.5 backdrop-blur">
              <Sparkles size={13} className="text-brand-magenta" />
              <span className="text-xs font-medium tracking-wide uppercase text-foreground-muted">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
              {t("subtitle")}
            </p>
          </div>

          <nav
            aria-label="Services"
            className="mt-14 flex flex-wrap items-center justify-center gap-2"
          >
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-4 py-2 text-sm text-foreground-muted ring-1 ring-inset ring-border-strong transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
              >
                <span className="font-mono text-xs text-foreground-subtle">
                  {s.number}
                </span>
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {services.map((service, idx) => {
        const Icon = ICONS[service.slug] ?? Code2;
        const isHero = !!service.isDifferentiator;
        const isEven = idx % 2 === 0;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "relative scroll-mt-24 py-20 sm:py-28",
              isEven
                ? "bg-background"
                : "bg-ink-900 border-y border-border",
            )}
          >
            <Container size="wide">
              <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset",
                        isHero
                          ? "gradient-brand ring-white/20"
                          : "bg-foreground/[0.04] ring-border-strong",
                      )}
                    >
                      <Icon
                        size={20}
                        className={isHero ? "text-white" : "text-foreground"}
                      />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-foreground-subtle">
                      {service.number}
                    </span>
                    {isHero && (
                      <Badge variant="brand" className="ml-1">
                        {t("differentiator")}
                      </Badge>
                    )}
                  </div>

                  <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-lg font-medium text-foreground-muted">
                    {service.tagline}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>

                  <Button href="/contacto" variant="secondary" className="mt-8">
                    {t("ctaService")}
                    <ArrowRight size={16} />
                  </Button>
                </div>

                <div className="lg:col-span-7">
                  <ul role="list" className="grid gap-5">
                    {service.items.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-2xl border border-border bg-foreground/[0.02] p-7 transition-colors hover:border-border-strong hover:bg-foreground/[0.04]"
                      >
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                          {item.description}
                        </p>

                        <details className="group mt-4">
                          <summary className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">
                            <span className="transition-transform group-open:rotate-90">
                              ›
                            </span>
                            {t("deliverables")}
                          </summary>
                          <ul className="mt-3 grid grid-cols-1 gap-2 pl-4 sm:grid-cols-2">
                            {item.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2 text-sm text-foreground-muted"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-cyan" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
