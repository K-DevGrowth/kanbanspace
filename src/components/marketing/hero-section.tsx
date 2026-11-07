"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  Clock,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Kbd } from "@/components/ui/kbd";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16">
      <Container size="wide">
        {/* Editorial Hero Header */}
        <div className="mx-auto max-w-4xl text-center space-y-5">
          {/* Main Title */}
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
            Tập trung vào công việc,
            <span className="block text-muted-foreground/80 font-medium">
              làm chủ mọi dự án của bạn.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-muted-foreground leading-relaxed">
            Một không gian làm việc liền mạch, trực quan và tốc độ cao. Kết nối
            mục tiêu, quản lý tiến độ và trao quyền cho đội ngũ thực thi hiệu
            quả mà không bị phân tán.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg", variant: "default" }),
                "w-full sm:w-auto px-5 font-medium shadow-xs",
              )}
            >
              <span>Dùng thử miễn phí</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Micro text with Kbd */}
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
            <span>Dễ dàng tìm kiếm mọi lúc với</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span>• Miễn phí không cần thẻ tín dụng</span>
          </p>
        </div>

        {/* Notion-Style Product Presentation Mockup */}
        <div
          id="features"
          className="mt-12 md:mt-16 mx-auto max-w-5xl scroll-mt-20"
        >
          <div className="rounded-lg border border-border bg-card shadow-xs overflow-hidden">
            {/* Window Topbar */}
            <div className="h-10 border-b border-border bg-secondary/50 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground pl-2 border-l border-border/80">
                  KanbanSpace / Dự án Phát triển Sản phẩm SaaS / Q4 Sprint
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="green" size="sm" shape="pill">
                  ● Đang hoạt động
                </Badge>
              </div>
            </div>

            {/* Document Header Area */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  <span className="text-2xl" role="img" aria-label="rocket">
                    🚀
                  </span>
                  <span>Kế hoạch Ra mắt Nền tảng Q4</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Theo dõi công việc phát triển, kiểm thử chất lượng và chuẩn bị
                  truyền thông trước ngày ra mắt thị trường.
                </p>
              </div>

              {/* Iconic Notion Callout Box */}
              <Callout
                variant="info"
                icon={<Sparkles className="h-4 w-4" />}
                title="Mục tiêu Sprint hiện tại"
              >
                Hoàn tất nâng cấp hệ thống giao diện, tối ưu hóa hiệu năng tải
                trang dưới 100ms và đồng bộ các token thiết kế chuẩn mực.
              </Callout>

              {/* Task Grid / Kanban-Style Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                {/* Column 1: Backlog */}
                <Card className="bg-secondary/40 border-border/70 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-border/60">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Cần làm
                    </span>
                    <Badge variant="gray" size="sm" shape="pill">
                      2
                    </Badge>
                  </div>

                  <div className="rounded-md border border-border bg-card p-3 space-y-2.5 shadow-2xs hover:border-border transition-colors">
                    <div className="flex items-center justify-between">
                      <Badge variant="orange" size="sm">
                        Ưu tiên Cao
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        #PL-104
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Tối ưu hóa bảng chỉ mục cơ sở dữ liệu
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 05 Th11
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Backend
                      </span>
                    </div>
                  </div>

                  <div className="rounded-md border border-border bg-card p-3 space-y-2.5 shadow-2xs hover:border-border transition-colors">
                    <div className="flex items-center justify-between">
                      <Badge variant="purple" size="sm">
                        Nghiên cứu
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        #PL-105
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Khảo sát ý kiến người dùng về dark mode
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 08 Th11
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> UX
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Column 2: In Progress */}
                <Card className="bg-secondary/40 border-border/70 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-border/60">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <SlidersHorizontal className="h-3 w-3 text-blue-500" />
                      Đang xử lý
                    </span>
                    <Badge variant="blue" size="sm" shape="pill">
                      1
                    </Badge>
                  </div>

                  <div className="rounded-md border border-border bg-card p-3 space-y-2.5 shadow-2xs hover:border-border transition-colors">
                    <div className="flex items-center justify-between">
                      <Badge variant="blue" size="sm">
                        Đang làm
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        #PL-102
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Chuẩn hóa typography và spacing theo Notion
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Hôm nay
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Design
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Column 3: Done */}
                <Card className="bg-secondary/40 border-border/70 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-border/60">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      Hoàn thành
                    </span>
                    <Badge variant="green" size="sm" shape="pill">
                      2
                    </Badge>
                  </div>

                  <div className="rounded-md border border-border bg-card p-3 space-y-2.5 shadow-2xs opacity-85 hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between">
                      <Badge variant="green" size="sm">
                        Đã xong
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        #PL-99
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground line-through text-muted-foreground">
                      Thiết lập kiến trúc Drizzle ORM và Neon
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Đã duyệt
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3" /> Core
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
