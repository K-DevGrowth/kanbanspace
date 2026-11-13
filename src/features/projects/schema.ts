import type { project } from "@/db/schema/project";

export type ProjectRow = typeof project.$inferSelect;
export type NavProject = Pick<ProjectRow, "id" | "key" | "name"> & {
  emoji?: string | null;
};
