import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ShellLayout } from "@/components/shell/ShellLayout";
import { AuthProvider } from "@/context/AuthContext";

/**
 * Aplicación del Shell (Pages Router).
 *
 * Monta el chrome del HOST (navbar y footer) alrededor de todas las páginas y
 * aplica la identidad global: título y descripción.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ShellLayout>
        <Head>
          <title>NUTRIA · SHELL-NUTRIA</title>
          <meta
            name="description"
            content="SHELL-NUTRIA: HOST y orquestador de los Microfrontends de NUTRIA."
          />
        </Head>

        <Component {...pageProps} />
      </ShellLayout>
    </AuthProvider>
  );
}