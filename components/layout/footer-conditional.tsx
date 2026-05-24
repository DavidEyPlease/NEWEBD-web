"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

const EXPERIENCE_ROUTES = ["/", "/contacto"];

/**
 * Renderiza el Footer en páginas tradicionales y en las experience routes
 * cuando se ven en mobile (donde son scroll natural, no slide-based).
 */
export function FooterConditional() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isSlideBased = EXPERIENCE_ROUTES.includes(pathname) && !isMobile;
  if (isSlideBased) return null;
  return <Footer />;
}
