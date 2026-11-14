"use client";

import { Badge } from "@/components/ui/badge";
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
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  CheckCircle2,
  Kanban,
  Loader2,
  Plus,
  Timer,
  Trash2,
} from "lucide-react";
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

  // Wizard state: 1: Template | 2: Details & Key | 3: Column Configuration
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [isKeyEdited, setIsKeyEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Default columns for Step 3
  const [columns, setColumns] = useState([
    { id: "todo", name: "To Do", key: "todo", color: "#64748b" },
    { id: "in_progress", name: "In Progress", key: "in_progress", color: "#3b82f6" },
    { id: "done", name: "Done", key: "done", color: "#10b981" },
  ]);

  // 1. Suggest project key from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (errorMessage) setErrorMessage("");

    if (!isKeyEdited) {
      setKey(generateKey(newName));
    }
  };

  // 2. Stop auto-suggesting once user edits key manually
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setKey(newKey);
    if (errorMessage) setErrorMessage("");
    setIsKeyEdited(true);

    if (!newKey.trim()) {
      setIsKeyEdited(false);
    }
  };

  // 3. Reset form on dialog close
  const resetForm = () => {
    setStep(1);
    setName("");
    setKey("");
    setIsKeyEdited(false);
    setErrorMessage("");
    setColumns([
      { id: "todo", name: "To Do", key: "todo", color: "#64748b" },
      { id: "in_progress", name: "In Progress", key: "in_progress", color: "#3b82f6" },
      { id: "done", name: "Done", key: "done", color: "#10b981" },
    ]);
  };

  // 4. Handle open/close
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  // 5. Submit to Server Action
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!orgSlug) {
      setErrorMessage("Workspace not found");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const res = await createProjectAction(orgSlug as string, {
      name,
      key,
      column: columns,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMessage(res.error);
      return;
    }

    resetForm();
    onOpenChange(false);
    if (res?.project?.id) {
      router.push(`/w/${orgSlug}/projects/${res.project.id}`);
    }
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-medium text-muted-foreground">
              Step {step} of 3:{" "}
              {step === 1
                ? "Choose template"
                : step === 2
                  ? "Project details"
                  : "Configure columns"}
            </span>
          </div>

          <DialogTitle>
            {step === 1 && "Choose a template"}
            {step === 2 && "Name and project key"}
            {step === 3 && "Configure Kanban columns"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              "Start with a pre-configured workflow designed for your team."}
            {step === 2 &&
              "Create a project to track tasks and issues with a unique identifier."}
            {step === 3 &&
              "Columns represent each stage of work progress across your board."}
          </DialogDescription>
        </DialogHeader>

        {/* STEP 1: TEMPLATE SELECTION */}
        {step === 1 && (
          <div className="space-y-3 py-1">
            {/* Kanban Card (Selected) */}
            <div className="relative rounded-xl border-2 border-primary bg-primary/[0.03] p-4 shadow-xs transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Kanban className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        Kanban
                      </span>
                      <Badge
                        variant="blue"
                        shape="pill"
                        size="sm"
                        className="font-normal"
                      >
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Visualize and manage continuous workflow across status
                      columns. Optimized for flexible delivery.
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              </div>

              {/* Mini 3-column Preview */}
              <div className="mt-3.5 pt-3 border-t border-border/60">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5 font-medium">
                  <span>Kanban board preview</span>
                  <span className="text-[10px]">3 default columns</span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-muted/40 p-2 rounded-lg border border-border/40">
                  {/* Column 1: To Do */}
                  <div className="bg-background rounded-md p-1.5 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-slate-500" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        To Do
                      </span>
                    </div>
                    <div className="h-5 rounded bg-muted/70 px-1.5 flex items-center">
                      <span className="h-1.5 w-8 rounded bg-muted-foreground/30" />
                    </div>
                    <div className="h-5 rounded bg-muted/50 px-1.5 flex items-center">
                      <span className="h-1.5 w-6 rounded bg-muted-foreground/20" />
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-background rounded-md p-1.5 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        In Progress
                      </span>
                    </div>
                    <div className="h-5 rounded bg-blue-500/10 border border-blue-500/20 px-1.5 flex items-center">
                      <span className="h-1.5 w-9 rounded bg-blue-500/40" />
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="bg-background rounded-md p-1.5 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        Done
                      </span>
                    </div>
                    <div className="h-5 rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 flex items-center">
                      <span className="h-1.5 w-7 rounded bg-emerald-500/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrum Card (Disabled) */}
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3.5 opacity-60 cursor-not-allowed select-none transition-opacity">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Timer className="size-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">
                        Scrum
                      </span>
                      <Badge
                        variant="outline"
                        shape="pill"
                        size="sm"
                        className="text-muted-foreground text-[10px] font-normal"
                      >
                        Coming soon
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Plan work in fixed sprint cycles, manage backlogs, and track delivery progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bug Tracking Card (Disabled) */}
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3.5 opacity-60 cursor-not-allowed select-none transition-opacity">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Bug className="size-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">
                        Bug Tracking
                      </span>
                      <Badge
                        variant="outline"
                        shape="pill"
                        size="sm"
                        className="text-muted-foreground text-[10px] font-normal"
                      >
                        Coming soon
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Capture, prioritize by severity, and resolve issues and defects quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT DETAILS */}
        {step === 2 && (
          <div className="space-y-4 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="project-name">Project name</Label>
              <Input
                id="project-name"
                placeholder="e.g., Website Redesign, Mobile App..."
                value={name}
                onChange={handleNameChange}
                autoComplete="off"
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="project-key">Project key</Label>
              <Input
                id="project-key"
                placeholder="e.g., PRJ, WEB..."
                maxLength={5}
                className="uppercase"
                value={key}
                onChange={handleKeyChange}
                autoComplete="off"
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                2-5 uppercase characters, used as a prefix for issue identifiers
                (e.g., {key ? `${key}-1` : "PRJ-1"}).
              </p>
            </div>
            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
          </div>
        )}

        {/* STEP 3: CONFIGURE COLUMNS */}
        {step === 3 && (
          <div className="space-y-3 py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Board columns ({columns.length} columns)
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => {
                  const newId = `col_${Date.now()}`;
                  setColumns((prev) => [
                    ...prev,
                    {
                      id: newId,
                      name: `Column ${prev.length + 1}`,
                      key: newId,
                      color: "#8b5cf6",
                    },
                  ]);
                }}
              >
                <Plus className="size-3.5" />
                Add column
              </Button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {columns.map((col, index) => (
                <div
                  key={col.id}
                  className="flex items-center gap-2 rounded-lg border border-border p-2 bg-muted/20"
                >
                  <span
                    className="size-3 rounded-full shrink-0"
                    style={{ backgroundColor: col.color }}
                  />
                  <Input
                    value={col.name}
                    onChange={(e) => {
                      const updated = [...columns];
                      updated[index].name = e.target.value;
                      setColumns(updated);
                    }}
                    className="h-8 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
                    disabled={columns.length <= 2}
                    onClick={() => {
                      if (columns.length > 2) {
                        setColumns(columns.filter((_, i) => i !== index));
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="pt-2 flex items-center justify-between sm:justify-between w-full">
          <div>
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
                disabled={loading}
                className="gap-1.5"
              >
                <ArrowLeft className="size-3.5" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (step === 2 && !name.trim()) {
                    setErrorMessage("Please enter a project name");
                    return;
                  }
                  setStep((prev) => (prev + 1) as 2 | 3);
                }}
                className="gap-1.5"
              >
                Continue
                <ArrowRight className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loader2 className="size-4 animate-spin mr-1.5" />}
                Create project
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
