"use client";

import * as React from "react";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";

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
import { cn } from "@/lib/utils";

export interface Org {
  id?: string;
  name: string;
  logo?: React.ElementType | React.ReactNode | string | null;
  plan?: string;
  slug?: string;
}

export type Team = Org;

interface WorkspaceSwitcherProps {
  orgs?: Org[];
  teams?: Org[];
  currentOrg?: Org;
  orgSlug?: string;
}

function renderLogo(
  logo: React.ElementType | React.ReactNode | string | null | undefined,
  name?: string,
  className = "size-3",
) {
  if (React.isValidElement(logo)) {
    return React.cloneElement(
      logo as React.ReactElement<{ className?: string }>,
      {
        className: cn(
          (logo.props as { className?: string })?.className,
          className,
        ),
      },
    );
  }

  if (typeof logo === "function") {
    const LogoComponent = logo as React.ElementType;
    return <LogoComponent className={className} />;
  }

  return (
    <span className="text-[10px] font-bold leading-none">
      {name?.charAt(0)?.toUpperCase() ?? "W"}
    </span>
  );
}

export function WorkspaceSwitcher({
  orgs = [],
  teams,
  currentOrg: currentOrgProp,
  orgSlug,
}: WorkspaceSwitcherProps) {
  const items = teams ?? orgs ?? [];

  // Tìm active team theo currentOrg hoặc orgSlug
  const activeTeam =
    currentOrgProp ?? items.find((item) => item.slug === orgSlug) ?? items[0];

  if (!activeTeam && items.length === 0) {
    return null;
  }

  const current = activeTeam || items[0];

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton className="w-fit px-1.5" />}
            >
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {renderLogo(current?.logo, current?.name, "size-3")}
              </div>
              <span className="truncate font-medium">{current?.name}</span>
              <ChevronDown className="opacity-50" />
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
                {items.map((team) => {
                  return (
                    <DropdownMenuItem
                      key={team.id || team.slug || team.name}
                      render={
                        team.slug ? (
                          <Link href={`/w/${team.slug}`} prefetch={true} />
                        ) : undefined
                      }
                      className="gap-2 p-2 cursor-pointer"
                    >
                      <div className="flex size-6 items-center justify-center rounded-xs border">
                        {renderLogo(team.logo, team.name, "size-4 shrink-0")}
                      </div>
                      <span className="truncate flex-1">{team.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <Link
                    href={`/join`}
                    className="font-medium text-muted-foreground"
                  >
                    Thêm không gian làm việc
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

export { WorkspaceSwitcher as TeamSwitcher };
