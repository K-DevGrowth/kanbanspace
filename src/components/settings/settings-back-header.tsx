"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function SettingsBackHeader({ orgSlug }: { orgSlug: string }) {
  return (
    <SidebarMenuButton
      render={<Link href={`/w/${orgSlug}`} />}
      className="h-9 gap-2 px-2 font-medium text-foreground hover:bg-sidebar-accent"
    >
      <ArrowLeft className="size-4 text-muted-foreground" />
      <span className="truncate">Quay lại</span>
    </SidebarMenuButton>
  );
}
