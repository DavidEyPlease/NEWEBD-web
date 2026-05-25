import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getCaseBySlug, getCases } from "@/lib/content/cases";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCases(locale).map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCaseBySlug(slug, locale);
  if (!c) return {};
  return {
    title: `${c.client} — ${c.industry}`,
    description: c.description,
  };
}

export default async function CaseDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const c = getCaseBySlug(slug, locale);
  if (!c) notFound();

  const t = await getTranslations("caseDetail");
  const tFeatured = await getTranslations("sections.featuredCase");
  const otherCases = getCases(locale).filter((other) => other.slug !== c.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-background pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[160px]" />
        </div>

        <Container size="default">
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            {t("back")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {c.featured && <Badge variant="brand">{tFeatured("badge")}</Badge>}
            <Badge variant="outline">{c.industry}</Badge>
            {c.location && (
              <Badge variant="default">
                <MapPin size={11} />
                {c.location}
              </Badge>
            )}
            {c.established && (
              <Badge variant="default">
                <Calendar size={11} />
                {t("established")} {c.established}
              </Badge>
            )}
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl">
            {c.client}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-foreground-muted sm:text-xl">
            {c.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={c.url} variant="secondary" size="md">
              {t("visitSite")}
              <ArrowUpRight size={16} />
            </Button>
            <Button href="/contacto" size="md">
              {tFeatured("ctaPrimary")}
            </Button>
          </div>
        </Container>
      </section>

      {c.metrics && (
        <section className="relative bg-background pb-16">
          <Container size="default">
            <ul
              role="list"
              className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-strong bg-border sm:grid-cols-3"
            >
              {c.metrics.map((m) => (
                <li
                  key={m.label}
                  className="flex flex-col items-start gap-1 bg-ink-900 p-7"
                >
                  <span className="text-4xl font-semibold tracking-tight text-gradient-brand sm:text-5xl">
                    {m.value}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground-muted">
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="relative bg-background pb-20">
        <Container size="default">
          <div className="grid gap-12 lg:grid-cols-3">
            <Block label={t("challenge")} content={c.challenge} />
            <Block label={t("solution")} content={c.solution} />
            <Block label={t("result")} content={c.result} />
          </div>

          {c.whyItMatters && (
            <div className="mt-16 rounded-3xl border border-border-strong bg-ink-900/60 p-8 sm:p-12">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                {t("whyItMatters")}
              </span>
              <p className="mt-4 text-balance text-xl leading-relaxed text-foreground sm:text-2xl">
                {c.whyItMatters}
              </p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-1.5">
            {c.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs text-foreground-muted ring-1 ring-inset ring-border"
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-background py-20 border-t border-border">
        <Container size="wide">
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {otherCases.map((other) => (
              <Link
                key={other.slug}
                href={{ pathname: "/portafolio/[slug]", params: { slug: other.slug } }}
                className="group rounded-2xl border border-border bg-foreground/[0.02] p-6 transition-all hover:border-border-strong hover:bg-foreground/[0.04]"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-subtle">
                  {other.industry}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {other.client}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {other.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-brand-cyan">
                  {tFeatured("ctaPrimary")}
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Block({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
        <span className="h-px w-6 gradient-brand" />
        {label}
      </span>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
        {content}
      </p>
    </div>
  );
}
