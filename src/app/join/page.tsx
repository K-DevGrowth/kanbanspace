import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getOrgs, requireSession } from "@/lib/auth/session";
import OnboardingForm from "@/features/workspaces/components/onboarding-form";
import { Suspense } from "react";

export default function OnboardingLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPage />
    </Suspense>
  );
}

async function OnboardingPage() {
  const session = await requireSession();
  const orgs = (await getOrgs()) ?? [];
  const hasExistingOrgs = orgs.length > 0;
  const userEmail = session.user.email;

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between selection:bg-primary/10">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b px-6 py-4 text-xs text-muted-foreground sm:px-8">
        <div>
          {hasExistingOrgs ? (
            <Link
              href="/w"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ChevronLeft className="size-4" />
              <span>Back to workspace</span>
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[11px] text-muted-foreground/80">
            Signed in as
          </span>
          <span className="font-medium text-foreground">{userEmail}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-105 space-y-8">
          {/* Title & Introduction */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Create a workspace
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is where your team collaborates, tracks progress, and manages projects.
            </p>
          </div>

          <OnboardingForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t flex items-center justify-center text-xs text-muted-foreground">
        © 2026 KanbanSpace. Minimal and high-speed project management platform.
      </footer>
    </div>
  );
}
