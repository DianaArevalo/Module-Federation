import { RESPONSIBILITIES } from "@/config/architecture";
import { Section } from "./Section";
import { StateBadge } from "./StateBadge";
import styles from "./AboutSection.module.css";

/**
 * Sección "¿Qué es?".
 *
 * Deja explícito que NUTRIA es un taller y no un producto. El contenido
 * proviene de las responsabilidades del Shell descritas en el README.
 */
export function AboutSection() {
  return (
    <Section
      id="que-es"
      eyebrow="El taller"
      title="¿Qué es?"
      lead="Un taller, no un producto."
      note="El objetivo es practicar arquitectura frontend con Microfrontends, etapa por etapa."
    >
      <div className={styles.grid}>
        {RESPONSIBILITIES.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.head}>
              <h3 className={styles.title}>{item.title}</h3>
              <StateBadge state={item.state} />
            </div>
            <p className={styles.description}>{item.description}</p>
          </article>
        ))}
      </div>

      <div className={styles.callout}>
        <p className={styles.calloutText}>
          <strong>NUTRIA no es un producto real.</strong> Es un plan de trabajo
          por etapas. El primer ejercicio práctico es demostrar que el HOST
          puede consumir un módulo expuesto por un Remote; la seguridad del
          frontend, además, nunca reemplaza las validaciones del backend.
        </p>
      </div>
    </Section>
  );
}
