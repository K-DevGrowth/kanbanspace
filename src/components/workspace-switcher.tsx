"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import Link from "next/link";

export interface Org {
  id: string;
  name: string;
  slug: string;
  logo?: React.ReactNode | string | null;
}

interface WorkspaceSwitcherProps {
  currentOrg: Org;
  orgs: Org[];
}

export function WorkspaceSwitcher({
  currentOrg,
  orgs = [],
}: WorkspaceSwitcherProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  if (!currentOrg) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton className="w-full" />}
            >
              <div className="flex aspect-square size-5 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-semibold text-xs">
                {currentOrg.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="truncate font-medium flex-1 text-left min-w-0">
                {currentOrg.name}
              </span>
              <ChevronDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 rounded-lg"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Không gian làm việc
                </DropdownMenuLabel>
                {orgs.map((o) => (
                  <DropdownMenuItem
                    key={o.id || o.slug || o.name}
                    render={<Link href={`/w/${o.slug}`} prefetch={true} />}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-xs border text-xs font-medium">
                      {o.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="truncate flex-1 min-w-0">{o.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setOpenCreateDialog(true)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <PlusIcon className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Thêm không gian làm việc
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateWorkspaceDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}
