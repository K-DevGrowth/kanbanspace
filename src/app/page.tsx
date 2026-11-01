import React from "react";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: "proj-1",
    name: "Customer Onboarding Redesign",
    description: "Streamline signup and activation flows for self-serve users.",
    category: "Product",
    taskCount: 12,
    completedTaskCount: 8,
    status: "active",
    updatedAt: "2 hours ago",
  },
  {
    id: "proj-2",
    name: "Design System & UI Kit",
    description:
      "Standardize buttons, inputs, modals, and design tokens across apps.",
    category: "Design",
    taskCount: 18,
    completedTaskCount: 14,
    status: "active",
    updatedAt: "Yesterday",
  },
  {
    id: "proj-3",
    name: "API Performance Optimization",
    description:
      "Implement query caching and response compression for core endpoints.",
    category: "Engineering",
    taskCount: 9,
    completedTaskCount: 3,
    status: "planning",
    updatedAt: "3 days ago",
  },
];

const mockTasks = [
  {
    id: "task-1",
    title: "Implement responsive Kanban board columns",
    status: "in_progress",
    priority: "high",
    projectId: "proj-1",
    dueDate: "Tomorrow",
    createdAt: "2026-10-30",
    updatedAt: "2026-11-01",
  },
  {
    id: "task-2",
    title: "Set up Prisma schema and migrations",
    status: "todo",
    priority: "medium",
    projectId: "proj-3",
    dueDate: "Next week",
    createdAt: "2026-10-31",
    updatedAt: "2026-11-01",
  },
  {
    id: "task-3",
    title: "Design team invite flow and role permissions",
    status: "in_review",
    priority: "high",
    projectId: "proj-1",
    dueDate: "In 3 days",
    createdAt: "2026-10-28",
    updatedAt: "2026-10-31",
  },
  {
    id: "task-4",
    title: "Configure Tailwind CSS and design tokens",
    status: "done",
    priority: "urgent",
    projectId: "proj-2",
    dueDate: "Done",
    createdAt: "2026-10-29",
    updatedAt: "2026-11-01",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Project Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Minimal SaaS Project Management foundation using shadcn UI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Import Project
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 in progress, 1 in planning
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tasks
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 tasks due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Tasks
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Projects</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground gap-1"
          >
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockProjects.map((project) => {
            const progress = Math.round(
              (project.completedTaskCount / project.taskCount) * 100,
            );
            return (
              <Card key={project.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        project.status === "active" ? "default" : "secondary"
                      }
                    >
                      {project.status === "active" ? "In Progress" : "Planning"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.updatedAt}
                    </span>
                  </div>
                  <CardTitle className="text-base font-semibold mt-2">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-medium text-foreground">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>{project.taskCount} tasks total</span>
                      <span>{project.completedTaskCount} completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Tasks List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-border">
            {mockTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      task.priority === "urgent"
                        ? "destructive"
                        : task.priority === "high"
                          ? "default"
                          : "outline"
                    }
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant={
                      task.status === "done"
                        ? "default"
                        : task.status === "in_progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Setup notification banner */}
      <div className="p-4 rounded-lg border border-border bg-muted/40 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">
            Clean shadcn architecture:{" "}
          </span>
          Configured with{" "}
          <code className="text-foreground font-mono">components.json</code>,
          shadcn HSL theme tokens, and minimal essential dependencies without
          unnecessary packages.
        </div>
      </div>
    </div>
  );
}
