import { serial, text, pgTable, numeric } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { category } from './category';
export const product = pgTable('product', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: numeric('price').notNull(),
    image: text('image').notNull(),
    categoryId: serial('categoryId')
        .notNull()
        .references(() => category.id),
    price_min: numeric('price_min').notNull(),
    price_max: numeric('price_max').notNull(),
    limit: numeric('limit').notNull(),
    offset: numeric('offset').notNull(),
});
export const productSchema = createInsertSchema(product);
//# sourceMappingURL=product.js.map