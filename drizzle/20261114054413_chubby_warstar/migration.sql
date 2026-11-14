ALTER TABLE "project" ADD COLUMN "template" text DEFAULT 'kanban' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "columns" jsonb;