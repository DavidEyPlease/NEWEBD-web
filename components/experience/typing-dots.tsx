"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

/**
 * Tres puntos animados estilo "alguien escribiendo" de WhatsApp/iMessage.
 */
export function TypingDots({ className, size = 14 }: Props) {
  return (
    <span
      aria-label="La IA está escribiendo"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-4 py-3 ring-1 ring-inset ring-border-strong backdrop-blur",
        className,
      )}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ width: size, height: size }}
          className="rounded-full bg-foreground/60"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
        />
      ))}
    </span>
  );
}
