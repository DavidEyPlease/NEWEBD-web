import Link from "next/link";

import { Isotipo } from "@/components/brand/isotipo";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  showWordmark?: boolean;
};

const sizeMap = {
  sm: { iso: 28, text: "text-base" },
  md: { iso: 36, text: "text-lg" },
  lg: { iso: 48, text: "text-2xl" },
} as const;

export function Logo({
  className,
  size = "md",
  href = "/",
  showWordmark = true,
}: LogoProps) {
  const { iso, text } = sizeMap[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Isotipo size={iso} ariaLabel="NEWEBD" />
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-[0.18em] uppercase text-foreground",
            text,
          )}
        >
          NEWEBD
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="NEWEBD — Inicio" className="group">
      {content}
    </Link>
  );
}
