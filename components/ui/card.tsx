import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

/**
 * Card con borde sutil, fondo translúcido y un halo de gradiente que aparece
 * al hover cuando se marca como interactive.
 */
export function Card({
  className,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-foreground/[0.02] p-6 backdrop-blur-sm transition-all duration-300",
        interactive &&
          "group hover:border-border-strong hover:bg-foreground/[0.04] hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      {interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 gradient-brand-soft blur-2xl"
        />
      )}
      {children}
    </div>
  );
}
