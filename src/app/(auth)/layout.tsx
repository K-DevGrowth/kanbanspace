import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

async function RedirectIfAuthenticated() {
  if (await getSession()) redirect("/planify");
  return null;
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <RedirectIfAuthenticated />
      </Suspense>
      {children}
    </>
  );
}
