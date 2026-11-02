import Link from "next/link";
import { Layers } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Planify
              </span>
            </Link>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Nền tảng quản lý dự án dễ dàng sử dụng, bảng Kanban trực quan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
