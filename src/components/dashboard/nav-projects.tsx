"use client";

import * as React from "react";
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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderKanban,
  MoreHorizontal,
  PlusIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface ProjectItem {
  id?: string;
  name: string;
  url?: string;
  emoji?: React.ReactNode;
}

export function NavProjects({
  projects: initialProjects,
}: {
  projects?: ProjectItem[];
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [projects, setProjects] = React.useState<ProjectItem[]>(
    initialProjects ?? [{ id: "1", name: "Dự án phát triển", emoji: "🚀" }],
  );

  const handleDeleteProject = (projectIdOrName: string) => {
    setProjects((prev) =>
      prev.filter((p) =>
        p.id ? p.id !== projectIdOrName : p.name !== projectIdOrName,
      ),
    );
  };

  return (
    <SidebarMenu>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          {/* Nút bấm chính: Click vào nguyên button để đóng/mở danh sách */}
          <CollapsibleTrigger
            render={
              <SidebarMenuButton className="group/collapsible-btn w-full">
                {/* Bình thường hiện FolderKanban, khi hover đổi thành mũi tên */}
                <div className="relative flex size-4 items-center justify-center">
                  <FolderKanban className="size-4 transition-opacity group-hover/collapsible-btn:opacity-0" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/collapsible-btn:opacity-100">
                    {isOpen ? (
                      <ChevronDownIcon className="size-4" />
                    ) : (
                      <ChevronRightIcon className="size-4" />
                    )}
                  </div>
                </div>
                <span className="flex-1 text-left font-medium">Dự án</span>
              </SidebarMenuButton>
            }
          />

          {/* Nút dấu cộng (+) tạo dự án nhanh bên phải khi hover vào dòng "Dự án" */}
          <SidebarMenuAction
            showOnHover
            title="Thêm dự án"
            onClick={(e) => {
              e.stopPropagation();
              // Có thể mở dialog tạo dự án tại đây
            }}
          >
            <PlusIcon />
          </SidebarMenuAction>

          {/* Danh sách các dự án con */}
          <CollapsibleContent>
            <SidebarMenuSub>
              {projects.map((project) => {
                const identifier = project.id || project.name;
                return (
                  <SidebarMenuSubItem
                    key={identifier}
                    className="group/project-sub-item relative flex items-center"
                  >
                    <SidebarMenuSubButton
                      render={
                        <Link
                          href={project.url ?? "#"}
                          className="flex-1 pr-6"
                        />
                      }
                    >
                      {project.emoji && (
                        <span className="text-xs">{project.emoji}</span>
                      )}
                      <span className="truncate">{project.name}</span>
                    </SidebarMenuSubButton>

                    {/* Dấu ... ở bên phải khi di chuột vào dự án */}
                    <div className="absolute right-1 opacity-0 transition-opacity group-hover/project-sub-item:opacity-100 group-focus-within/project-sub-item:opacity-100 data-[state=open]:opacity-100">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-hidden"
                            />
                          }
                        >
                          <MoreHorizontal className="size-3.5" />
                          <span className="sr-only">Tùy chọn dự án</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          side="bottom"
                          className="w-40 rounded-lg p-1"
                        >
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDeleteProject(identifier)}
                              className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                            >
                              <Trash2 className="size-4" />
                              <span>Xóa dự án</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
