import keycloak from "@/lib/keycloak";
import { AuthState, AuthUser } from "@/Models/Auth";
import { handleAuthError } from "@/Helpers/ErrorHandler";

class AuthService {
  /**
   * Inicializa Keycloak y comprueba si existe
   * una sesión activa.
   *
   * No obliga al usuario a iniciar sesión.
   */
  async init(): Promise<AuthState> {
    try {
      const authenticated = await keycloak.init({
        onLoad: "check-sso",
        pkceMethod: "S256",
      });

      return {
        isAuthenticated: authenticated,
        user: authenticated ? this.getUser() : undefined,
        loading: false,
      };
    } catch (error) {
      throw handleAuthError(error, "AuthService.init");
    }
  }

  /**
   * Inicia el flujo de autenticación de Keycloak.
   *
   * Keycloak se encarga del formulario de login,
   * credenciales y redirección.
   */
  async login(): Promise<void> {
    try {
      await keycloak.login();
    } catch (error) {
      throw handleAuthError(error, "AuthService.login");
    }
  }

  /**
   * Cierra la sesión actual en Keycloak
   * y redirige nuevamente al Shell.
   */
  async logout(): Promise<void> {
    try {
      await keycloak.logout({
        redirectUri: window.location.origin,
      });
    } catch (error) {
      throw handleAuthError(error, "AuthService.logout");
    }
  }

  /**
   * Obtiene el usuario autenticado a partir
   * de la información parseada del token.
   *
   * No devuelve el JWT completo.
   */
 getUser(): AuthUser | undefined {
  const tokenParsed = keycloak.tokenParsed;

  if (!tokenParsed) {
    return undefined;
  }

  return {
    keycloakUserId: tokenParsed.sub ?? "",
    name: tokenParsed.name ?? "",
    email: tokenParsed.email ?? "",
    roles: [],
  };
}

  /**
   * Indica si Keycloak considera que existe
   * una sesión autenticada.
   */
  isAuthenticated(): boolean {
    return keycloak.authenticated ?? false;
  }

  /**
   * Obtiene el access token actual.
   *
   * Se utilizará posteriormente para realizar
   * peticiones autenticadas al backend.
   */
  getToken(): string | undefined {
    return keycloak.token;
  }

  /**
   * Renueva el token cuando está próximo a expirar.
   *
   * minValidity representa la cantidad mínima de
   * segundos de validez que queremos conservar.
   */
  async updateToken(minValidity = 30): Promise<boolean> {
    try {
      return await keycloak.updateToken(minValidity);
    } catch (error) {
      throw handleAuthError(error, "AuthService.updateToken");
    }
  }
}

export default new AuthService();