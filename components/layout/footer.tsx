import { useTranslations } from "next-intl";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  // Las pathnames del Link tipado se localizan automáticamente al locale activo.
  // Para anchors (#desarrollo-web etc.) usamos un anchor <a> normal porque
  // van al fragmento actual de la página, no a otra ruta.
  const servicios = [
    { hash: "desarrollo-web", label: "Desarrollo Web" },
    { hash: "aplicaciones-a-medida", label: "Aplicaciones a Medida" },
    { hash: "sistemas-empresariales", label: "Sistemas Empresariales" },
    { hash: "soluciones-de-ia", label: "Soluciones de IA" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {t("tagline")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
                {t("servicios")}
              </h3>
              <ul className="mt-4 space-y-3">
                {servicios.map((s) => (
                  <li key={s.hash}>
                    <Link
                      href={`/servicios#${s.hash}` as never}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
                {t("empresa")}
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/portafolio"
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {t("portafolio")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {t("contacto")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
                {t("contactoSection")}
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hola@newebd.com"
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    hola@newebd.com
                  </a>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {t("cotizar")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} NEWEBD<sup>®</sup>. {t("rights")}
          </p>
          <p className="font-mono uppercase tracking-widest">
            newebd.com · niu-web-dí
          </p>
        </div>
      </Container>
    </footer>
  );
}
