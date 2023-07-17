import { serial, pgTable, numeric } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { customer } from './customer';
import { product } from './product';
export const order = pgTable('order', {
    id: serial('id').primaryKey(),
    customerId: serial('customerId')
        .notNull()
        .references(() => customer.id),
    productId: serial('productId')
        .notNull()
        .references(() => product.id),
    amount: numeric('amount').notNull(),
});
export const orderSchema = createInsertSchema(order);
//# sourceMappingURL=order.js.map