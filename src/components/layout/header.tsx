"use client";

import { Search, Bell, Plus } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, tasks, or members..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
            disabled
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs flex items-center justify-center border border-border">
          JD
        </div>
      </div>
    </header>
  );
}
