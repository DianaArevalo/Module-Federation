import type { ReactNode } from "react";
import styles from "./ShellLayout.module.css";

/**
 * Esqueleto del Shell (HOST).
 *
 * Define el contenedor base donde se renderiza la aplicación y, más adelante,
 * donde se compondrán los Microfrontends remotos.
 */
export function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.content}>
      <div className={styles.stack}>{children}</div>
    </main>
  );
}
