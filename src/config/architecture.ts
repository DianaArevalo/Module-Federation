/**
 * Datos estructurales del Shell.
 *
 * Identidad de la aplicación, secciones de la página principal, arquitectura,
 * dominios y roadmap. El contenido de este archivo proviene del README, que es
 * la fuente de verdad del proyecto.
 */

export const SHELL = {
  product: "NUTRIA",
  app: "SHELL-NUTRIA",
  repository: "nutria-shell",
  role: "HOST / ORQUESTADOR",
  tagline: "Frontend principal de NUTRIA · HOST de Module Federation",
  summary:
    "Punto de entrada de la aplicación frontend de NUTRIA. El Shell orquesta, navega y compone los Microfrontends que vivirán en repositorios independientes.",
} as const;

export const TECH_STACK: string[] = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Module Federation",
  "pnpm",
  "CSS nativo",
];

export interface SectionLink {
  id: string;
  label: string;
}

/** Anclas de navegación del Navbar. Todas apuntan a secciones de la página. */
export const SECTION_LINKS: SectionLink[] = [
  { id: "que-es", label: "Qué es" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "dominios", label: "Dominios" },
  { id: "roadmap", label: "Roadmap" },
];

export interface NavigationLink {
  label: string;
  href: string;
}

export const ROUTE_LINKS: NavigationLink[] = [
  { label: "Afiliados", href: "/afiliados" },
];

export type State = "done" | "planned";

export const STATE_LABEL: Record<State, string> = {
  done: "implementado",
  planned: "pendiente",
};

export interface Responsibility {
  id: string;
  title: string;
  description: string;
  state: State;
}

/** Responsabilidades del Shell (README §1 y §5). */
export const RESPONSIBILITIES: Responsibility[] = [
  {
    id: "host",
    title: "HOST",
    description:
      "Aplica Module Federation para consumir, en tiempo de ejecución, los módulos que exponen los Remotes.",
    state: "done",
  },
  {
    id: "entrada",
    title: "Punto de entrada",
    description:
      "Es la aplicación desde la que el usuario entra y sobre la que se construye todo lo demás.",
    state: "done",
  },
  {
    id: "orquestacion",
    title: "Orquestación",
    description:
      "Integra y presenta los Microfrontends. Es quien los conoce y los coordina.",
    state: "planned",
  },
  {
    id: "composicion",
    title: "Composición",
    description:
      "Determina dónde y cómo se presentan los Microfrontends dentro de su interfaz.",
    state: "planned",
  },
  {
    id: "seguridad",
    title: "Capacidades transversales",
    description:
      "Autenticación, autorización, sesión y control de acceso. Se construirán más adelante en el taller.",
    state: "planned",
  },
];

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string | null;
  note: string | null;
  state: State;
}

/** Flujo de la arquitectura actual (README §1 y §2). */
export const ARCHITECTURE_FLOW: ArchitectureNode[] = [
  { id: "nutria", name: "NUTRIA", role: null, note: null, state: "done" },
  {
    id: "shell",
    name: "nutria-shell",
    role: "HOST / ORQUESTADOR",
    note: "Este repositorio · punto de entrada, navegación y composición",
    state: "done",
  },
  {
    id: "afiliados",
    name: "nutria-mfe-afiliados",
    role: "REMOTE",
    note: "Otro repositorio · se creará en la etapa 2",
    state: "planned",
  },
];

export const ARCHITECTURE_CONNECTOR = "Module Federation";

export interface Concept {
  id: string;
  term: string;
  definition: string;
}

/** Conceptos de la arquitectura (README §2, §3 y §6). */
export const ARCHITECTURE_CONCEPTS: Concept[] = [
  {
    id: "host",
    term: "Host",
    definition:
      "nutria-shell es la aplicación anfitriona: la que el usuario abre y la que contiene la estructura general.",
  },
  {
    id: "orquestador",
    term: "Orquestador",
    definition:
      "El Shell decide qué Microfrontends se muestran, dónde y en qué momento.",
  },
  {
    id: "remote",
    term: "Remote",
    definition:
      "Aplicación independiente que expone módulos para que otras aplicaciones puedan consumirlos.",
  },
  {
    id: "module-federation",
    term: "Module Federation",
    definition:
      "Permite que el HOST consuma los módulos que exponen los Remotes en tiempo de ejecución, sin copia de código.",
  },
  {
    id: "repositorios",
    term: "Repositorios independientes",
    definition:
      "Cada aplicación tiene su propio repositorio, su propio código y su propio proceso de build.",
  },
];

export interface Domain {
  id: string;
  name: string;
  description: string;
  repository: string;
  state: State;
}

/**
 * Dominios de NUTRIA (README §11, etapas 2 y 4).
 *
 * Cada dominio se materializará como un Microfrontend en su propio
 * repositorio. Estas tarjetas son informativas: ningún Remote existe todavía.
 */
export const DOMAINS: Domain[] = [
  {
    id: "afiliados",
    name: "Afiliados",
    description: "Alta, consulta y estado de los afiliados al sistema.",
    repository: "nutria-mfe-afiliados",
    state: "planned",
  },
  {
    id: "aportes",
    name: "Aportes",
    description: "Registro y seguimiento de aportes por período.",
    repository: "nutria-mfe-aportes",
    state: "planned",
  },
  {
    id: "empresas",
    name: "Empresas",
    description: "Empresas aportantes y su estado de deuda.",
    repository: "nutria-mfe-empresas",
    state: "planned",
  },
  {
    id: "historial-laboral",
    name: "Historial Laboral",
    description: "Trayectoria laboral asociada a cada afiliado.",
    repository: "nutria-mfe-historial-laboral",
    state: "planned",
  },
  {
    id: "pensiones",
    name: "Pensiones",
    description: "Solicitudes, requisitos y pensiones otorgadas.",
    repository: "nutria-mfe-pensiones",
    state: "planned",
  },
];

export interface Stage {
  id: string;
  step: string;
  title: string;
  summary: string;
  items: string[];
  state: State;
}

/** Roadmap del taller (README §11). */
export const ROADMAP: Stage[] = [
  {
    id: "shell",
    step: "01",
    title: "Shell",
    summary: "Crear nutria-shell y preparar el Host.",
    items: [
      "Crear nutria-shell",
      "Configurar Next.js 15",
      "Preparar estructura base",
      "Preparar Host",
    ],
    state: "done",
  },
  {
    id: "primer-remote",
    step: "02",
    title: "Primer Remote",
    summary: "Primer ejercicio práctico: el HOST consume un módulo de un Remote.",
    items: [
      "Crear nutria-mfe-afiliados",
      "Configurarlo como Remote",
      "Exponer un módulo",
      "Conectarlo con nutria-shell",
    ],
    state: "planned",
  },
  {
    id: "design-system",
    step: "03",
    title: "Design System",
    summary: "Repositorio independiente para compartir estilos y componentes.",
    items: [
      "Crear nutria-design-system",
      "Definir estilos compartidos",
      "Crear componentes visuales reutilizables",
      "Consumirlo desde Shell y MFEs",
    ],
    state: "planned",
  },
  {
    id: "nuevos-mfes",
    step: "04",
    title: "Nuevos Microfrontends",
    summary: "Los demás dominios, cada uno en su propio repositorio.",
    items: [
      "nutria-mfe-aportes",
      "nutria-mfe-empresas",
      "nutria-mfe-historial-laboral",
      "nutria-mfe-pensiones",
    ],
    state: "planned",
  },
  {
    id: "transversales",
    step: "05",
    title: "Capacidades transversales",
    summary: "Seguridad y control de acceso dentro del Shell.",
    items: [
      "autenticación",
      "autorización",
      "sesión",
      "navegación",
      "control de acceso",
    ],
    state: "planned",
  },
];

export const ROADMAP_NOTE =
  "La etapa 1 está completada en el Shell. La integración HOST → Remote mediante Module Federation es el primer ejercicio práctico y corresponde a la etapa 2. La navegación del Shell ya está implementada; el resto de las capacidades transversales sigue pendiente.";
