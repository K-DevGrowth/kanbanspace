"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { WorkspaceSwitcher, type Org } from "./workspace-switcher";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { SettingsBackHeader } from "../settings/settings-back-header";
import { NavSettings } from "../settings/nav-settings";
import { useParams, usePathname } from "next/navigation";
import { NavProject } from "@/features/projects/schema";

export function AppSidebar({
  orgs = [],
  user,
  projects,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  orgs?: Org[];
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  projects?: NavProject[];
}) {
  const params = useParams();
  const pathname = usePathname();
  const orgSlug = (params?.orgSlug as string) || orgs[0]?.slug || "";
  const currentOrg = orgs.find((o) => o.slug === orgSlug) || orgs[0];

  // Kiểm tra xem người dùng có đang ở trong mục Settings hay không
  const isSettingsPage =
    pathname === `/w/${orgSlug}/settings` ||
    pathname.startsWith(`/w/${orgSlug}/settings/`);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {isSettingsPage ? (
          /* Chế độ Linear: Thay WorkspaceSwitcher bằng nút Quay lại */
          <SettingsBackHeader orgSlug={orgSlug} />
        ) : (
          /* Chế độ Dashboard thông thường: WorkspaceSwitcher */
          <>
            <WorkspaceSwitcher
              orgs={orgs}
              currentOrg={currentOrg}
              orgSlug={orgSlug}
            />
            <NavMain orgSlug={orgSlug} />
          </>
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-2 p-2">
        {isSettingsPage ? (
          /* Chế độ Linear Settings: Menu cài đặt phân nhóm (Tài khoản, Không gian làm việc...) */
          <NavSettings orgSlug={orgSlug} />
        ) : (
          /* Chế độ Dashboard: Danh sách các dự án */
          <NavProjects projects={projects} />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser orgSlug={orgSlug} user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
