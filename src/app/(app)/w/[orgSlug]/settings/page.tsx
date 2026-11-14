import { Separator } from "@/components/ui/separator";
import WorkspaceGeneralForm from "@/features/workspaces/components/workspace-general-form";
import { requireMember } from "@/lib/auth/session";
import { Suspense } from "react";

export default function SettingsGeneralLayout({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  return (
    <Suspense>
      <SettingsGeneralPage params={params} />
    </Suspense>
  );
}

async function SettingsGeneralPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const { org, role } = await requireMember(orgSlug);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight">General Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your workspace details and preferences.
        </p>
      </div>

      <Separator />

      {/* Thông tin chung của Không gian làm việc */}
      <WorkspaceGeneralForm org={org} role={role} />
    </div>
  );
}
