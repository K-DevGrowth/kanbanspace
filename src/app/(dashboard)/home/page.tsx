import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const h = await headers();

  const [session, orgs] = await Promise.all([
    auth.api.getSession({ headers: h }),
    auth.api.listOrganizations({ headers: h }),
  ]);

  if (!session) redirect("/signup");
  if (orgs.length === 0) redirect("/onboarding");
  const active =
    orgs.find((o) => o.id === session.session.activeOrganizationId) ?? orgs[0];
  redirect(`/${active.slug}`);
};

export default Home;
