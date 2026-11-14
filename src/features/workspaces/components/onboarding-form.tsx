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

    if (!isSlugEdited) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    if (errorMessage) setErrorMessage("");
    setIsSlugEdited(true);

    if (newSlug.trim() === "") {
      setIsSlugEdited(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const finalSlug = (slug.trim() || generateSlug(name)).trim();
    if (!name.trim() || !finalSlug) {
      setErrorMessage("Please enter a valid workspace name and URL slug");
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
            ? "This workspace URL is already taken, please choose another"
            : "An error occurred, please try again",
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
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Workspace name */}
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-xs font-medium text-foreground/80"
        >
          Workspace name
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="off"
          placeholder="e.g., Engineering Team, Acme Corp..."
          className="h-10 rounded-lg border-input bg-background px-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
          required
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* URL slug */}
      <div className="space-y-2">
        <Label htmlFor="url" className="text-xs font-medium text-foreground/80">
          Workspace URL
        </Label>
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 text-sm text-muted-foreground select-none font-medium">
            w/
          </span>
          <Input
            id="url"
            name="url"
            autoComplete="off"
            placeholder="engineering-team"
            className="h-10 rounded-lg border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
            required
            value={slug}
            onChange={handleSlugChange}
          />
        </div>
        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-3">
        <Button
          type="submit"
          className="h-10 w-full rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-xs hover:bg-primary/90 transition-all active:scale-[0.99]"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create workspace"
          )}
        </Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
