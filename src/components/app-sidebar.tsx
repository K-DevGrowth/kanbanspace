import { NavMain } from "@/components/nav-main";
import { WorkspaceSwitcher, type Org } from "@/components/workspace-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  TerminalIcon,
  AudioLinesIcon,
  SparklesIcon,
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  Settings2Icon,
  BlocksIcon,
  MessageCircleQuestionIcon,
  FolderKanban,
} from "lucide-react";
import { NavProjects } from "./nav-projects";

// This is sample data.
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
    {
      title: "Hỏi AI",
      url: "#",
      icon: <SparklesIcon />,
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

export function AppSidebar({
  currentOrg,
  orgs = [],
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentOrg: Org;
  orgs?: Org[];
}) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher currentOrg={currentOrg} orgs={orgs} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2">
        <NavProjects projects={data.projects} />
        <NavMain items={data.navSecondary} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
