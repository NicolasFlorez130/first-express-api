import { and, eq, gt, lt } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { NewProduct, product, productSchema } from '../schema/product';
import { category } from '../schema/category';

export const productService = {
   async create(data: NewProduct) {
      const parsing = productSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         data.id = undefined;

         const result = await db.insert(product).values(data);

         return result;
      }
   },

   async findAll(offset: number, limit: number, min: number, max: number) {
      const users = await db
         .select()
         .from(product)
         .leftJoin(category, eq(product.categoryId, category.id))
         .where(and(gt(product.price, min), lt(product.price, max)))
         .limit(limit)
         .offset(offset);

      return users;
   },

   async find(id: number) {
      const users = await db
         .select()
         .from(product)
         .where(eq(product.id, id))
         .leftJoin(category, eq(product.categoryId, category.id));

      if (!users.length) {
         throw boom.notFound();
      } else {
         return users.at(0);
      }
   },

   async edit(data: NewProduct) {
      const parsing = productSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         const result = await db
            .update(product)
            .set(parsing.data)
            .where(eq(product.id, parsing.data.id));

         if (!result.rowCount) {
            throw boom.notFound();
         } else {
            return result;
         }
      }
   },

   async delete(id: number) {
      const result = await db.delete(product).where(eq(product.id, id));

      if (!result.rowCount) {
         throw boom.notFound();
      } else {
         return result;
      }
   },
};

export default productService;
