import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "nutria",
  clientId: "nutria-realm",
});

export default keycloak;