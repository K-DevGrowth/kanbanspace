"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    emoji: React.ReactNode;
  }[];
}) {
  return (
    <SidebarMenu>
      {projects?.map((project) => (
        <Collapsible key="Dự án">
          <SidebarMenuItem>
            <SidebarMenuButton render={<a href="#" />}>
              <span>{project.emoji}</span>
              <span>Dự án</span>
            </SidebarMenuButton>
            <SidebarMenuAction
              render={<CollapsibleTrigger />}
              className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-open:rotate-90"
              showOnHover
            >
              <ChevronRightIcon />
            </SidebarMenuAction>
            <SidebarMenuAction showOnHover>
              <PlusIcon />
            </SidebarMenuAction>
            <CollapsibleContent>
              <SidebarMenuSub>
                {/* {project.pages.map((page) => (
                  <SidebarMenuSubItem key={page.name}>
                    <SidebarMenuSubButton render={<a href="#" />}>
                      <span>{page.emoji}</span>
                      <span>{page.name}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))} */}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
