import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import type { NextConfig } from "next";

/**
 * Nombre estable del Host. Es el identificador con el que este contenedor se
 * registra en Module Federation. Debe mantenerse entre despliegues.
 */
const HOST_NAME = "nutria_shell";

/**
 * Remotes conocidos por el Host.
 *
 * `nextjs-mf` resuelve cada valor como `<remoteName>@<remoteEntryUrl>`:
 * el Host no descarga nada todavia, simplemente registra donde puede encontrar
 * el `remoteEntry.js` de cada Remote en tiempo de ejecucion.
 *
 * - `nutria_mfe_afiliados`: Remote del dominio de Afiliados, publicado en el
 *   repositorio independiente `nutria-mfe-afiliados` (puerto 3001).
 * - La URL corresponde al `filename` del Remote (`static/chunks/remoteEntry.js`
 *   relativo a `.next`), que Next.js sirve en `/_next/static/chunks/remoteEntry.js`.
 */
const REMOTES = {
  nutria_mfe_afiliados:
    "nutria_mfe_afiliados@http://localhost:3001/_next/static/chunks/remoteEntry.js",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Se conserva la configuracion de Webpack de Next.js: solo se anade el plugin.
  // NEXT_PRIVATE_LOCAL_WEBPACK=true se define en los scripts de package.json
  // (cross-env) porque Next.js debe usar la copia local de `webpack` (devDependency)
  // en lugar de la que trae compilada, que no expone los internos que necesita MF.
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: HOST_NAME,
        filename: "static/chunks/remoteEntry.js",
        remotes: REMOTES,
        // Esta HU solo registra el Remote. El consumo de `./Afiliados` se hace
        // en HU-10, por lo que el Host todavia no declara `exposes` ni `shared`.
        // `shared` no se declara porque NextFederationPlugin ya comparte por
        // defecto react, react-dom, styled-jsx y los internos de Next.
        extraOptions: {
          debug: false,
        },
      })
    );

    return config;
  },
};

export default nextConfig;
