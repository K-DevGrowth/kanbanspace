"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users2,
  Settings,
  Layers,
  ChevronDown,
  Search,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

const navigation = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard, current: true },
  { name: "Dự án", href: "#", icon: FolderKanban, current: false },
  { name: "Công việc của tôi", href: "#", icon: CheckSquare, current: false },
  { name: "Thành viên", href: "#", icon: Users2, current: false },
  { name: "Cài đặt", href: "#", icon: Settings, current: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col shrink-0 min-h-screen">
      {/* Workspace Switcher Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-sidebar-border">
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-sidebar-accent w-full"
        >
          <div className="h-7 w-7 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-2xs">
            <Layers className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-xs tracking-tight block truncate text-sidebar-foreground">
              Planify Workspace
            </span>
            <span className="text-[11px] text-muted-foreground block truncate">
              Gói Nhóm Cộng tác
            </span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </button>
      </div>

      {/* Quick Actions (Search, New) */}
      <div className="p-2 space-y-0.5 border-b border-sidebar-border/60">
        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-normal text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" />
            <span>Tìm kiếm nhanh</span>
          </div>
          <Kbd>⌘K</Kbd>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-normal text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-3.5 w-3.5" />
            <span>Thêm trang mới</span>
          </div>
          <Kbd>⌘N</Kbd>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="p-2 flex-1 space-y-1">
        <p className="px-2.5 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
          Không gian làm việc
        </p>
        <nav className="space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
                  item.current
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-2xs"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    item.current
                      ? "text-sidebar-primary"
                      : "text-muted-foreground",
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-2.5 border-t border-sidebar-border flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-full bg-secondary text-secondary-foreground font-semibold text-[11px] flex items-center justify-center border border-border">
          PL
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sidebar-foreground truncate">
            Tài khoản Cá nhân
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            pro-plan@planify.io
          </p>
        </div>
      </div>
    </aside>
  );
}
