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
