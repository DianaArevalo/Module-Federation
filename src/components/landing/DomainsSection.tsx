import { DOMAINS } from "@/config/architecture";
import { DomainCard } from "./DomainCard";
import { Section } from "./Section";
import styles from "./DomainsSection.module.css";

/**
 * Sección "Dominios".
 *
 * Presenta los dominios de NUTRIA. Las tarjetas son informativas: no
 * enlazan a ninguna ruta, no importan código de otros repositorios y no
 * simulan Remotes.
 */
export function DomainsSection() {
  return (
    <Section
      id="dominios"
      eyebrow="Dominios"
      title="Dominios"
      note="Cada dominio se construirá como un Microfrontend en su propio repositorio."
    >
      <div className={styles.grid}>
        {DOMAINS.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>
    </Section>
  );
}
