import { db } from "@/db/client";
import { project } from "@/db/schema";

export async function createProject(data: {
  organizationId: string;
  name: string;
  key: string;
  description?: string | null;
  createdBy: string;
}) {
  const existing = await db.query.project.findFirst({
    where: {
      organizationId: data.organizationId,
      key: data.key,
    },
  });

  if (existing)
    throw new Error(`Mã dự án ${existing.key} đã tồn tại trong không gian này`);

  const [newProject] = await db
    .insert(project)
    .values({
      id: crypto.randomUUID(),
      organizationId: data.organizationId,
      name: data.name,
      key: data.key,
      description: data.description ?? null,
      createdBy: data.createdBy,
    })
    .returning();

  return newProject;
}
