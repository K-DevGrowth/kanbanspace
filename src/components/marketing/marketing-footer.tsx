import Link from "next/link";
import { Layers } from "lucide-react";
import { Container } from "@/components/ui/container";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-2xs">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Planify
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Không gian làm việc cộng tác và quản lý dự án tối giản, hiệu quả
              cao cho các nhóm kỹ thuật và sáng tạo.
            </p>
          </div>

          {/* Column 1 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground tracking-tight">
              Sản phẩm
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Bảng Kanban
                </Link>
              </li>
              <li>
                <Link href="#templates" className="hover:text-foreground transition-colors">
                  Mẫu tài liệu
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground tracking-tight">
              Tài nguyên
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#design-system" className="hover:text-foreground transition-colors">
                  Hệ thống thiết kế
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Phím tắt ứng dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Hướng dẫn API
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground tracking-tight">
              Pháp lý
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Bảo mật dữ liệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Planify Inc. Mọi quyền được bảo lưu.</p>
          <p className="text-[11px]">
            Lấy cảm hứng từ triết lý thiết kế tối giản, tập trung vào nội dung.
          </p>
        </div>
      </Container>
    </footer>
  );
}
