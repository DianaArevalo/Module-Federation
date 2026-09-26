import { SHELL } from "@/config/architecture";
import styles from "./ShellIdentity.module.css";

/**
 * Identidad visual del Shell.
 *
 * Presenta la aplicación como NUTRIA → SHELL-NUTRIA → HOST / ORQUESTADOR.
 * Es puramente identificativo: no introduce navegación ni acciones.
 */
export function ShellIdentity() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>{SHELL.product}</p>
      <h1 className={styles.title}>{SHELL.app}</h1>
      <p className={styles.role}>{SHELL.role}</p>
      <p className={styles.summary}>{SHELL.summary}</p>

      <div className={styles.divider} />

      <ul className={styles.meta}>
        <li className={styles.metaItem}>Next.js 15</li>
        <li className={styles.metaItem}>React</li>
        <li className={styles.metaItem}>TypeScript</li>
        <li className={styles.metaItem}>Module Federation</li>
        <li className={styles.metaItem}>Webpack</li>
      </ul>
    </section>
  );
}
