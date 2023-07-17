import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { order, orderSchema } from '../schema/order';
import { customer } from '../schema/customer';
import { product } from '../schema/product';
export const orderService = {
    async create(data) {
        const parsing = orderSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.insert(order).values(data);
        return result;
    },
    async findAll() {
        const users = await db
            .select()
            .from(order)
            .innerJoin(customer, eq(order.customerId, customer.id))
            .innerJoin(product, eq(order.productId, product.id));
        return users;
    },
    async find(id) {
        const users = await db
            .select()
            .from(order)
            .where(eq(order.id, id))
            .innerJoin(customer, eq(order.customerId, customer.id))
            .innerJoin(product, eq(order.productId, product.id));
        if (!users.length) {
            throw boom.notFound();
        }
        return users;
    },
    async edit(data) {
        const parsing = orderSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.update(order).set(data).where(eq(order.id, data.id));
        return result;
    },
    async delete(id) {
        const result = await db.delete(order).where(eq(order.id, id));
        if (!result.rowCount) {
            throw boom.notFound();
        }
        return result;
    },
};
export default orderService;
//# sourceMappingURL=order_service.js.map