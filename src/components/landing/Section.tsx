import type { ReactNode } from "react";
import styles from "./Section.module.css";

/**
 * Base de las secciones de la página principal.
 *
 * Unifica la cabecera (eyebrow + título + lead) para mantener la misma
 * jerarquía visual en todas las secciones.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  note,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
      {children}
    </section>
  );
}
