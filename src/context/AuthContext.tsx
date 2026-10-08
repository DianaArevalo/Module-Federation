import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContextType,
  AuthState,
} from "@/Models/Auth";

import AuthService from "@/Service/AuthService";

/**
 * Contexto de autenticación del Shell.
 *
 * Expone el estado y las acciones de autenticación
 * al resto de componentes mediante useAuth().
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider de autenticación.
 *
 * Mantiene el estado global de autenticación del Shell
 * y delega la comunicación con Keycloak a AuthService.
 */
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: undefined,
    loading: true,
  });

  /**
   * Inicializa la autenticación cuando el Provider
   * se monta por primera vez.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const state = await AuthService.init();

        setAuthState(state);
      } catch (error) {
        console.error("Error inicializando autenticación:", error);

        setAuthState({
          isAuthenticated: false,
          user: undefined,
          loading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  /**
   * Inicia el flujo de login de Keycloak.
   */
  const login = async (): Promise<void> => {
    await AuthService.login();
  };

  /**
   * Cierra la sesión mediante Keycloak.
   */
  const logout = async (): Promise<void> => {
    await AuthService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para consumir el estado de autenticación.
 *
 * Solo puede utilizarse dentro de AuthProvider.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}

export default AuthContext;