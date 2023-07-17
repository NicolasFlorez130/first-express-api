import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').notNull(),
    role: text('role', { enum: ['admin', 'user'] }).notNull(),
});
export const userSchema = createInsertSchema(user, {
    email: z.string().email(),
    password: z.string().min(6),
});
//# sourceMappingURL=user.js.map