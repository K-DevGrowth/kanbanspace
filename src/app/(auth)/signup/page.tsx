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
import React, { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { GoogleButton } from "@/components/auth/google-button";

const AUTH_ERRORS: Record<string, string> = {
  USER_ALREADY_EXISTS: "This email is already registered.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "This email is already registered. Please use another email.",
  INVALID_EMAIL: "Invalid email address.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
  PASSWORD_TOO_LONG: "Password is too long.",
};

export default function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
        setError((error.code && AUTH_ERRORS[error.code]) ?? "Sign up failed");
        return;
      }

      router.push("/w");
      router.refresh();
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
              Visual, high-speed, and minimal project management designed for modern software teams.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 md:p-6">
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
            <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4")}>
              <FieldGroup>
                <div className="flex flex-start">
                  <Button variant="ghost" size="sm" className="-ml-3">
                    <Link href="/" className="flex items-center gap-1.5">
                      <ArrowLeft className="size-4" />
                      Back to home
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Create an account</h1>
                </div>
                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
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
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field aria-invalid>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
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
                        Confirm password
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
                  <FieldDescription className="text-destructive">
                    {error}
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit">
                    {loading ? <Loader2 className="animate-spin" /> : "Sign up"}
                  </Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <GoogleButton />
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/signin" className="underline underline-offset-4">Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
