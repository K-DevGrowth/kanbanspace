"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";

interface Org {
  id: string;
  name: string;
  slug: string;
  logo?: React.ReactNode;
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
  const router = useRouter();

  if (!currentOrg) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton className="w-fit px-1.5" />}
            >
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-semibold text-xs">
                {currentOrg.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="truncate font-medium">{currentOrg.name}</span>
              <ChevronDownIcon className="opacity-50" />
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
                {orgs.map((o, index) => (
                  <DropdownMenuItem
                    key={o.id || o.slug || o.name}
                    onClick={() => router.push(`/planify/${o.slug}`)}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-xs border text-xs font-medium">
                      {o.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="truncate flex-1">{o.name}</span>
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
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
