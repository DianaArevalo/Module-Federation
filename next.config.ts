import { ModuleFederationPlugin } from "@module-federation/enhanced";
import type { NextConfig } from "next";

/**
 * Nombre del contenedor del Host en Module Federation.
 * Debe coincidir con el nombre usado en `host.remoteType`.
 */
const HOST_NAME = "nutria-shell";

/**
 * Microfrontends que este Host consumirá.
 *
 * En esta etapa la lista está vacía a propósito: el repositorio
 * `nutria-mfe-afiliados` todavía no existe. El Remote se agregará aquí
 * cuando se cree, y en ese momento también se documentará su URL pública.
 */
const REMOTES: Record<string, string> = {};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins ??= [];
    config.plugins.push(
      new ModuleFederationPlugin({
        name: HOST_NAME,
        filename: "remoteEntry.js",
        remotes: REMOTES,
        exposes: {},
        shared: {},
      }),
    );
    return config;
  },
};

export default nextConfig;
