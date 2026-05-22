"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  show?: boolean;
  label?: string;
  className?: string;
};

export function ScrollHint({
  show = true,
  label = "Scroll para continuar",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className={cn(
        "pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground-subtle">
        {label}
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-inset ring-border-strong"
      >
        <ChevronDown size={14} className="text-foreground-muted" />
      </motion.span>
    </motion.div>
  );
}
