import {
  ARCHITECTURE_CONCEPTS,
  ARCHITECTURE_CONNECTOR,
  ARCHITECTURE_FLOW,
} from "@/config/architecture";
import { Section } from "./Section";
import styles from "./ArchitectureSection.module.css";

/**
 * Sección "Arquitectura".
 *
 * Muestra el flujo actual del proyecto: NUTRIA → nutria-shell (HOST) →
 * nutria-mfe-afiliados (REMOTE) mediante Module Federation. El Remote todavía
 * no existe, por eso su conexión se representa en línea discontinua.
 */
export function ArchitectureSection() {
  return (
    <Section
      id="arquitectura"
      eyebrow="Arquitectura"
      title="Arquitectura"
      lead="La arquitectura inicial del taller: un HOST que orquesta y consume Remotes independientes mediante Module Federation."
    >
      <div className={styles.flow}>
        {ARCHITECTURE_FLOW.map((node, index) => {
          const isLast = index === ARCHITECTURE_FLOW.length - 1;
          const labelNext = index === 1;

          return (
            <div key={node.id}>
              <div
                className={
                  node.state === "planned"
                    ? `${styles.node} ${styles.nodePlanned}`
                    : styles.node
                }
              >
                <div className={styles.nodeHead}>
                  <span className={styles.nodeName}>{node.name}</span>
                  {node.role ? (
                    <span
                      className={
                        node.state === "planned"
                          ? `${styles.role} ${styles.rolePlanned}`
                          : styles.role
                      }
                    >
                      {node.role}
                    </span>
                  ) : null}
                </div>
                {node.note ? <p className={styles.nodeNote}>{node.note}</p> : null}
              </div>

              {!isLast ? (
                <div
                  className={
                    labelNext
                      ? `${styles.connector} ${styles.connectorPending}`
                      : styles.connector
                  }
                >
                  <span className={styles.connectorLine} aria-hidden="true" />
                  {labelNext ? (
                    <span className={styles.connectorLabel}>
                      {ARCHITECTURE_CONNECTOR}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={styles.concepts}>
        {ARCHITECTURE_CONCEPTS.map((concept) => (
          <article key={concept.id} className={styles.concept}>
            <h3 className={styles.conceptTerm}>{concept.term}</h3>
            <p className={styles.conceptDefinition}>{concept.definition}</p>
          </article>
        ))}
      </div>

      <ul className={styles.notes}>
        <li className={styles.note}>
          Los demás Microfrontends —aportes, empresas, historial laboral y
          pensiones— todavía no se crean. Este repositorio no contiene su
          código.
        </li>
        <li className={styles.note}>
          Module Federation conecta módulos frontend (Host ↔ Remote); REST /
          HTTP conecta el frontend con los servicios backend. Son mecanismos
          diferentes y complementarios.
        </li>
      </ul>
    </Section>
  );
}
