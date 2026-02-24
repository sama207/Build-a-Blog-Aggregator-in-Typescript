ALTER TABLE "feeds" DROP CONSTRAINT "feeds_name_unique";--> statement-breakpoint
ALTER TABLE "feeds" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "feeds" ALTER COLUMN "url" SET NOT NULL;