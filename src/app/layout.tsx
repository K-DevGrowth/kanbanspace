import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planify | Nền tảng Quản lý Dự án SaaS",
  description: "Nền tảng Quản lý Dự án SaaS Hiện đại, Tốc độ cao và Tối giản cho các đội ngũ công nghệ.",
};

const beVietNamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietNamPro.variable} font-sans`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
        {children}
      </body>
    </html>
  );
}

