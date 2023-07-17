import { InferModel } from 'drizzle-orm';
import { serial, text, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const category = pgTable('category', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   image: text('image').notNull(),
});

export type ICategory = InferModel<typeof category>;
export type NewCategory = InferModel<typeof category, 'insert'>;

export const categorySchema = createInsertSchema(category);
