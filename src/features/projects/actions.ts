"use server";

import { assertCan } from "@/lib/auth/permissions";
import { requireMember } from "@/lib/auth/session";
import { createProject } from "./service";
import { revalidatePath } from "next/cache";

export async function createProjectAction(
  orgSlug: string,
  formData: { name: string; key: string; description?: string },
) {
  try {
    const { session, org, role } = await requireMember(orgSlug);
    assertCan(role, { project: ["create"] });

    const name = formData.name.trim();
    const key = formData.key.trim().toUpperCase();

    if (!name) return { error: "Vui lòng nhập tên dự án" };
    if (!/^[A-Z][A-Z0-9]{1,4}$/.test(key)) {
      return {
        error: "Mã dự án phải gồm 2-5 ký tự in hoa hoặc số (VD: PRJ, WEB)",
      };
    }

    const newProject = await createProject({
      organizationId: org.id,
      name,
      key,
      description: formData.description?.trim(),
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
