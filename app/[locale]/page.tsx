"use client";

import { useTranslations } from "next-intl";

import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { MobileHome } from "@/components/experience/mobile-home";
import { HeroSlide } from "@/components/slides/01-hero";
import { ManifestoSlide } from "@/components/slides/02-manifesto";
import { ServicesSlide } from "@/components/slides/03-services";
import { FeaturedCaseSlide } from "@/components/slides/04-featured-case";
import { OtherCasesSlide } from "@/components/slides/05-other-cases";
import { ProcessSlide } from "@/components/slides/06-process";
import { FinalCTASlide } from "@/components/slides/07-cta";

export default function Home() {
  const t = useTranslations("slideLabels");
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHome />;
  }

  const slides = [
    { id: "hero", label: t("home"), Component: HeroSlide },
    { id: "manifiesto", label: t("manifesto"), Component: ManifestoSlide },
    { id: "servicios", label: t("services"), Component: ServicesSlide },
    { id: "caso-estrella", label: t("featuredCase"), Component: FeaturedCaseSlide },
    { id: "portafolio", label: t("portfolio"), Component: OtherCasesSlide },
    { id: "proceso", label: t("process"), Component: ProcessSlide },
    { id: "cierre", label: t("closing"), Component: FinalCTASlide },
  ];

  return <ScrollExperience slides={slides} />;
}
