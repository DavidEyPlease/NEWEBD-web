import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { FeaturedCase } from "@/components/sections/featured-case";
import { CasesGrid } from "@/components/sections/cases-grid";
import { Clients } from "@/components/sections/clients";
import { Process } from "@/components/sections/process";
import { FinalCTA } from "@/components/sections/cta";

/**
 * Versión mobile del home: scroll natural apilando las secciones tradicionales.
 * Sin scroll-hijack, sin slides cinematic. Evita los conflictos del header
 * fixed con el contenido en viewports chicos.
 */
export function MobileHome() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <FeaturedCase />
      <Clients />
      <CasesGrid />
      <Process />
      <FinalCTA />
    </>
  );
}
