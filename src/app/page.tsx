import { HostConcept } from "@/components/shell/HostConcept";
import { ShellIdentity } from "@/components/shell/ShellIdentity";
import { ShellLayout } from "@/components/shell/ShellLayout";

export default function Home() {
  return (
    <ShellLayout>
      <ShellIdentity />
      <HostConcept />
    </ShellLayout>
  );
}
