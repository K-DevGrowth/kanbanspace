import { cache } from "react";
import { auth } from "./auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const getSession = cache(async () => {
  const h = await headers();
  return auth.api.getSession({ headers: h });
});

export const getOrgs = cache(async () =>
  auth.api.listOrganizations({ headers: await headers() }),
);

export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session) redirect("/signin");
  return session;
});

export const requireOrgs = cache(async () => {
  const session = await requireSession();
  const orgs = (await getOrgs()) ?? [];
  if (orgs.length === 0) redirect("/onboarding");
  return { session, orgs };
});

export const requireOrg = cache(async (slug: string) => {
  const { session, orgs } = await requireOrgs();
  const org = orgs.find((o) => o.slug === slug);
  if (!org) notFound();
  return { session, org, orgs };
});

export const requireMember = cache(async (slug: string) => {
  const { session, orgs } = await requireOrgs();
  const org = orgs.find((o) => o.slug === slug);
  if (!org) notFound();

  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
    query: { organizationId: org.id },
  });
  if (!role) notFound();

  return { session, org, orgs, role };
});
