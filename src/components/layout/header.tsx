"use client";

import { Search, Bell, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export function Header() {
  return (
    <header className="h-12 border-b border-border bg-background/90 backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-20">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
        <span className="hover:text-foreground cursor-pointer transition-colors">
          Workspace
        </span>
        <span className="text-muted-foreground/40">/</span>
        <span className="font-medium text-foreground truncate">
          Dự án Quản lý Chiến dịch
        </span>
      </div>

      {/* Center Search / Shortcut */}
      <div className="hidden md:flex items-center gap-2 max-w-sm flex-1 mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm công việc, tài liệu..."
            className="w-full h-7 pl-8 pr-12 text-xs bg-muted/40 border border-border/80 rounded-md placeholder:text-muted-foreground/70 focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-all"
            disabled
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Kbd>⌘K</Kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground hidden sm:inline-flex"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Chia sẻ</span>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          aria-label="Thông báo"
        >
          <Bell className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" className="h-7 text-xs gap-1 px-2.5">
          <Plus className="h-3.5 w-3.5" />
          <span>Tạo mới</span>
        </Button>
      </div>
    </header>
  );
}
