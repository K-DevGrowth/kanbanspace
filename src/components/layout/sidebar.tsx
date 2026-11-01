"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users2,
  Settings,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard, current: true },
  { name: "Dự án", href: "#", icon: FolderKanban, current: false },
  { name: "Công việc của tôi", href: "#", icon: CheckSquare, current: false },
  { name: "Thành viên", href: "#", icon: Users2, current: false },
  { name: "Cài đặt", href: "#", icon: Settings, current: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0 min-h-screen">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold text-base tracking-tight block leading-tight">
            Planify
          </span>
          <span className="text-[11px] text-muted-foreground font-medium">
            Bộ công cụ Quản lý
          </span>
        </div>
      </div>

      {/* Nav links */}
      <div className="p-4 flex-1 space-y-1">
        <p className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Không gian làm việc
        </p>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.current
                    ? "bg-secondary text-secondary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    item.current ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
