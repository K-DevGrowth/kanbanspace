CREATE TABLE "project" (
	"id" uuid PRIMARY KEY,
	"organization_id" text NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"task_counter" integer DEFAULT 0 NOT NULL,
	"archived_at" timestamp with time zone,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_key_format" CHECK ("key" ~ '^[A-Z][A-Z0-9]{1,4}$'),
	CONSTRAINT "project_name_len" CHECK (char_length("name") between 1 and 120)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "project_org_key_uidx" ON "project" ("organization_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX "project_org_id_uidx" ON "project" ("organization_id","id");--> statement-breakpoint
CREATE INDEX "project_org_archived_idx" ON "project" ("organization_id","archived_at");--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_organization_id_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_created_by_user_id_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id");