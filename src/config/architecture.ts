/**
 * Datos de identidad del Shell.
 *
 * Fuente única de los datos básicos de la aplicación. La navegación, las
 * responsabilidades y el registro de Microfrontends se agregarán en las
 * historias de usuario correspondientes.
 */
export const SHELL = {
  product: "NUTRIA",
  app: "SHELL-NUTRIA",
  repository: "nutria-shell",
  role: "HOST / ORQUESTADOR",
  summary:
    "Punto de entrada de la aplicación frontend de NUTRIA. El Shell orquesta, navega y compone los Microfrontends que vivirán en repositorios independientes.",
} as const;
