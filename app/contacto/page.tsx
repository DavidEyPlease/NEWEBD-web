import type { Metadata } from "next";

import { ScrollExperience } from "@/components/experience/scroll-experience";
import { ContactoIntroSlide } from "@/components/slides-contacto/01-intro";
import { ContactoFormSlide } from "@/components/slides-contacto/02-form";
import { ContactoThanksSlide } from "@/components/slides-contacto/03-thanks";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué quieres construir. Respondemos rápido en WhatsApp, email o con cotización formal.",
};

const SLIDES = [
  { id: "intro", label: "Canales", Component: ContactoIntroSlide },
  { id: "form", label: "Cotización", Component: ContactoFormSlide },
  { id: "thanks", label: "Listo", Component: ContactoThanksSlide },
];

export default function ContactoPage() {
  return <ScrollExperience slides={SLIDES} />;
}
