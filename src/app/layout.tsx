import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planify | Nền tảng Quản lý Dự án SaaS",
  description: "Nền tảng Quản lý Dự án SaaS Hiện đại và Tối giản",
};

const beVietNamPro = Be_Vietnam_Pro({
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietNamPro.className}>
      <body className="min-h-screen bg-background text-foreground antialiased flex">
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
