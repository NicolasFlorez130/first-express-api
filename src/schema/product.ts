import { InferModel } from 'drizzle-orm';
import { serial, text, pgTable, numeric, decimal, doublePrecision } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { category } from './category';

export const product = pgTable('product', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   description: text('description').notNull(),
   price: doublePrecision('price').notNull(),
   image: text('image').notNull(),
   categoryId: serial('categoryId')
      .notNull()
      .references(() => category.id),
});

export type IProduct = InferModel<typeof product>;
export type NewProduct = InferModel<typeof product, 'insert'>;

export const productSchema = createInsertSchema(product);
