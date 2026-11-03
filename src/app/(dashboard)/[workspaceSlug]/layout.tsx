import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
