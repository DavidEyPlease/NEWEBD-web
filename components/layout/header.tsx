"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { cn } from "@/lib/utils";

const NAV: { href: "/servicios" | "/portafolio" | "/contacto"; key: "servicios" | "portafolio" | "contacto" }[] = [
  { href: "/servicios", key: "servicios" },
  { href: "/portafolio", key: "portafolio" },
  { href: "/contacto", key: "contacto" },
];

const EXPERIENCE_ROUTES = ["/", "/contacto"];

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const isMobile = useIsMobile();
  // En mobile las rutas "experience" son scroll natural, así que el header
  // debe comportarse igual que en una página tradicional.
  const isExperience = EXPERIENCE_ROUTES.includes(pathname) && !isMobile;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isExperience) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isExperience]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Logo size="sm" />

        {!isExperience && (
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch className="hidden sm:inline-flex" />

          {pathname !== "/contacto" && (
            <div className="hidden md:block">
              <Button href="/contacto" size="sm">
                {t("cta")}
              </Button>
            </div>
          )}

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground ring-1 ring-inset ring-border-strong",
              isExperience ? "" : "md:hidden",
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 sm:px-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base transition-colors hover:bg-foreground/[0.04]",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            {pathname !== "/contacto" && (
              <Button
                href="/contacto"
                size="md"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                {t("cta")}
              </Button>
            )}
            <div className="mt-3 flex justify-start sm:hidden">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
