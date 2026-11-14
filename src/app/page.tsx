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
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
            Focus on what matters,
            <span className="block text-muted-foreground/80 font-medium">
              master every project.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-muted-foreground leading-relaxed">
            A seamless, visual, and high-speed workspace. Connect goals, track
            progress, and empower your team to execute with clarity and momentum.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-11 px-8 text-sm bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Get started for free
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <Zap className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">High Velocity</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Instant interactions, fluid drag-and-drop, and responsive boards
                designed for rapid task execution.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Enterprise Security</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Complete multi-tenant isolation ensures your team data and
                projects remain strictly confidential.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <Users className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Granular Roles</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Invite teammates, assign issues, and control workspace access
                with robust role-based permissions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2026 KanbanSpace. Built with Next.js App Router, Better Auth & Drizzle ORM.
      </footer>
    </div>
  );
}
