"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SHELL } from "@/config/architecture";
import styles from "./ShellHeader.module.css";

/**
 * Navegación principal del Shell.
 *
 * Pertenece al HOST: los Microfrontends no controlan la navegación global.
 * En móvil se colapsa en un menú sencillo.
 */
export function ShellHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true">
            N
          </span>
          <span className={styles.brandName}>{SHELL.product}</span>
        </Link>

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
            {NAV_ITEMS.map((item) => {
              const isActive = item.href !== null && pathname === item.href;
              const className = [
                styles.item,
                item.href ? styles.itemLink : styles.itemPending,
                isActive ? styles.itemActive : "",
              ]
                .filter(Boolean)
                .join(" ");

              const content = (
                <>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.pending ? (
                    <span className={styles.badge}>pendiente</span>
                  ) : null}
                </>
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={className}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <span
                      className={className}
                      aria-disabled="true"
                      title={`${item.label}: se habilitará cuando exista el Microfrontend`}
                    >
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
