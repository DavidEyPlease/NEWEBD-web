import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "brand" | "outline";
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        variant === "default" &&
          "bg-foreground/5 text-foreground-muted ring-1 ring-inset ring-border",
        variant === "brand" &&
          "gradient-brand text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)]",
        variant === "outline" &&
          "text-foreground ring-1 ring-inset ring-border-strong",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
