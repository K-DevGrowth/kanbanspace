import { cookies } from "next/headers";
import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { requireOrgs } from "@/lib/auth/session";
import { listProjects } from "@/features/projects/queries";

export const instant = false;

export default function WorkspaceSharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SharedShell>{children}</SharedShell>
    </Suspense>
  );
}

async function SharedShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, orgs } = await requireOrgs();
  const projects = await listProjects(
    session.session.activeOrganizationId ?? orgs[0].id,
  );
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar orgs={orgs} user={session.user} projects={projects} />
      {children}
    </SidebarProvider>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-svh">
      <div className="bg-sidebar hidden w-64 shrink-0 border-r md:block" />
      <div className="flex-1">
        <div className="h-16 border-b" />
      </div>
    </div>
  );
}
