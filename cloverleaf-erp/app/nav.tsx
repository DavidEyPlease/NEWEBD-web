"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./theme";

const GROUPS: { label: string; items: { href: string; icon: string; text: string }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/", icon: "◧", text: "Dashboard" }],
  },
  {
    label: "Commercial",
    items: [
      { href: "/leads/", icon: "◇", text: "Leads & CRM" },
      { href: "/clients/", icon: "◉", text: "Clients & Facilities" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/audits/", icon: "▤", text: "Audits" },
      { href: "/findings/", icon: "！", text: "Findings & CAPA" },
    ],
  },
  {
    label: "Certification",
    items: [
      { href: "/certificates/", icon: "✦", text: "Certificates" },
      { href: "/verify/", icon: "⌕", text: "Public Registry" },
    ],
  },
  {
    label: "Compliance",
    items: [{ href: "/auditors/", icon: "☗", text: "Auditor Competence" }],
  },
  {
    label: "Team",
    items: [
      { href: "/directory/", icon: "☰", text: "Directory" },
      { href: "/roles/", icon: "⚿", text: "Roles & Access" },
      { href: "/team/", icon: "◐", text: "Workload" },
    ],
  },
  {
    label: "Website",
    items: [{ href: "/website/", icon: "▣", text: "Site Feedback" }],
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="side">
      <div className="brand">
        {/* Logo oficial en blanco: la barra es verde profundo en ambos temas. */}
        <img src="/brand/main-logo-white.svg" alt="CloverLeaf Animal Welfare Systems" />
        <div className="s">Certification ERP</div>
      </div>
      <nav>
        {GROUPS.map((g) => (
          <div key={g.label}>
            <div className="grp">{g.label}</div>
            {g.items.map((it) => {
              // El dashboard solo se marca activo en la raíz exacta; el resto,
              // también en sus subpáginas (p. ej. el detalle de una auditoría).
              const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
              return (
                <Link key={it.href} href={it.href} className={active ? "item on" : "item"}>
                  <span className="ic">{it.icon}</span>
                  {it.text}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="foot">
        <span>Built by NEWEBD</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}

/**
 * Navegación para móvil: la barra lateral se oculta por debajo de 820px, así
 * que sin esto el portal quedaría sin forma de moverse entre pantallas.
 * Fila desplazable horizontalmente, con la sección activa marcada.
 */
export function MobileNav() {
  const pathname = usePathname();
  const items = GROUPS.flatMap((g) => g.items);

  return (
    <nav className="mobnav">
      {items.map((it) => {
        const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} className={active ? "mitem on" : "mitem"}>
            {it.text}
          </Link>
        );
      })}
    </nav>
  );
}
