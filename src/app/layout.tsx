import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KanbanSpace | Nền tảng Quản lý Dự án SaaS",
  description: "Nền tảng Quản lý Dự án SaaS Hiện đại, Tốc độ cao và Tối giản cho các đội ngũ công nghệ.",
};

const beVietNamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietNamPro.variable} ${geistMono.variable} font-sans`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/15 selection:text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
