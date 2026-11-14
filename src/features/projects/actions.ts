"use server";

import { assertCan } from "@/lib/auth/permissions";
import { requireMember } from "@/lib/auth/session";
import { createProject } from "./service";
import { revalidatePath } from "next/cache";
import { ProjectColumn } from "@/db/schema";

export async function createProjectAction(
  orgSlug: string,
  formData: {
    name: string;
    key: string;
    description?: string;
    column?: ProjectColumn[];
  },
) {
  try {
    const { session, org, role } = await requireMember(orgSlug);
    assertCan(role, { project: ["create"] });

    const name = formData.name.trim();
    const key = formData.key.trim().toUpperCase();
    const columns = formData.column;

    if (!name) return { error: "Please enter a project name" };
    if (!/^[A-Z][A-Z0-9]{1,4}$/.test(key)) {
      return {
        error: "Project key must be 2-5 uppercase characters or numbers (e.g., PRJ, WEB)",
      };
    }
    if (columns && columns.length < 2) {
      return { error: "At least 2 columns are required" };
    }

    const newProject = await createProject({
      organizationId: org.id,
      name,
      key,
      description: formData.description?.trim(),
      columns: formData.column,
      createdBy: session.user.id,
    });

    revalidatePath(`/w`, "layout");
    revalidatePath(`/w/${orgSlug}`);
    revalidatePath(`/w/${orgSlug}`, "layout");

    return { success: true, project: newProject };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return undefined;
  }
}
