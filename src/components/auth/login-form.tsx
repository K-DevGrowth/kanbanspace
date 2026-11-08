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
import { GoogleButton } from "./google-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { ArrowLeft, Loader2 } from "lucide-react";

const AUTH_ERRORS: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Email hoặc mật khẩu không hợp lệ.",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
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
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
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
          <h1 className="text-2xl font-bold">Đăng nhập vào tài khoản</h1>
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
        <FieldDescription className="text-red-500">{error}</FieldDescription>
        <Field>
          <Button type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Đăng nhập"}
          </Button>
        </Field>
        <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
        <Field>
          <GoogleButton />
          <FieldDescription className="text-center">
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Đăng ký
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
