"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";

const EXPERIENCE_ROUTES = ["/", "/contacto"];

/**
 * Renderiza el Footer solo en páginas tradicionales.
 * Las rutas slide-based (Home, /contacto) son full-screen y no necesitan footer.
 */
export function FooterConditional() {
  const pathname = usePathname();
  if (EXPERIENCE_ROUTES.includes(pathname)) return null;
  return <Footer />;
}
