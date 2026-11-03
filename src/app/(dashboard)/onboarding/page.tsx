"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function NameWorkspace() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^0-9a-z]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const { data, error } = await authClient.organization.create({
      name,
      slug,
    });

    if (error) {
      setErrorMessage(
        error.code === "ORGANIZATION_ALREADY_EXISTS"
          ? "Tên này đã được dùng, hãy thử tên khác"
          : "Có lỗi xảy ra, vui lòng thử lại",
      );
      return;
    }

    router.push(`/${data.slug}`);
  };

  return (
    // Nền mờ giống overlay của modal
    <div className="min-h-dvh flex items-center justify-center bg-slate-400/60 p-4">
      <Card className="w-full max-w-6xl gap-0 p-0 rounded-3xl border-0 shadow-xl overflow-hidden">
        {/* Cột trái: form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between p-12 gap-10"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight">
                Đặt tên cho workspace
              </h2>
              <p className="text-muted-foreground">
                Đây là nơi bạn giúp nhóm theo dõi tiến độ, giữ mọi thứ gọn gàng
                và quản lý công việc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspace">Đặt tên cho workspace của bạn</Label>
              <Input
                id="workspace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhóm phần mềm của tôi"
                className="h-14 text-base"
              />
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="h-14 px-6 text-base font-semibold">
              Bắt đầu
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
