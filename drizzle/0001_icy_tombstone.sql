ALTER TABLE "order" ADD COLUMN "customerId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "productId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "amount" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "price" numeric NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "created_at";