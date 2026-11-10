"use client";

import * as React from "react";
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

const data = {
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
  projects: [
    {
      name: "Dự án",
      emoji: <FolderKanban />,
    },
  ],
};

export function AppSidebar({
  orgs = [],
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  orgs?: Org[];
  session: {
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null;
    };
  };
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher orgs={orgs} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2">
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
