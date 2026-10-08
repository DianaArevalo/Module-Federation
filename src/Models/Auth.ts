export interface AuthUser {
  /**
   * ID único del usuario.
   */
  keycloakUserId: string;

  /**
   * Nombre del usuario.
   */
  name: string;

  /**
   * Correo electrónico del usuario.
   */
  email: string;

  /**
   * Roles del usuario.
   */
  roles: string[];
}

export interface AuthState {
  /**
   * Indica si existe una sesión autenticada.
   */
  isAuthenticated: boolean;

  /**
   * Usuario autenticado.
   */
  user?: AuthUser;

  /**
   * Indica si la autenticación todavía está inicializándose.
   */
  loading: boolean;
}

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