import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Tipografías del Shell (concepto visual de NUTRIA).
 *
 * Se declaran una sola vez y se aplican como clases CSS en `src/pages/_document.tsx`,
 * sobre `<body>`, para que las variables `--font-*` queden disponibles en toda la
 * aplicación (App Router no está en uso: el Shell usa Pages Router porque
 * `@module-federation/nextjs-mf` solo soporta el directorio `pages`).
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Clases CSS que `next/font` expone para cada familia de texto. */
export const fontClassNames = `${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`;
