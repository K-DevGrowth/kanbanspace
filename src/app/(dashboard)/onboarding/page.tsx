import { getOrgs, requireSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import NameWorkspace from "./name-workspace";
import { Suspense } from "react";

const OnboardingContent = async () => {
  await requireSession();
  const orgs = await getOrgs();
  if (orgs.length > 0) redirect("/planify");
  return <NameWorkspace />;
};

const OnboardingPage = () => {
  return (
    <Suspense>
      <OnboardingContent />
    </Suspense>
  );
};

export default OnboardingPage;
