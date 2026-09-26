import { SHELL, TECH_STACK } from "@/config/architecture";
import styles from "./Hero.module.css";

/**
 * Hero de la página principal.
 *
 * Presenta NUTRIA y su rol dentro de la arquitectura. El contenido proviene
 * del README: el Shell es el frontend principal y el HOST del taller.
 */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <p className={styles.eyebrow}>Taller de Microfrontends</p>

      <h1 className={styles.title}>{SHELL.product}</h1>
      <p className={styles.tagline}>{SHELL.tagline}</p>

      <p className={styles.lead}>
        Es la aplicación desde la que el usuario entra y sobre la que se
        construye todo lo demás.
      </p>
      <p className={styles.summary}>{SHELL.summary}</p>

      <ul className={styles.chips}>
        {TECH_STACK.map((tech) => (
          <li key={tech} className={styles.chip}>
            {tech}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <a className={`${styles.action} ${styles.actionPrimary}`} href="#arquitectura">
          Ver arquitectura
        </a>
        <a className={`${styles.action} ${styles.actionOutline}`} href="#roadmap">
          Ver roadmap
        </a>
      </div>
    </section>
  );
}
