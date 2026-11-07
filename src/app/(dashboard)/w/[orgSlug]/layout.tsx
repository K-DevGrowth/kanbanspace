import { requireMember } from "@/lib/auth/session";
import { Suspense } from "react";

export default function WorkspaceSlugLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  return (
    <Suspense fallback={null}>
      <AuthedContent params={params}>{children}</AuthedContent>
    </Suspense>
  );
}

async function AuthedContent({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}>) {
  const { orgSlug } = await params;
  await requireMember(orgSlug);

  return children;
}
