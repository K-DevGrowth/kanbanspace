import { db } from "@/db/client";

export async function listProjects(orgId: string) {
  return db.query.project.findMany({
    where: {
      organizationId: orgId,
      archivedAt: { isNull: true },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectById(orgId: string, projectId: string) {
  return db.query.project.findFirst({
    where: {
      organizationId: orgId,
      id: projectId,
      archivedAt: { isNull: true },
    },
  });
}
