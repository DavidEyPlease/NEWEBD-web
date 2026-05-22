import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

const COLUMNS = [
  {
    title: "Servicios",
    links: [
      { href: "/servicios#desarrollo-web", label: "Desarrollo Web" },
      { href: "/servicios#aplicaciones-a-medida", label: "Aplicaciones a Medida" },
      { href: "/servicios#sistemas-empresariales", label: "Sistemas Empresariales" },
      { href: "/servicios#soluciones-de-ia", label: "Soluciones de IA" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/portafolio", label: "Portafolio" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: "mailto:hola@newebd.com", label: "hola@newebd.com" },
      { href: "/contacto", label: "Cotiza tu proyecto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-muted">
              Integramos IA en tu negocio para que crezcas, ahorres tiempo y
              dinero. Desde México, para empresas listas para dar el siguiente paso.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} NEWEBD<sup>®</sup>. Todos los derechos reservados.
          </p>
          <p className="font-mono uppercase tracking-widest">
            newebd.com · niu-web-dí
          </p>
        </div>
      </Container>
    </footer>
  );
}
