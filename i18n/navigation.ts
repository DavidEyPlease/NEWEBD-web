import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Wrappers tipados de Link, redirect, usePathname y useRouter que respetan
 * las pathnames traducidas del routing. Usar estos en vez de los de
 * next/link y next/navigation cuando se navega entre rutas localizadas.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
