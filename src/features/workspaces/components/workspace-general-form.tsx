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
    return "Workspace slug cannot be empty.";
  }
  if (!/^[a-z0-9-]+$/.test(value)) {
    return "Slug can only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).";
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
      setSlugError("Slug cannot start or end with a hyphen.");
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
      {/* 1. General workspace details */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Workspace Details
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Display name and access URL for this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-sm font-medium">
              Workspace name
            </Label>
            <Input
              id="workspace-name"
              placeholder="Enter workspace name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!canEdit}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspace-url" className="text-sm font-medium">
              Workspace URL
            </Label>
            <div className="flex max-w-md">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground select-none font-mono">
                w/
              </span>
              <Input
                id="workspace-url"
                className={`rounded-l-none font-mono text-sm ${slugError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder="workspace-slug"
                value={slug}
                onChange={handleSlugChange}
                disabled={!canEdit}
              />
            </div>
            {slugError ? (
              <p className="text-xs font-medium text-destructive">{slugError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                A unique URL slug used by team members to access your workspace.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-3">
          <p className="text-xs text-muted-foreground">
            {canEdit
              ? "Recommended name length is between 2 and 50 characters."
              : "* View only. Only administrators can make changes."}
          </p>
          {canEdit && (
            <Button
              type="button"
              size="sm"
              onClick={handleUpdate}
              disabled={!!slugError || !name.trim() || !slug.trim()}
            >
              Save changes
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* 2. Danger Zone */}
      {isOwner && (
        <Card className="border-destructive/30 overflow-hidden shadow-none">
          <CardHeader className="border-b border-destructive/15 bg-destructive/[0.03] py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" />
              <CardTitle className="text-base font-semibold text-destructive">
                Danger Zone
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              These actions are permanent and cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Delete this workspace
                </p>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Permanently delete this workspace and all associated projects, tasks,
                  and member data. This action cannot be undone.
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
                      Delete workspace
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this workspace?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All projects, tasks, and data belonging
                      to <strong>{org.name}</strong> will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Confirm deletion
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
