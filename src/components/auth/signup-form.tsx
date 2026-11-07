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
import { ArrowLeft, Layers } from "lucide-react";
import { GoogleButton } from "@/components/auth/google-button";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-2xs group-hover:opacity-90 transition-opacity">
                <Layers className="h-5 w-5" />
              </div>
              <span className="sr-only">Planify</span>
            </a>
            <h1 className="text-xl font-bold">Tạo tài khoản Planify</h1>
            <FieldDescription>
              Đã có tài khoản? <a href="#">Đăng nhập</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Địa chỉ email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="k@example.com"
              required
            />
          </Field>
          <Field>
            <Button type="submit">Đăng ký</Button>
          </Field>
          <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
          <GoogleButton />
        </FieldGroup>
      </form>
      <FieldDescription className="px-4 text-center text-xs text-muted-foreground leading-normal">
        Bằng việc tiếp tục, bạn đồng ý với{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Điều khoản dịch vụ
        </a>{" "}
        và{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Chính sách quyền riêng tư
        </a>{" "}
        của Planify.
      </FieldDescription>
    </div>
  );
}
