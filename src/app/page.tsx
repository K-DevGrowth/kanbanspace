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
    name: "Thiết kế lại Luồng tiếp nhận Khách hàng",
    description:
      "Tối ưu hóa quy trình đăng ký và kích hoạt tài khoản cho người dùng tự phục vụ.",
    category: "Sản phẩm",
    taskCount: 12,
    completedTaskCount: 8,
    status: "active",
    updatedAt: "2 giờ trước",
  },
  {
    id: "proj-2",
    name: "Hệ thống Thiết kế & Bộ UI Kit",
    description:
      "Chuẩn hóa các thành phần giao diện, nút bấm, biểu mẫu và design tokens trong ứng dụng.",
    category: "Thiết kế",
    taskCount: 18,
    completedTaskCount: 14,
    status: "active",
    updatedAt: "Hôm qua",
  },
  {
    id: "proj-3",
    name: "Tối ưu Hiệu năng API Backend",
    description:
      "Triển khai bộ nhớ đệm truy vấn và nén dữ liệu phản hồi cho các endpoint quan trọng.",
    category: "Kỹ thuật",
    taskCount: 9,
    completedTaskCount: 3,
    status: "planning",
    updatedAt: "3 ngày trước",
  },
];

const mockTasks = [
  {
    id: "task-1",
    title: "Xây dựng các cột bảng Kanban thích ứng",
    status: "in_progress",
    priority: "high",
    projectId: "proj-1",
    dueDate: "Ngày mai",
    createdAt: "2026-10-30",
    updatedAt: "2026-11-01",
  },
  {
    id: "task-2",
    title: "Thiết lập cấu trúc schema và migration dữ liệu",
    status: "todo",
    priority: "medium",
    projectId: "proj-3",
    dueDate: "Tuần tới",
    createdAt: "2026-10-31",
    updatedAt: "2026-11-01",
  },
  {
    id: "task-3",
    title: "Thiết kế luồng mời thành viên và phân quyền nhóm",
    status: "in_review",
    priority: "high",
    projectId: "proj-1",
    dueDate: "Còn 3 ngày",
    createdAt: "2026-10-28",
    updatedAt: "2026-10-31",
  },
  {
    id: "task-4",
    title: "Cấu hình Tailwind CSS và biến giao diện shadcn",
    status: "done",
    priority: "urgent",
    projectId: "proj-2",
    dueDate: "Đã xong",
    createdAt: "2026-10-29",
    updatedAt: "2026-11-01",
  },
];

const priorityLabels: Record<string, string> = {
  urgent: "Khẩn cấp",
  high: "Ưu tiên cao",
  medium: "Trung bình",
  low: "Thấp",
};

const statusLabels: Record<string, string> = {
  in_progress: "Đang làm",
  todo: "Cần làm",
  in_review: "Đang duyệt",
  done: "Hoàn thành",
  backlog: "Chờ xử lý",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Tổng quan Dự án
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Nền tảng Quản lý Dự án SaaS tinh gọn với shadcn UI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Nhập dự án
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Tạo dự án mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dự án đang thực hiện
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 đang tiến hành, 1 đang lập kế hoạch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Công việc cần làm
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 công việc đến hạn tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Công việc đã hoàn thành
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% tỷ lệ hoàn thành so với tuần trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dự án hoạt động</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground gap-1"
          >
            Xem tất cả <ArrowUpRight className="h-3.5 w-3.5" />
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
                      {project.status === "active"
                        ? "Đang tiến hành"
                        : "Lên kế hoạch"}
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
                      <span>Tiến độ</span>
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
                      <span>{project.taskCount} việc tất cả</span>
                      <span>{project.completedTaskCount} hoàn thành</span>
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
        <h2 className="text-lg font-semibold">Công việc gần đây</h2>
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
                      Hạn chót: {task.dueDate}
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
                    {priorityLabels[task.priority] || task.priority}
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
                    {statusLabels[task.status] || task.status}
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
            Kiến trúc shadcn/ui chuẩn:{" "}
          </span>
          Đã thiết lập cấu hình{" "}
          <code className="text-foreground font-mono">components.json</code>,
          hệ biến màu HSL chuẩn shadcn và gói phụ thuộc tối giản cần thiết.
        </div>
      </div>
    </div>
  );
}
