import { requireMember } from "@/lib/auth/session";
import { Suspense } from "react";
import { NavActions } from "@/components/dashboard/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { cookies } from "next/headers";

export default function WorkspaceSlugLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  return (
    <Suspense fallback={null}>
      <AuthedContent params={params}>{children}</AuthedContent>
    </Suspense>
  );
}

async function AuthedContent({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  const { orgSlug } = await params;
  const { session, orgs, org } = await requireMember(orgSlug);
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar orgs={orgs} orgSlug={orgSlug} user={session.user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    [Tên dự án]
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="px-6 py-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function ShellSkeleton() {
  return (
    <div className="flex min-h-svh">
      <div className="bg-sidebar hidden w-64 shrink-0 border-r md:block" />
      <div className="flex-1">
        <div className="h-16 border-b" />
      </div>
    </div>
  );
}
