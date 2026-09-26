import { SHELL } from "@/config/architecture";
import styles from "./IdentityCard.module.css";

/**
 * Tarjeta de identidad del Shell.
 * Identifica la aplicación como HOST / Orquestador de NUTRIA.
 */
export function IdentityCard() {
  return (
    <section className={styles.ficha}>
      <div className={styles.mark} aria-hidden="true">
        N
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{SHELL.product}</p>
        <h1 className={styles.title}>{SHELL.app}</h1>
        <p className={styles.role}>{SHELL.role}</p>
        <p className={styles.summary}>{SHELL.summary}</p>
        <ul className={styles.meta}>
          <li className={styles.metaItem}>Next.js 15</li>
          <li className={styles.metaItem}>React · TypeScript</li>
          <li className={styles.metaItem}>Module Federation</li>
          <li className={styles.metaItem}>Webpack</li>
        </ul>
      </div>
    </section>
  );
}
