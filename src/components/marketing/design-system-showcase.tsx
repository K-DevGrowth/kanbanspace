"use client";

import {
  Sparkles,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Share2,
  Trash2,
  Plus,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Kbd } from "@/components/ui/kbd";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function DesignSystemShowcase() {
  return (
    <section
      id="design-system"
      className="py-16 md:py-24 border-t border-border/80 bg-secondary/30 scroll-mt-16"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <Badge variant="blue" size="sm" shape="pill">
            Design System Reference
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Nguyên tắc Thiết kế Chuẩn mực theo Notion
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Hệ thống phân cấp thị giác tinh giản, chú trọng vào độ tương phản dịu mắt,
            đường viền siêu mảnh (hairline), typography có tracking chuẩn xác và các
            thành phần responsive linh hoạt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Typography System */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>1. Typography & Hierarchy</CardTitle>
              <CardDescription>
                Tỷ lệ font chữ và letter-spacing (tracking) được tối ưu hóa cho tài liệu và dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 pb-3 border-b border-border/60">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">H1 Display / 36px</span>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  Làm chủ công việc và quy trình
                </p>
              </div>

              <div className="space-y-1 pb-3 border-b border-border/60">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">H2 Section / 24px</span>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  Phối hợp nhóm không rào cản
                </p>
              </div>

              <div className="space-y-1 pb-3 border-b border-border/60">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">H3 Subsection / 18px</span>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  Tiến độ chiến dịch quý 4
                </p>
              </div>

              <div className="space-y-1 pb-3 border-b border-border/60">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">Body / 14px leading-relaxed</span>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Thiết kế được xây dựng dựa trên nguyên tắc tối giản của Notion: nền sáng dịu mắt,
                  màu chữ charcoal không gây chói lóa và khoảng cách dòng thoải mái cho mắt đọc.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">Microcopy & Code</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Phím tắt nhanh:</span>
                  <Kbd>⌘K</Kbd>
                  <Kbd>Esc</Kbd>
                  <Kbd>↵</Kbd>
                  <span className="text-xs font-mono bg-muted/60 px-1.5 py-0.5 rounded border border-border/60">
                    --color-sidebar
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Notion Semantic Tag Colors */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>2. Bảng Màu Thẻ Thuộc tính (Notion 9-Tone)</CardTitle>
              <CardDescription>
                9 gam màu pastel đặc trưng của Notion dành cho tags, trạng thái và nhãn công việc.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Thẻ thuộc tính tiêu chuẩn (rounded-sm):</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="gray">Mặc định (Gray)</Badge>
                  <Badge variant="brown">Nâu (Brown)</Badge>
                  <Badge variant="orange">Cam (Orange)</Badge>
                  <Badge variant="yellow">Vàng (Yellow)</Badge>
                  <Badge variant="green">Xanh lá (Green)</Badge>
                  <Badge variant="blue">Xanh dương (Blue)</Badge>
                  <Badge variant="purple">Tím (Purple)</Badge>
                  <Badge variant="pink">Hồng (Pink)</Badge>
                  <Badge variant="red">Đỏ (Red)</Badge>
                </div>
              </div>

              <Separator label="Dạng Pill (Rounded-full)" />

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Trạng thái công việc (pill shape):</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="gray" shape="pill" size="sm">Chưa bắt đầu</Badge>
                  <Badge variant="blue" shape="pill" size="sm">Đang thực hiện</Badge>
                  <Badge variant="yellow" shape="pill" size="sm">Đang chờ duyệt</Badge>
                  <Badge variant="green" shape="pill" size="sm">Đã hoàn thành</Badge>
                  <Badge variant="red" shape="pill" size="sm">Bị chặn (Blocked)</Badge>
                </div>
              </div>

              <Separator label="Kiểu Nền Solid & Hairline" />

              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="sm">Solid Dark</Badge>
                <Badge variant="secondary" size="sm">Secondary</Badge>
                <Badge variant="outline" size="sm">Outline Hairline</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Notion Callout Primitives */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>3. Khối Chú thích (Notion Callouts)</CardTitle>
              <CardDescription>
                Thành phần nhận diện đặc trưng của Notion kết hợp biểu tượng và nội dung thông tin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Callout
                variant="default"
                icon={<Sparkles className="h-4 w-4" />}
                title="Khối Chú thích Mặc định"
              >
                Sử dụng nền neutral nhẹ để làm nổi bật các đoạn ghi chú hoặc hướng dẫn chung.
              </Callout>

              <Callout
                variant="info"
                icon={<Info className="h-4 w-4" />}
                title="Thông tin / Mẹo hữu ích"
              >
                Nhấn phím tắt nhanh để duyệt nhanh danh sách dự án mà không cần rời bàn phím.
              </Callout>

              <Callout
                variant="warning"
                icon={<AlertTriangle className="h-4 w-4" />}
                title="Cảnh báo Tiến độ"
              >
                Hạn chót hoàn thành giai đoạn thử nghiệm đóng lại sau 48 giờ.
              </Callout>

              <Callout
                variant="success"
                icon={<CheckCircle className="h-4 w-4" />}
                title="Hoàn tất Đồng bộ"
              >
                Dữ liệu sprint và các bảng chỉ số đã được tự động lưu trữ trên đám mây.
              </Callout>

              <Callout
                variant="destructive"
                icon={<AlertCircle className="h-4 w-4" />}
                title="Lỗi Phân quyền"
              >
                Bạn cần quyền Quản trị viên để chỉnh sửa cấu hình không gian làm việc này.
              </Callout>
            </CardContent>
          </Card>

          {/* Card 4: Buttons, Links & Borders */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>4. Nút bấm, Liên kết & Bo góc (Borders & Radius)</CardTitle>
              <CardDescription>
                Độ bo góc 6px (rounded-md), hairline border 1px và các biến thể tương tác tinh tế.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Các biến thể Nút bấm (Variants):</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="default" size="sm">
                    Primary Solid
                  </Button>
                  <Button variant="outline" size="sm">
                    Hairline Outline
                  </Button>
                  <Button variant="secondary" size="sm">
                    Subtle Surface
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost Item
                  </Button>
                  <Button variant="accent" size="sm">
                    Notion Blue
                  </Button>
                  <Button variant="destructive" size="sm">
                    Destructive
                  </Button>
                  <Button variant="link" size="sm">
                    Text Link
                  </Button>
                </div>
              </div>

              <Separator label="Kích thước Nút (Sizes)" />

              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs" variant="outline">
                  Kích thước XS (24px)
                </Button>
                <Button size="sm" variant="outline">
                  Kích thước SM (28px)
                </Button>
                <Button size="default" variant="outline">
                  Mặc định (32px)
                </Button>
                <Button size="lg" variant="outline">
                  Kích thước LG (40px)
                </Button>
              </div>

              <Separator label="Hành động kèm Phím tắt & Biểu tượng" />

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Tạo trang mới</span>
                  <Kbd>⌘N</Kbd>
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Chia sẻ</span>
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Đánh dấu</span>
                </Button>
                <Button size="icon-sm" variant="ghost" aria-label="Xóa">
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
