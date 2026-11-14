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
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const instant = false;

export default function WorkspaceSlugLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  return (
    <Suspense fallback={<ContentSkeleton />}>
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
  const { org } = await requireMember(orgSlug);

  return (
    <SidebarInset className="h-svh max-h-svh flex flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b">
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
                  {org.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3">
          <NavActions />
        </div>
      </header>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
        {children}
      </div>
    </SidebarInset>
  );
}

function ContentSkeleton() {
  return (
    <SidebarInset className="h-svh max-h-svh flex flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      </header>
      <div className="flex-1 min-h-0 p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
      </div>
    </SidebarInset>
  );
}
