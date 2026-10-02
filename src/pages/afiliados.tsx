import dynamic from "next/dynamic";

const AffiliatesModule = dynamic(
  () => import("nutria_mfe_afiliados/Afiliados"),
  {
    ssr: false,
  },
);

export default function AfiliadosPage() {
  return (
    <main>
      <h1>Afiliados</h1>

      <AffiliatesModule title="Afiliados NUTRIA" />
    </main>
  );
}
