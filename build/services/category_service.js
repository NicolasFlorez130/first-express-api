import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { category, categorySchema } from '../schema/category';
export const categoryService = {
    async create(data) {
        const parsing = categorySchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.insert(category).values(data);
        return result;
    },
    async findAll() {
        const users = await db.select().from(category);
        return users;
    },
    async find(id) {
        const users = await db.select().from(category).where(eq(category.id, id));
        if (!users.length) {
            throw boom.notFound();
        }
        return users;
    },
    async edit(data) {
        const parsing = categorySchema.safeParse(data);
        if (parsing.success === false) {
            throw boom.badRequest(convertErrorIntoString(parsing));
        }
        data.id = undefined;
        const result = await db.update(category).set(data).where(eq(category.id, data.id));
        return result;
    },
    async delete(id) {
        const result = await db.delete(category).where(eq(category.id, id));
        if (!result.rowCount) {
            throw boom.notFound();
        }
        return result;
    },
};
export default categoryService;
//# sourceMappingURL=category_service.js.map