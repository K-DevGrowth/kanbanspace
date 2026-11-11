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

export function AppSidebar({
  orgs,
  orgSlug,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  orgs?: Org[];
  orgSlug: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher orgs={orgs} />
        <NavMain orgSlug={orgSlug} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2">
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser orgSlug={orgSlug} user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
