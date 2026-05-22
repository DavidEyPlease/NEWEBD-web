"use client";

import { cn } from "@/lib/utils";

type Props = {
  total: number;
  current: number;
  onGoTo: (i: number) => void;
  labels?: string[];
  className?: string;
};

export function SlideIndicator({
  total,
  current,
  onGoTo,
  labels,
  className,
}: Props) {
  return (
    <div
      role="tablist"
      aria-label="Navegación de slides"
      className={cn(
        "fixed right-6 top-1/2 z-40 -translate-y-1/2 flex flex-col gap-3 sm:right-8",
        className,
      )}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const label = labels?.[i] ?? `Slide ${i + 1}`;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            onClick={() => onGoTo(i)}
            className="group relative inline-flex h-6 w-6 items-center justify-center"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "h-1.5 w-6 gradient-brand"
                  : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60",
              )}
            />
            {labels && (
              <span
                className={cn(
                  "pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-md bg-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur transition-opacity duration-200",
                  isActive
                    ? "opacity-0"
                    : "opacity-0 group-hover:opacity-100",
                )}
              >
                {label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
