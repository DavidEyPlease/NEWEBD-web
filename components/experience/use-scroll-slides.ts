"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  total: number;
  cooldown?: number; // ms entre transiciones
  wheelThreshold?: number; // delta mínimo para disparar
  swipeThreshold?: number; // px mínimos de swipe
};

/**
 * Hook que controla un sistema de slides full-screen.
 * Maneja wheel, touch, teclado y respeta prefers-reduced-motion.
 *
 * Retorna:
 *  - index: slide activo (0..total-1)
 *  - goTo(i): salta a un slide específico
 *  - next(): avanza un slide
 *  - prev(): retrocede un slide
 *  - direction: +1 (avanzando) o -1 (retrocediendo) — útil para animaciones
 */
export function useScrollSlides({
  total,
  cooldown = 750,
  wheelThreshold = 25,
  swipeThreshold = 50,
}: Options) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const lockRef = useRef(false);
  const totalRef = useRef(total);
  const indexRef = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const accumulatedDeltaRef = useRef(0);

  // Mantener refs sincronizados
  useEffect(() => {
    totalRef.current = total;
  }, [total]);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const tryGoTo = useCallback(
    (nextIndex: number, dir: number) => {
      if (lockRef.current) return false;
      const clamped = Math.max(0, Math.min(totalRef.current - 1, nextIndex));
      if (clamped === indexRef.current) return false;

      lockRef.current = true;
      setDirection(dir);
      setIndex(clamped);
      window.setTimeout(() => {
        lockRef.current = false;
        accumulatedDeltaRef.current = 0;
      }, cooldown);
      return true;
    },
    [cooldown],
  );

  const next = useCallback(() => {
    tryGoTo(indexRef.current + 1, 1);
  }, [tryGoTo]);

  const prev = useCallback(() => {
    tryGoTo(indexRef.current - 1, -1);
  }, [tryGoTo]);

  const goTo = useCallback(
    (i: number) => {
      const dir = i > indexRef.current ? 1 : -1;
      tryGoTo(i, dir);
    },
    [tryGoTo],
  );

  useEffect(() => {
    // Respetar reduce-motion: dejamos el scroll nativo
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const onWheel = (e: WheelEvent) => {
      // Solo interceptamos scroll vertical
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();

      if (lockRef.current) return;

      // Acumulamos delta para que trackpad sutil también funcione
      accumulatedDeltaRef.current += e.deltaY;

      if (accumulatedDeltaRef.current > wheelThreshold) {
        next();
      } else if (accumulatedDeltaRef.current < -wheelThreshold) {
        prev();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      // Prevenir scroll nativo en mobile
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      touchStartY.current = null;
      if (Math.abs(delta) < swipeThreshold) return;
      if (delta > 0) next();
      else prev();
    };

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(totalRef.current - 1);
          break;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev, goTo, wheelThreshold, swipeThreshold]);

  return { index, direction, goTo, next, prev };
}
