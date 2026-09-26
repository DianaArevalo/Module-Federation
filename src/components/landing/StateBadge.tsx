import { STATE_LABEL, type State } from "@/config/architecture";
import styles from "./StateBadge.module.css";

/**
 * Etiqueta de estado: implementado / pendiente.
 *
 * Distingue visualmente lo que ya existe de lo que solo está planificado.
 */
export function StateBadge({ state }: { state: State }) {
  return (
    <span
      className={`${styles.badge} ${state === "done" ? styles.done : styles.planned}`}
    >
      {STATE_LABEL[state]}
    </span>
  );
}
