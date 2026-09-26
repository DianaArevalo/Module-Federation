import type { ReactNode } from "react";
import { ShellHeader } from "@/components/navigation/ShellHeader";
import styles from "./ShellLayout.module.css";

/**
 * Esqueleto del Shell (HOST).
 *
 * Aporta el chrome de la aplicación (navegación principal) y el contenedor
 * donde se compondrán los Microfrontends remotos.
 */
export function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <ShellHeader />
      <main className={styles.content}>
        <div className={styles.stack}>{children}</div>
      </main>
    </div>
  );
}
