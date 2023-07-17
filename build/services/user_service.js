import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user, userSchema } from '../schema/user';
import boom from '@hapi/boom';
import { customer } from '../schema/customer';
import { convertErrorIntoString } from '../utils/validation_utils';
export const userService = {
    async create(data) {
        const parsing = userSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.insert(user).values(data);
        return result;
    },
    async findAll() {
        const users = await db.select().from(user).leftJoin(customer, eq(user.id, customer.userId));
        return users;
    },
    async find(id) {
        const users = await db
            .select()
            .from(user)
            .where(eq(user.id, id))
            .leftJoin(customer, eq(user.id, customer.userId));
        if (!users.length) {
            throw boom.notFound();
        }
        return users;
    },
    async edit(data) {
        const parsing = userSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        data.createdAt = undefined;
        const result = await db.update(user).set(data).where(eq(user.id, data.id));
        return result;
    },
    async delete(id) {
        const result = await db.delete(user).where(eq(user.id, id));
        if (!result.rowCount) {
            throw boom.notFound();
        }
        return result;
    },
};
export default userService;
//# sourceMappingURL=user_service.js.map