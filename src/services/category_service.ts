import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { NewCategory, category, categorySchema } from '../schema/category';

export const categoryService = {
   async create(data: NewCategory) {
      const parsing = categorySchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         data.id = undefined;

         const result = await db.insert(category).values(data);
         return result;
      }
   },

   async findAll() {
      const users = await db.select().from(category);

      return users;
   },

   async find(id: number) {
      const users = await db.select().from(category).where(eq(category.id, id));

      if (!users.length) {
         throw boom.notFound();
      } else {
         return users.at(0);
      }
   },

   async edit(data: NewCategory) {
      const parsing = categorySchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         const result = await db
            .update(category)
            .set(parsing.data)
            .where(eq(category.id, parsing.data.id));

         if (!result.rowCount) {
            throw boom.notFound();
         } else {
            return result;
         }
      }
   },

   async delete(id: number) {
      const result = await db.delete(category).where(eq(category.id, id));

      if (!result.rowCount) {
         throw boom.notFound();
      } else {
         return result;
      }
   },
};

export default categoryService;
