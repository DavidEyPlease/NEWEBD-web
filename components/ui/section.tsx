import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  surface?: "dark" | "darker" | "light";
};

const surfaceMap = {
  dark: "bg-ink-900 text-foreground",
  darker: "bg-background text-foreground",
  light: "bg-foreground text-ink-900",
} as const;

export function Section({
  className,
  surface = "darker",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-28 lg:py-32",
        surfaceMap[surface],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
