"use client";

import { useEffect } from "react";

/**
 * Marca el documento como animable. Las entradas están escritas bajo
 * `html.anim`, así que si el JS no corre el contenido simplemente se ve,
 * en lugar de quedarse invisible esperando una animación que nunca llega.
 */
export function EnableAnimations() {
  useEffect(() => {
    document.documentElement.classList.add("anim");
  }, []);
  return null;
}
