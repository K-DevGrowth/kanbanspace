"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createProjectAction } from "../actions";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateKey(name: string): string {
  const clean = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();

  if (!clean) return "";

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .map((w) => w[0])
      .join("")
      .slice(0, 5)
      .toUpperCase();
  }

  return clean.slice(0, 4).toUpperCase();
}

export function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const { orgSlug } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [isKeyEdited, setIsKeyEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Khi người dùng nhập tên dự án -> tự gợi ý mã Key
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (errorMessage) setErrorMessage("");

    if (!isKeyEdited) {
      setKey(generateKey(newName));
    }
  };

  // 2. Khi người dùng tự tay nhập mã Key -> ngưng gợi ý tự động
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setKey(newKey);
    if (errorMessage) setErrorMessage("");
    setIsKeyEdited(true);

    if (!newKey.trim()) {
      setIsKeyEdited(false);
    }
  };

  // 3. Xóa trắng form khi đóng dialog
  const resetForm = () => {
    setName("");
    setKey("");
    setIsKeyEdited(false);
    setErrorMessage("");
  };

  // 4. Xử lý khi đóng/mở dialog
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  // 5. Gửi dữ liệu lên Server Action
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!orgSlug) {
      setErrorMessage("Không tìm thấy không gian làm việc");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const res = await createProjectAction(orgSlug as string, { name, key });

    setLoading(false);

    if (res?.error) {
      setErrorMessage(res.error);
      return;
    }

    resetForm();
    onOpenChange(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo dự án mới</DialogTitle>
          <DialogDescription>
            Tạo dự án để quản lý các công việc và nhiệm vụ của nhóm bạn.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">Tên dự án</Label>
            <Input
              id="project-name"
              placeholder="Ví dụ: Thiết kế Website, Ứng dụng Di động..."
              value={name}
              onChange={handleNameChange}
              autoComplete="off"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-key">Mã dự án (Key)</Label>
            <Input
              id="project-key"
              placeholder="Ví dụ: PRJ, WEB..."
              maxLength={5}
              className="uppercase"
              value={key}
              onChange={handleKeyChange}
              autoComplete="off"
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Mã từ 2-5 ký tự viết hoa, dùng làm tiền tố định danh công việc
              (VD: WEB-1).
            </p>
          </div>
          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin mr-1.5" />}
              Tạo dự án
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
