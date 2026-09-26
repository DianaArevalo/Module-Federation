import { AboutSection } from "@/components/landing/AboutSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { DomainsSection } from "@/components/landing/DomainsSection";
import { Hero } from "@/components/landing/Hero";
import { RoadmapSection } from "@/components/landing/RoadmapSection";

/**
 * Ruta `/` — página principal de NUTRIA.
 *
 * Pertenece al SHELL-NUTRIA (HOST / ORQUESTADOR): el Hero, la explicación del
 * taller, la arquitectura, los dominios y el roadmap son contenido del Shell.
 * Los Microfrontends todavía no existen.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ArchitectureSection />
      <DomainsSection />
      <RoadmapSection />
    </>
  );
}
