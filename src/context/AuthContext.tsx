import { AuthUser } from "@/Models/Auth";
import { createContext } from "react";

/**
 * Contrato del Contexto de Autenticación (AuthContext).
 *
 * Define la API pública que expondrá `AuthProvider` y consumirá `useAuth()`.
 * Combina estado (datos) y acciones (comportamiento).
 *
 * No incluye roles/permisos (se añadirá en una etapa posterior).
 */
export interface AuthContextType {
  /**
   * Indica si el usuario está autenticado.
   */
  isAuthenticated: boolean;

  /**
   * Datos del usuario autenticado. `undefined` si no autenticado.
   */
  user?: AuthUser;

  /**
   * Estado de carga de la inicialización de autenticación.
   */
  loading: boolean;

  /**
   * Inicia el flujo de login (redirige a Keycloak).
   */
  login: () => Promise<void>;

  /**
   * Cierra la sesión (logout en Keycloak + limpieza de estado).
   */
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
