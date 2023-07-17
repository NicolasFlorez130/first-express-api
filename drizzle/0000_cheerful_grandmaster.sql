CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"lastName" text NOT NULL,
	"phone" text NOT NULL,
	"userId" serial NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"categoryId" serial NOT NULL,
	"price_min" numeric NOT NULL,
	"price_max" numeric NOT NULL,
	"limit" numeric NOT NULL,
	"offset" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
