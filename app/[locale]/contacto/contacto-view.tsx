"use client";

import { ScrollExperience } from "@/components/experience/scroll-experience";
import { MobileContacto } from "@/components/experience/mobile-contacto";
import { ContactoIntroSlide } from "@/components/slides-contacto/01-intro";
import { ContactoFormSlide } from "@/components/slides-contacto/02-form";
import { ContactoThanksSlide } from "@/components/slides-contacto/03-thanks";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

const SLIDES = [
  { id: "intro", label: "Canales", Component: ContactoIntroSlide },
  { id: "form", label: "Cotización", Component: ContactoFormSlide },
  { id: "thanks", label: "Listo", Component: ContactoThanksSlide },
];

export function ContactoView() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileContacto />;
  return <ScrollExperience slides={SLIDES} />;
}
