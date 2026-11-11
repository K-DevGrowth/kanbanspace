"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  User,
  Sliders,
  Users,
  Shield,
  Trash2,
} from "lucide-react";

interface NavSettingsProps {
  orgSlug: string;
}

export function NavSettings({ orgSlug }: NavSettingsProps) {
  const pathname = usePathname();

  const groups = [
    {
      label: "Tài khoản",
      items: [
        {
          title: "Hồ sơ cá nhân",
          url: `/w/${orgSlug}/settings/profile`,
          icon: <User className="size-4" />,
          exact: true,
        },
      ],
    },
    {
      label: "Không gian làm việc",
      items: [
        {
          title: "Chung",
          url: `/w/${orgSlug}/settings`,
          icon: <Sliders className="size-4" />,
          exact: true,
        },
        {
          title: "Thành viên",
          url: `/w/${orgSlug}/settings/members`,
          icon: <Users className="size-4" />,
          exact: true,
        },
        {
          title: "Phân quyền & Vai trò",
          url: `/w/${orgSlug}/settings/roles`,
          icon: <Shield className="size-4" />,
          exact: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <SidebarGroup key={group.label} className="p-0">
          <SidebarGroupLabel className="px-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {group.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = item.exact
                  ? pathname === item.url
                  : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.url} />}
                      className="gap-2 px-2 text-sm"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </div>
  );
}
