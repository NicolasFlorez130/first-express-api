import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { customer, customerSchema } from '../schema/customer';
import { user } from '../schema/user';
export const customerService = {
    async create(data) {
        const parsing = customerSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.insert(customer).values(data);
        return result;
    },
    async findAll() {
        const users = await db.select().from(customer).leftJoin(user, eq(customer.userId, user.id));
        return users;
    },
    async find(id) {
        const users = await db
            .select()
            .from(customer)
            .where(eq(customer.id, id))
            .leftJoin(user, eq(customer.userId, user.id));
        if (!users.length) {
            throw boom.notFound();
        }
        return users;
    },
    async edit(data) {
        const parsing = customerSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.update(customer).set(data).where(eq(customer.id, data.id));
        return result;
    },
    async delete(id) {
        const result = await db.delete(customer).where(eq(customer.id, id));
        if (!result.rowCount) {
            throw boom.notFound();
        }
        return result;
    },
};
export default customerService;
//# sourceMappingURL=customer_service.js.map