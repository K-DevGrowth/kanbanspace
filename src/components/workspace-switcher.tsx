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
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

export interface Org {
  id: string;
  name: string;
  slug: string;
  logo?: React.ReactNode | string | null;
}

interface WorkspaceSwitcherProps {
  currentOrg?: Org;
  orgs: Org[];
}

export function WorkspaceSwitcher({
  currentOrg: currentOrgProp,
  orgs = [],
}: WorkspaceSwitcherProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || "";

  // Tự động tìm workspace tương ứng với route hiện tại trên URL
  const activeOrg =
    orgs.find((o) => o.slug === orgSlug) || currentOrgProp || orgs[0];

  if (!activeOrg && orgs.length === 0) return null;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton className="w-full" />}
            >
              <div className="flex aspect-square size-5 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-semibold text-xs">
                {activeOrg?.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="truncate font-medium flex-1 text-left min-w-0">
                {activeOrg?.name}
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
                {orgs.map((o) => {
                  const isSelected = o.slug === activeOrg?.slug;
                  return (
                    <DropdownMenuItem
                      key={o.id || o.slug || o.name}
                      render={<Link href={`/w/${o.slug}`} prefetch={true} />}
                      onClick={() => {
                        if (o.id) {
                          authClient.organization
                            .setActive({ organizationId: o.id })
                            .catch(() => {});
                        }
                      }}
                      className="gap-2 p-2 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-xs border text-xs font-medium">
                          {o.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="truncate flex-1 min-w-0 font-medium">
                          {o.name}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckIcon className="size-4 shrink-0 opacity-80" />
                      )}
                    </DropdownMenuItem>
                  );
                })}
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
