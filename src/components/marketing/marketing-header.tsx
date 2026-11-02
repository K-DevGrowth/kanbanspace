"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Planify
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2"></nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/signup"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Đăng nhập
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5 shadow-sm")}
          >
            <span className="sm:hidden">Dùng thử</span>
            <span className="hidden sm:inline">Dùng thử miễn phí</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "xs", variant: "default" }))}
          >
            <span className="sm:hidden">Dùng thử</span>
            <span className="hidden sm:inline">Dùng thử miễn phí</span>
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/98 px-4 pt-3 pb-6 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Nền tảng quản lý dự án</span>
            </div>
          </div>
          <nav className="flex flex-col space-y-1"></nav>
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-center",
              )}
            >
              Đăng nhập tài khoản
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full justify-center gap-2",
              )}
            >
              <span>Tạo tài khoản miễn phí</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
