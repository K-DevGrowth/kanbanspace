"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { GoogleButton } from "@/components/auth/google-button";

const AUTH_ERRORS: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Email hoặc mật khẩu không hợp lệ.",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (error) {
        setError(
          (error.code && AUTH_ERRORS[error.code]) ?? "Đăng nhập thất bại",
        );
        return;
      }

      router.push("/w");
      router.refresh();
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted flex items-center justify-center p-12">
          <div className="max-w-md space-y-4 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <FolderKanban className="size-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">KanbanSpace</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nền tảng quản lý dự án trực quan, tốc độ cao và tối giản dành cho các đội ngũ công nghệ hiện đại.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FolderKanban className="size-4" />
            </div>
            KanbanSpace
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
              <FieldGroup>
                <div className="flex flex-start">
                  <Button variant="ghost" size="sm" className="-ml-3">
                    <Link href="/" className="flex">
                      <ArrowLeft className="size-4" />
                      Quay lại trang chủ
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">
                    Đăng nhập vào tài khoản
                  </h1>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <FieldDescription className="text-red-500">
                  {error}
                </FieldDescription>
                <Field>
                  <Button type="submit">
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                </Field>
                <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
                <Field>
                  <GoogleButton />
                  <FieldDescription className="text-center">
                    Chưa có tài khoản?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Đăng ký
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
