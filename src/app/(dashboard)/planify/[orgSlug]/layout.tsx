import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { requireOrg } from "@/lib/auth/session";
import { Suspense } from "react";

export default function WorkspaceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  return (
    <Suspense fallback={null}>
      <WorkspaceShell params={params}>{children}</WorkspaceShell>
    </Suspense>
  );
}

async function WorkspaceShell({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  const { orgSlug } = await params;
  await requireOrg(orgSlug);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
