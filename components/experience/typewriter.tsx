"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  text: string;
  startAfterMs?: number;
  charDelayMs?: number;
  showCursor?: boolean;
  onDone?: () => void;
  className?: string;
};

/**
 * Tipea un texto carácter por carácter como máquina de escribir.
 * Cursor parpadeante mientras tipea y opcional al final.
 */
export function Typewriter({
  text,
  startAfterMs = 0,
  charDelayMs = 45,
  showCursor = true,
  onDone,
  className,
}: Props) {
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startAfterMs);
    return () => window.clearTimeout(t);
  }, [startAfterMs]);

  useEffect(() => {
    if (!started || done) return;
    if (chars >= text.length) {
      setDone(true);
      onDone?.();
      return;
    }
    const t = window.setTimeout(() => setChars((c) => c + 1), charDelayMs);
    return () => window.clearTimeout(t);
  }, [started, chars, text.length, charDelayMs, done, onDone]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{text.slice(0, chars)}</span>
      {showCursor && (started ? !done : true) && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.05em] animate-pulse bg-current"
        />
      )}
    </span>
  );
}
