"use client";

import { useEffect, useState } from "react";

const KEY = "clv-theme";

/**
 * Interruptor día/noche. El tema real lo fija un script en línea antes del
 * primer pintado (ver layout), así que aquí solo leemos lo ya aplicado para
 * que el botón no parpadee con el valor equivocado.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* modo privado: el tema simplemente no se recuerda */
    }
  };

  return (
    <button className="themetog" onClick={toggle} aria-label="Switch theme">
      {dark ? "☾ Night" : "☀ Day"}
    </button>
  );
}

/** Script que aplica el tema guardado antes de pintar, para evitar el destello. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${KEY}');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;
