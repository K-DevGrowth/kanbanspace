"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth/auth-client";

type OtpFormProps = {
  email: string;
  onBack: () => void;
};

export function OtpForm({ email, onBack }: OtpFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  async function verify(code: string) {
    if (code.length !== 6) return;

    setLoading(true);
    setError(null);

    const { error } = await authClient.signIn.emailOtp({ email, otp: code });

    if (error) {
      setError("Mã không đúng hoặc đã hết hạn");
      setOtp("");
      setLoading(false);
      return;
    }

    router.push("/w");
    router.refresh();
  }

  async function resend() {
    setError(null);
    await authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" });
    setResent(true);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verify(otp);
      }}
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Đổi email</span>
        </button>
      </div>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-bold">Nhập mã xác nhận</h1>
          <FieldDescription>
            Mã 6 số đã được gửi đến <strong>{email}</strong>
          </FieldDescription>
        </div>

        <div className="flex flex-col items-center gap-2">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            onComplete={verify}
            disabled={loading}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button type="submit" disabled={loading || otp.length !== 6}>
          {loading ? "Đang xác nhận..." : "Xác nhận"}
        </Button>

        <FieldDescription className="text-center">
          Chưa nhận được mã?{" "}
          <button type="button" onClick={resend} className="underline">
            Gửi lại
          </button>
          {resent && <span className="ml-1">(đã gửi)</span>}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
