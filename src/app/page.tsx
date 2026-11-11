import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderKanban, ShieldCheck, Zap, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <FolderKanban className="h-6 w-6" />
          <span>KanbanSpace</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signin">
            <Button variant="ghost" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Dùng thử</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
            Tập trung vào công việc,
            <span className="block text-muted-foreground/80 font-medium">
              làm chủ mọi dự án của bạn.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-muted-foreground leading-relaxed">
            Một không gian làm việc liền mạch, trực quan và tốc độ cao. Kết nối
            mục tiêu, quản lý tiến độ và trao quyền cho đội ngũ thực thi hiệu
            quả mà không bị phân tán.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-11 px-8 text-sm bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Dùng thử miễn phí
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="h-11 px-8 text-sm">
                Đăng nhập
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <Zap className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Thao tác mượt mà</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Kéo thả thẻ công việc tức thì, phản hồi nhanh chóng mà không gây
                tải lại hay đơ bảng Kanban.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Bảo mật dữ liệu</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Mỗi doanh nghiệp và nhóm làm việc được tách biệt hoàn toàn, đảm
                bảo an toàn thông tin tối đa.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <Users className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Phân quyền linh hoạt</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Dễ dàng mời đồng nghiệp vào dự án và phân cấp quyền hạn rõ ràng
                theo từng vị trí công việc.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2026 KanbanSpace. Xây dựng với Next.js App Router, Better Auth &
        Drizzle ORM.
      </footer>
    </div>
  );
}
