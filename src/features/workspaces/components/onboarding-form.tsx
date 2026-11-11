"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^0-9a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const OnboardingForm = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (errorMessage) setErrorMessage("");

    // Nếu người dùng chưa từng chủ động sửa slug thì tự động cập nhật slug theo name
    if (!isSlugEdited) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    if (errorMessage) setErrorMessage("");
    // Đánh dấu người dùng đã tự tay sửa slug
    setIsSlugEdited(true);

    // Nếu người dùng xóa sạch slug thì bật lại chế độ tự sinh slug theo name hiện tại
    if (newSlug.trim() === "") {
      setIsSlugEdited(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const finalSlug = (slug.trim() || generateSlug(name)).trim();
    if (!name.trim() || !finalSlug) {
      setErrorMessage("Vui lòng nhập tên và đường dẫn hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.organization.create({
        name: name.trim(),
        slug: finalSlug,
      });

      if (error) {
        setErrorMessage(
          error.code === "ORGANIZATION_ALREADY_EXISTS"
            ? "Đường dẫn này đã được dùng, hãy thử đường dẫn khác"
            : "Có lỗi xảy ra, vui lòng thử lại",
        );
        return;
      }

      router.push(`/w/${data.slug}`);
      router.refresh();
      setName("");
      setSlug("");
      setIsSlugEdited(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Tên không gian làm việc */}
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-xs font-medium text-foreground/80"
        >
          Tên không gian làm việc
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="off"
          placeholder="VD: Nhóm Công Nghệ, Acma Corp..."
          className="h-10 rounded-lg border-input bg-background px-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
          required
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* Đường dẫn URL */}
      <div className="space-y-2">
        <Label htmlFor="url" className="text-xs font-medium text-foreground/80">
          Đường dẫn truy cập
        </Label>
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 text-sm text-muted-foreground select-none font-medium">
            w/
          </span>
          <Input
            id="url"
            name="url"
            autoComplete="off"
            placeholder="nhom-cong-nghe"
            className="h-10 rounded-lg border-input bg-background pl-[32px] pr-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
            required
            value={slug}
            onChange={handleSlugChange}
          />
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>

      {/* Nút hành động */}
      <div className="pt-3">
        <Button
          type="submit"
          className="h-10 w-full rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-xs hover:bg-primary/90 transition-all active:scale-[0.99]"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Tạo không gian làm việc"
          )}
        </Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
