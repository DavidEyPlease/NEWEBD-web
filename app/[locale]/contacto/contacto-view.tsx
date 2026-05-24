"use client";

import { useTranslations } from "next-intl";

import { ScrollExperience } from "@/components/experience/scroll-experience";
import { MobileContacto } from "@/components/experience/mobile-contacto";
import { ContactoIntroSlide } from "@/components/slides-contacto/01-intro";
import { ContactoFormSlide } from "@/components/slides-contacto/02-form";
import { ContactoThanksSlide } from "@/components/slides-contacto/03-thanks";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

export function ContactoView() {
  const t = useTranslations("slideLabels");
  const isMobile = useIsMobile();
  if (isMobile) return <MobileContacto />;

  const slides = [
    { id: "intro", label: t("channels"), Component: ContactoIntroSlide },
    { id: "form", label: t("quote"), Component: ContactoFormSlide },
    { id: "thanks", label: t("done"), Component: ContactoThanksSlide },
  ];

  return <ScrollExperience slides={slides} />;
}
