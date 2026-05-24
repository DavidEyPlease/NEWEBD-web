import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "gradient-brand text-white shadow-[0_10px_40px_-12px_rgba(139,92,246,0.55)] hover:shadow-[0_18px_56px_-12px_rgba(139,92,246,0.75)] hover:-translate-y-0.5",
        secondary:
          "bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-border-strong backdrop-blur hover:bg-foreground/[0.10]",
        ghost: "text-foreground-muted hover:text-foreground",
        outline:
          "ring-1 ring-inset ring-border-strong text-foreground hover:bg-foreground/[0.06]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> &
      VariantProps<typeof buttonVariants> & {
        href?: undefined;
      })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> &
      VariantProps<typeof buttonVariants> & {
        href: string;
      });

export function Button(props: ButtonProps) {
  const { variant, size, className } = props;

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant, size }), className)}
          {...rest}
        />
      );
    }
    // El Link de next-intl espera una pathname tipada; aquí el href puede ser
    // cualquier ruta interna válida (incluyendo /portafolio/[slug] resuelto),
    // así que silenciamos el chequeo estricto.
    return (
      <Link
        // @ts-expect-error -- href dinámico aceptado en runtime
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props;
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}

export { buttonVariants };
