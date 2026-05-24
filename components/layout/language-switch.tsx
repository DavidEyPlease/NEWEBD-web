"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Switch ES/EN. Cambia el locale manteniendo la ruta actual (next-intl
 * traduce el pathname al equivalente del nuevo locale).
 */
export function LanguageSwitch({ className }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;
    startTransition(() => {
      // pathname aquí es la pathname tipada de routing (puede incluir
      // patrones como /portafolio/[slug]). Pasamos params para que el
      // router resuelva los segmentos dinámicos en la URL destino.
      router.replace(
        // @ts-expect-error -- pathname + params combinan rutas estáticas y dinámicas
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full ring-1 ring-inset ring-border-strong bg-foreground/[0.04] p-0.5",
        isPending && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors",
              active
                ? "bg-foreground text-ink-900"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
