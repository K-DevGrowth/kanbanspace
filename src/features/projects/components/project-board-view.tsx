"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_KANBAN_COLUMNS, ProjectColumn } from "@/db/schema";
import {
  Columns3,
  FolderKanban,
  Kanban,
  ListFilter,
  ListTodo,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

interface ProjectBoardViewProps {
  project: {
    id: string;
    key: string;
    name: string;
    description?: string | null;
    template?: string;
    columns?: ProjectColumn[] | null;
  };
}

export function ProjectBoardView({ project }: ProjectBoardViewProps) {
  const columns =
    project.columns && project.columns.length > 0
      ? project.columns
      : DEFAULT_KANBAN_COLUMNS;

  return (
    <div className="flex flex-col h-full overflow-hidden p-4 sm:p-5 gap-3.5">
      {/* 1. Project Header & Information */}
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7.5 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FolderKanban className="size-4" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              {project.name}
            </h1>
            <Badge variant="secondary" shape="rounded" size="sm" className="font-mono text-xs">
              {project.key}
            </Badge>
            <Badge variant="outline" shape="pill" size="sm" className="gap-1 font-normal text-muted-foreground text-[11px]">
              <Kanban className="size-3 text-primary" />
              {project.template === "kanban" ? "Kanban" : "Project"}
            </Badge>
          </div>
          {project.description && (
            <p className="text-xs text-muted-foreground pl-10">
              {project.description}
            </p>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-1.5 h-8 text-xs">
            <Plus className="size-3.5" />
            Add issue
          </Button>
        </div>
      </div>

      {/* 2. View Mode Tabs & Filter Controls */}
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg w-fit border border-border/50">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-background text-foreground shadow-xs"
          >
            <Columns3 className="size-3.5 text-primary" />
            Board
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
          >
            <ListTodo className="size-3.5" />
            List
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center gap-2">
          <div className="relative w-48 sm:w-60">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter issues..."
              className="h-8 pl-8 text-xs bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
            <ListFilter className="size-3.5" />
            Filter
          </Button>
        </div>
      </div>

      {/* 3. Horizontal Kanban Board (Full Height, Fit Screen) */}
      <div className="flex-1 min-h-0 flex gap-3.5 overflow-x-auto overflow-y-hidden pb-1 items-stretch">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-1 min-w-[270px] max-w-[440px] shrink-0 xl:shrink flex flex-col h-full rounded-xl border border-border/70 bg-muted/20 p-3 shadow-xs"
          >
            {/* Column Header */}
            <div className="shrink-0 flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: column.color || "#64748b" }}
                />
                <span className="text-xs font-semibold text-foreground tracking-tight">
                  {column.name}
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                  0
                </span>
              </div>

              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Column Tasks Container (Empty State) */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 rounded-lg border border-dashed border-border/60 p-3 bg-background/50">
              <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-1.5">
                  <Columns3 className="size-4 opacity-60" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  No issues yet
                </p>
                <p className="text-[11px] text-muted-foreground/70 max-w-[190px] mt-0.5">
                  Click the + icon above or button below to add an issue
                </p>
              </div>
            </div>

            {/* Column Quick Add Button */}
            <div className="shrink-0 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 font-normal"
              >
                <Plus className="size-3.5" />
                Add issue
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
