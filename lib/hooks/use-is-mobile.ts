"use client";

import { useEffect, useState } from "react";

const MOBILE_MAX = 767; // < 768px = mobile (Tailwind md breakpoint)

/**
 * Detecta si el viewport actual es mobile (< 768px).
 *
 * SSR-safe: en el primer render devuelve `false` (asumimos desktop) para no
 * romper la hidratación. El useEffect lo corrige en client. En desktop no hay
 * flicker; en mobile se ve un frame de la versión desktop antes del switch.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
