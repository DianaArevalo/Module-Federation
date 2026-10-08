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