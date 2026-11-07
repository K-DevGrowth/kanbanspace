"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, Menu, X, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-2xs">
            <Layers className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            KanbanSpace
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <Link
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Tính năng
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/signup"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Đăng nhập
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "sm", variant: "default" }),
              "gap-1 shadow-xs",
            )}
          >
            <span>Dùng thử miễn phí</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "xs", variant: "default" }))}
          >
            Dùng thử
          </Link>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-3 pb-6 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-foreground" />
              <span>Không gian làm việc linh hoạt</span>
            </div>
            <Badge variant="blue" size="sm">
              Mới
            </Badge>
          </div>
          <nav className="flex flex-col space-y-2 text-sm font-medium text-muted-foreground">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Tính năng
            </Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full justify-center",
              )}
            >
              Đăng nhập tài khoản
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "w-full justify-center gap-1.5",
              )}
            >
              <span>Dùng thử miễn phí</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
