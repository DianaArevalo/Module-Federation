import { SHELL } from "@/config/architecture";
import styles from "./HostConcept.module.css";

/**
 * Relación conceptual que representa la interfaz.
 *
 * NUTRIA → SHELL-NUTRIA → HOST / ORQUESTADOR
 */
export function HostConcept() {
  return (
    <section className={styles.concept}>
      <p className={styles.product}>{SHELL.product}</p>
      <p className={styles.app}>{SHELL.app}</p>

      <div className={styles.connector} aria-hidden="true" />

      <p className={styles.role}>{SHELL.role}</p>
      <p className={styles.caption}>
        Punto de entrada de la aplicación frontend. Los Microfrontends se
        integrarán más adelante mediante Module Federation.
      </p>
    </section>
  );
}
