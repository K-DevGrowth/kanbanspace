import { requireOrgs } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function WorkspaceHub() {
  const { session, orgs } = await requireOrgs();

  const active =
    orgs.find((o) => o.id === session.session.activeOrganizationId) ?? orgs[0];

  return redirect(`/planify/${active.slug}`);
}

export default function WorkspaceHubPage() {
  return (
    <Suspense fallback={null}>
      <WorkspaceHub />
    </Suspense>
  );
}
