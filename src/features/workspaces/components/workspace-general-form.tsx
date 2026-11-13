"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface WorkspaceGeneralFormProps {
  org: {
    id: string;
    name: string;
    slug: string;
  };
  role?: string;
}

function validateSlug(value: string): string {
  if (!value.trim()) {
    return "Đường dẫn không được để trống.";
  }
  if (!/^[a-z0-9-]+$/.test(value)) {
    return "Đường dẫn chỉ được chứa chữ thường (a-z), số (0-9) và dấu gạch ngang (-).";
  }
  return "";
}

export default function WorkspaceGeneralForm({
  org,
  role,
}: WorkspaceGeneralFormProps) {
  const [name, setName] = useState(org.name);
  const [slug, setSlug] = useState(org.slug);
  const [slugError, setSlugError] = useState("");
  const router = useRouter();

  const isOwner = role === "owner";
  const canEdit = role === "owner" || role === "admin";

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSlug(val);
    setSlugError(validateSlug(val));
  }

  async function handleUpdate() {
    const error = validateSlug(slug);
    if (error) {
      setSlugError(error);
      return;
    }

    if (slug.startsWith("-") || slug.endsWith("-")) {
      setSlugError("Đường dẫn không được bắt đầu hoặc kết thúc bằng dấu gạch ngang.");
      return;
    }

    const { data } = await authClient.organization.update({
      data: {
        name: name.trim(),
        slug: slug.trim(),
      },
      organizationId: org.id,
    });

    if (data?.slug) {
      router.push(`/w/${data.slug}/settings`);
    }
    router.refresh();
  }

  async function handleDelete() {
    await authClient.organization.delete({
      organizationId: org.id,
    });

    router.push(`/w`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* 1. Thông tin chung của Không gian làm việc */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Thông tin không gian làm việc
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Tên hiển thị và đường dẫn truy cập của không gian làm việc hiện tại.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-sm font-medium">
              Tên không gian làm việc
            </Label>
            <Input
              id="workspace-name"
              placeholder="Nhập tên không gian làm việc..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!canEdit}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspace-url" className="text-sm font-medium">
              Đường dẫn truy cập (URL)
            </Label>
            <div className="flex max-w-md">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground select-none font-mono">
                w/
              </span>
              <Input
                id="workspace-url"
                className={`rounded-l-none font-mono text-sm ${slugError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder="slug-khong-gian"
                value={slug}
                onChange={handleSlugChange}
                disabled={!canEdit}
              />
            </div>
            {slugError ? (
              <p className="text-xs font-medium text-destructive">{slugError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Đường dẫn duy nhất để các thành viên truy cập vào không gian làm việc.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-3">
          <p className="text-xs text-muted-foreground">
            {canEdit
              ? "Độ dài tên khuyến nghị từ 2 đến 50 ký tự."
              : "* Bạn chỉ có quyền xem, chỉ Quản trị viên mới có thể chỉnh sửa."}
          </p>
          {canEdit && (
            <Button
              type="button"
              size="sm"
              onClick={handleUpdate}
              disabled={!!slugError || !name.trim() || !slug.trim()}
            >
              Lưu thay đổi
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* 2. Khu vực nguy hiểm (Danger Zone) chuẩn SaaS - Chỉ hiển thị cho Chủ sở hữu (Owner) */}
      {isOwner && (
        <Card className="border-destructive/30 overflow-hidden shadow-none">
          <CardHeader className="border-b border-destructive/15 bg-destructive/[0.03] py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" />
              <CardTitle className="text-base font-semibold text-destructive">
                Khu vực nguy hiểm
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Các hành động tại đây mang tính vĩnh viễn và không thể khôi phục sau khi thực hiện.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Xóa không gian làm việc này
                </p>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Xóa vĩnh viễn không gian làm việc cùng toàn bộ dự án, bảng việc,
                  tài liệu và dữ liệu thành viên. Thao tác này không thể hoàn tác.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                    >
                      <Trash2 className="size-4 mr-1.5" />
                      Xóa không gian làm việc
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn xóa không gian này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Mọi dự án, bảng việc và dữ liệu
                      thành viên của <strong>{org.name}</strong> sẽ bị xóa vĩnh viễn
                      khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Xác nhận xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
