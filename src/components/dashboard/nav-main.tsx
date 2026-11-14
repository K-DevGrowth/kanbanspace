"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";

export function NavMain({ orgSlug }: { orgSlug: string }) {
  const pathname = usePathname();

  const items = [
    {
      title: "Overview",
      url: `/w/${orgSlug}`,
      icon: <HomeIcon />,
      exact: true,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.url
          : pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={isActive}
              render={<Link href={item.url} />}
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
