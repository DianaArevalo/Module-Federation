import { Html, Head, Main, NextScript } from "next/document";
import { fontClassNames } from "@/styles/fonts";

/**
 * Documento HTML del Shell (Pages Router).
 *
 * Solo cumple la función que en App Router cumplía `layout.tsx`: declarar el
 * `lang` del documento y aplicar en `<body>` las variables de tipografía.
 */
export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className={fontClassNames}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
