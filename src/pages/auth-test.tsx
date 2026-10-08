import { useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

export default function AuthTestPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const isAuthenticated = await keycloak.init({
          onLoad: "login-required",
          pkceMethod: "S256",
        });

        setAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          setToken(keycloak.token);
        }
      } catch (error) {
        console.error("Error inicializando Keycloak:", error);
      }
    };

    initKeycloak();
  }, []);

  return (
    <main>
      <h1>Keycloak Test</h1>

      <p>
        Autenticado: {authenticated ? "Sí" : "No"}
      </p>

      {token && (
        <>
          <h2>Access Token</h2>
          <textarea
            value={token}
            readOnly
            rows={10}
            style={{ width: "100%" }}
          />
        </>
      )}
    </main>
  );
}