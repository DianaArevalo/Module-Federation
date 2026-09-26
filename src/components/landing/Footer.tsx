import { SECTION_LINKS, SHELL, TECH_STACK } from "@/config/architecture";
import styles from "./Footer.module.css";

/**
 * Footer del Shell.
 *
 * Solo usa información definida en el proyecto: identidad, tagline y las
 * secciones de la página. No enlaza a recursos externos.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              N
            </span>
            <span className={styles.brandName}>{SHELL.product}</span>
          </div>
          <p className={styles.brandTagline}>{SHELL.tagline}</p>
        </div>

        <nav aria-label="Secciones del sitio">
          <ul className={styles.links}>
            {SECTION_LINKS.map((link) => (
              <li key={link.id}>
                <a className={styles.link} href={`#${link.id}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span className={styles.meta}>{SHELL.repository}</span>
        <span className={styles.meta}>{TECH_STACK.join(" · ")}</span>
      </div>
    </footer>
  );
}
