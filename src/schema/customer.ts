import { InferModel } from 'drizzle-orm';
import { serial, text, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { user } from './user';
import { z } from 'zod';

export const customer = pgTable('customer', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   lastName: text('lastName').notNull(),
   phone: text('phone').notNull(),
   userId: serial('userId')
      .notNull()
      .references(() => user.id),
   email: text('email').notNull(),
   password: text('password').notNull(),
});

export type ICustomer = InferModel<typeof customer>;
export type NewCustomer = InferModel<typeof customer, 'insert'>;

export const customerSchema = createInsertSchema(customer, {
   phone: z
      .string()
      .regex(
         new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
         `These are the accepted formats: 123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, +91 (123) 456-7890`
      ),
   email: z.string().email(),
   password: z.string().min(6),
});
