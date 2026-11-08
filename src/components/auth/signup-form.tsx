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
import React, { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const AUTH_ERRORS: Record<string, string> = {
    USER_ALREADY_EXISTS: "Email này đã được đăng ký.",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
      "Email này đã được đăng ký. Vui lòng dùng email khác.",
    INVALID_EMAIL: "Email không hợp lệ.",
    PASSWORD_TOO_SHORT: "Mật khẩu phải có ít nhất 8 ký tự.",
    PASSWORD_TOO_LONG: "Mật khẩu quá dài.",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.signUp.email({
        name: fullname,
        email: email,
        password: password,
      });

      if (error) {
        setError((error.code && AUTH_ERRORS[error.code]) ?? "Đăng ký thất bại");
        return;
      }

      router.push("/w");
      router.refresh();
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4", className)}
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
          <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Họ tên</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </Field>
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
        <Field aria-invalid>
          <Field className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Xác nhận mật khẩu
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Field>
          </Field>
          <FieldDescription className="text-red-500">{error}</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Đăng ký"}
          </Button>
        </Field>
        <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
        <GoogleButton />
        <FieldDescription className="px-6 text-center">
          Bạn đã có tài khoản? <Link href="/signin">Đăng nhập</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
