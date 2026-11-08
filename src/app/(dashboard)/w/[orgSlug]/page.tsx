import { Suspense } from "react";

const WorkspaceOverview = () => {
  return <div>Welcome</div>;
};

const WorkspacePage = () => {
  return (
    <Suspense fallback={null}>
      <WorkspaceOverview />
    </Suspense>
  );
};

export default WorkspacePage;
