"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Layers, Loader2 } from "lucide-react";
import { GoogleButton } from "@/components/auth/google-button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { OtpForm } from "./otp-form";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    setLoading(false);

    if (error) {
      setError("Không gửi được mã, vui lòng thử lại");
      return;
    }

    setStep("otp");
  }

  if (step === "otp") {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <OtpForm email={email} onBack={() => setStep("email")} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
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
              <span className="sr-only">KanbanSpace</span>
            </a>
            <h1 className="text-xl font-bold">Tạo tài khoản KanbanSpace</h1>
          </div>
          <Field>
            <Input
              id="email"
              type="email"
              placeholder="k@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </Field>
          <div className="grid grid-cols-2 items-center gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-9 gap-2 text-xs font-medium shadow-xs"
            >
              {loading && <Loader2 className="animate-spin h-4 w-4 shrink-0" />}
              <span>{loading ? "Đang gửi..." : "Đăng ký"}</span>
            </Button>
            <GoogleButton className="w-full h-9" />
          </div>
          <FieldDescription>
            Đã có tài khoản? <a href="#">Đăng nhập</a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
