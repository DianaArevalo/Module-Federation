import { useState } from "react";
import { ROUTE_LINKS, SECTION_LINKS, SHELL } from "@/config/architecture";
import styles from "./Navbar.module.css";

/**
 * Navbar del Shell.
 *
 * Pertenece al HOST: los Microfrontends no controlan la navegación global.
 * Los enlaces apuntan a secciones de la misma página. El botón "Iniciar
 * sesión" es únicamente visual: la autenticación llega en una etapa posterior.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true">
            N
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{SHELL.product}</span>
            <span className={styles.brandRole}>{SHELL.role}</span>
          </span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="shell-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.bars} aria-hidden="true">
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </span>
          Menú
        </button>

        <nav
          id="shell-nav"
          aria-label="Navegación principal"
          className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}
        >
          <ul className={styles.list}>
            {SECTION_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  className={styles.item}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {ROUTE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className={styles.item}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.login}
            aria-disabled="true"
            title="La autenticación se implementará en una etapa posterior"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
