ALTER TABLE "product" ALTER COLUMN "price" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "price_min";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "price_max";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "limit";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "offset";