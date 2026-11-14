import { db } from "@/db/client";
import { project, ProjectColumn } from "@/db/schema";

export async function createProject(data: {
  organizationId: string;
  name: string;
  key: string;
  description?: string | null;
  template?: string;
  columns?: ProjectColumn[];
  createdBy: string;
}) {
  const existing = await db.query.project.findFirst({
    where: {
      organizationId: data.organizationId,
      key: data.key,
    },
  });

  if (existing)
    throw new Error(`Project key ${existing.key} already exists in this workspace`);

  const [newProject] = await db
    .insert(project)
    .values({
      id: crypto.randomUUID(),
      organizationId: data.organizationId,
      name: data.name,
      key: data.key,
      description: data.description ?? null,
      template: data.template,
      columns: data.columns,
      createdBy: data.createdBy,
    })
    .returning();

  return newProject;
}
