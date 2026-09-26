import type { Domain } from "@/config/architecture";
import styles from "./DomainCard.module.css";

/**
 * Tarjeta de un dominio de NUTRIA.
 *
 * Es informativa: no es un enlace, porque el Microfrontend correspondiente
 * todavía no existe. Solo anticipa la futura integración.
 */
export function DomainCard({ domain }: { domain: Domain }) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.name}>{domain.name}</h3>
        <span className={styles.badge}>remote</span>
      </div>

      <p className={styles.description}>{domain.description}</p>

      <div className={styles.meta}>
        <span className={styles.repository}>{domain.repository}</span>
        <span className={styles.status}>no conectado</span>
      </div>
    </article>
  );
}
