import {
  check,
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { organization, user } from "./auth-schema";
import { ts } from "./helpers";
import { defineRelationsPart, sql } from "drizzle-orm";

export const project = pgTable(
  "project",
  {
    id: uuid("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    key: text("key").notNull(), // "PLN" → mã task PLN-123
    name: text("name").notNull(),
    description: text("description"),
    taskCounter: integer("task_counter").notNull().default(0), // số thứ tự task cuối cùng đã cấp
    archivedAt: ts("archived_at"),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id),
    createdAt: ts("created_at").defaultNow().notNull(),
    updatedAt: ts("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("project_org_key_uidx").on(t.organizationId, t.key),
    uniqueIndex("project_org_id_uidx").on(t.organizationId, t.id),
    index("project_org_archived_idx").on(t.organizationId, t.archivedAt),
    check("project_key_format", sql`${t.key} ~ '^[A-Z][A-Z0-9]{1,4}$'`),
    check("project_name_len", sql`char_length(${t.name}) between 1 and 120`),
  ],
);

export const projectRelations = defineRelationsPart(
  { project, organization, user },
  (r) => ({
    project: {
      organization: r.one.organization({
        from: r.project.organizationId,
        to: r.organization.id,
      }),
      creator: r.one.user({
        from: r.project.createdBy,
        to: r.user.id,
      }),
    },
  }),
);
