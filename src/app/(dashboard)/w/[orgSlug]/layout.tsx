import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireMember } from "@/lib/auth/session";
import { Suspense } from "react";

export default function WorkspaceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  return (
    <Suspense fallback={null}>
      <WorkspaceShell params={params}>{children}</WorkspaceShell>
    </Suspense>
  );
}

async function WorkspaceShell({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  const { orgSlug } = await params;
  const { org, orgs } = await requireMember(orgSlug);
  return (
    <SidebarProvider>
      <AppSidebar currentOrg={org} orgs={orgs} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
