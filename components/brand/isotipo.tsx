import { cn } from "@/lib/utils";

type IsotipoProps = {
  className?: string;
  size?: number;
  spin?: boolean;
  ariaLabel?: string;
};

/**
 * Isotipo NEWEBD — wrapper SVG que embebe el PNG oficial del logo.
 *
 * El isotipo oficial tiene un degradado con perspectiva 3D difícil de
 * reproducir 1:1 en paths vectoriales. Embeber el PNG dentro de un <svg> nos da:
 *  - 100% fidelidad al logo recibido
 *  - Comportamiento idéntico a un SVG (escalable, animable con transforms)
 *  - Una sola fuente de verdad: /public/brand/isotipo.png (460×453, alpha matting)
 *
 * Cuando se reciba el SVG vectorial oficial, reemplazar este componente.
 */
export function Isotipo({
  className,
  size = 56,
  spin = false,
  ariaLabel = "Isotipo NEWEBD",
}: IsotipoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 272 219"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      aria-label={ariaLabel}
      className={cn(spin && "animate-spin-slow", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <image
        href="/brand/isotipo.png"
        xlinkHref="/brand/isotipo.png"
        width="272"
        height="219"
        x="0"
        y="0"
      />
    </svg>
  );
}
