/**
 * Datos estructurales del Shell.
 *
 * Identidad de la aplicación y items de navegación principal. La
 * navegación pertenece al Shell: ningún Microfrontend la controla.
 */
export const SHELL = {
  product: "NUTRIA",
  app: "SHELL-NUTRIA",
  repository: "nutria-shell",
  role: "HOST / ORQUESTADOR",
  summary:
    "Punto de entrada de la aplicación frontend de NUTRIA. El Shell orquesta, navega y compone los Microfrontends que vivirán en repositorios independientes.",
} as const;

export interface NavItem {
  id: string;
  label: string;
  href: string | null;
  pending?: boolean;
}

/**
 * Navegación principal del Shell.
 *
 * Un item con `href: null` todavía no tiene destino: es un punto de
 * navegación reservado para un Microfrontend que aún no existe.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "afiliados", label: "Afiliados", href: null, pending: true },
];
