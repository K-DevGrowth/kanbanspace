"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: CreateWorkspaceDialogProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    if (loading) return;
    setName("");
    setErrorMessage("");
    onOpenChange(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setLoading(true);
    setErrorMessage("");

    const slug = trimmedName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^0-9a-z]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const { data, error } = await authClient.organization.create({
      name: trimmedName,
      slug,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(
        error.code === "ORGANIZATION_ALREADY_EXISTS"
          ? "Tên này đã được dùng, hãy thử tên khác"
          : "Có lỗi xảy ra, vui lòng thử lại",
      );
      return;
    }

    // Đóng dialog và reset form
    setName("");
    onOpenChange(false);

    // Chuyển tới workspace mới
    router.push(`/${data.slug}`);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Tạo không gian làm việc mới</DialogTitle>
            <DialogDescription>
              Đây là nơi bạn giúp nhóm theo dõi tiến độ, giữ mọi thứ gọn gàng và
              quản lý công việc.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="workspace-name">Tên workspace</Label>
            <Input
              id="workspace-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Nhóm phần mềm của tôi"
              disabled={loading}
              autoFocus
            />
            {errorMessage && (
              <p className="text-sm font-medium text-red-500">{errorMessage}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Đang tạo..." : "Tạo workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
