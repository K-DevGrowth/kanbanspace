import { cookies } from "next/headers";
import { Suspense } from "react";
import {
  TerminalIcon,
  AudioLinesIcon,
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  Settings2Icon,
  BlocksIcon,
  MessageCircleQuestionIcon,
  FolderKanban,
} from "lucide-react";
import { NavActions } from "@/components/dashboard/nav-actions";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { requireOrgs } from "@/lib/auth/session";

export default function DashboardWorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<ShellSkeleton />}>
      <WorkspaceShell>{children}</WorkspaceShell>
    </Suspense>
  );
}

async function WorkspaceShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, orgs } = await requireOrgs();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        <SidebarHeader>
          <WorkspaceSwitcher orgs={orgs} />
          <NavMain items={data.navMain} />
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-2 p-2">
          <NavProjects projects={data.projects} />
          <NavMain items={data.navSecondary} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={session.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
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

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: <TerminalIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: "#",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Hộp thư",
      url: "#",
      icon: <InboxIcon />,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Lịch",
      url: "#",
      icon: <CalendarIcon />,
    },
    {
      title: "Cài đặt",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Mẫu dự án",
      url: "#",
      icon: <BlocksIcon />,
    },
    {
      title: "Giúp đỡ",
      url: "#",
      icon: <MessageCircleQuestionIcon />,
    },
  ],
  projects: [
    {
      name: "Dự án",
      emoji: <FolderKanban />,
    },
  ],
};
