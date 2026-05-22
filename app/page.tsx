import { ScrollExperience } from "@/components/experience/scroll-experience";
import { HeroSlide } from "@/components/slides/01-hero";
import { ManifestoSlide } from "@/components/slides/02-manifesto";
import { ServicesSlide } from "@/components/slides/03-services";
import { FeaturedCaseSlide } from "@/components/slides/04-featured-case";
import { OtherCasesSlide } from "@/components/slides/05-other-cases";
import { ProcessSlide } from "@/components/slides/06-process";
import { FinalCTASlide } from "@/components/slides/07-cta";

const SLIDES = [
  { id: "hero", label: "Inicio", Component: HeroSlide },
  { id: "manifiesto", label: "Manifiesto", Component: ManifestoSlide },
  { id: "servicios", label: "Servicios", Component: ServicesSlide },
  { id: "caso-estrella", label: "Caso estrella", Component: FeaturedCaseSlide },
  { id: "portafolio", label: "Portafolio", Component: OtherCasesSlide },
  { id: "proceso", label: "Cómo trabajamos", Component: ProcessSlide },
  { id: "cierre", label: "Cierre", Component: FinalCTASlide },
];

export default function Home() {
  return <ScrollExperience slides={SLIDES} />;
}
