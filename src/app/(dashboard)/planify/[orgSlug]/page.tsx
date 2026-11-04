import { requireSession } from "@/lib/auth/session";
import { Suspense } from "react";

const WorkspaceOverview = async () => {
  const { user } = await requireSession();
  return <div>Welcome, {user.name}</div>;
};

const WorkspacePage = () => {
  return (
    <Suspense fallback={null}>
      <WorkspaceOverview />
    </Suspense>
  );
};

export default WorkspacePage;
