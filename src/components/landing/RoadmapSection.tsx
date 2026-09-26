import { ROADMAP, ROADMAP_NOTE } from "@/config/architecture";
import { Section } from "./Section";
import { StateBadge } from "./StateBadge";
import styles from "./RoadmapSection.module.css";

/**
 * Sección "Roadmap".
 *
 * Muestra las etapas del taller y su estado real: la etapa 1 está completada
 * en el Shell y las siguientes están planificadas.
 */
export function RoadmapSection() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="Roadmap"
      lead="Las etapas del taller, de la actual a las siguientes."
    >
      <ol className={styles.track}>
        {ROADMAP.map((stage, index) => {
          const isLast = index === ROADMAP.length - 1;

          return (
            <li key={stage.id} className={styles.stage}>
              <div className={styles.markerRow}>
                <span
                  className={
                    stage.state === "done"
                      ? `${styles.marker} ${styles.markerDone}`
                      : styles.marker
                  }
                >
                  {stage.step}
                </span>
                {!isLast ? (
                  <span className={styles.line} aria-hidden="true" />
                ) : null}
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{stage.title}</h3>
                <StateBadge state={stage.state} />
                <p className={styles.summary}>{stage.summary}</p>
                <ul className={styles.items}>
                  {stage.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <p className={styles.footnote}>{ROADMAP_NOTE}</p>
    </Section>
  );
}
