import { Suspense } from "react";

export default function WorkspacePage() {
  return (
    <Suspense fallback={null}>
      <WorkspaceOverview />
    </Suspense>
  );
}

const WorkspaceOverview = () => {
  return <div>Welcome</div>;
};
