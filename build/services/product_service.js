import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { product, productSchema } from '../schema/product';
import { category } from '../schema/category';
export const productService = {
    async create(data) {
        const parsing = productSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.insert(product).values(data);
        return result;
    },
    async findAll() {
        const users = await db
            .select()
            .from(product)
            .leftJoin(category, eq(product.categoryId, category.id));
        return users;
    },
    async find(id) {
        const users = await db
            .select()
            .from(product)
            .where(eq(product.id, id))
            .leftJoin(category, eq(product.categoryId, category.id));
        if (!users.length) {
            throw boom.notFound();
        }
        return users;
    },
    async edit(data) {
        const parsing = productSchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.update(product).set(data).where(eq(product.id, data.id));
        return result;
    },
    async delete(id) {
        const result = await db.delete(product).where(eq(product.id, id));
        if (!result.rowCount) {
            throw boom.notFound();
        }
        return result;
    },
};
export default productService;
//# sourceMappingURL=product_service.js.map