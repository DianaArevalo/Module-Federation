import type { ReactNode } from "react";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import styles from "./ShellLayout.module.css";

/**
 * Esqueleto del Shell (HOST).
 *
 * Aporta el chrome de la aplicación (navbar y footer) y el contenedor donde se
 * compone el contenido del Shell y, más adelante, los Microfrontends remotos.
 */
export function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
