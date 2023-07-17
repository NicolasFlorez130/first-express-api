import { eq } from 'drizzle-orm';
import { db } from '../db';
import { NewUser, user, userSchema } from '../schema/user';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';

export const userService = {
   async create(data: NewUser) {
      const parsing = userSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         data.id = undefined;

         const result = await db.insert(user).values(data);

         return result;
      }
   },

   async findAll() {
      const users = await db.select().from(user);
      return users;
   },

   async find(id: number) {
      const users = await db.select().from(user).where(eq(user.id, id));

      if (!users.length) {
         throw boom.notFound();
      } else {
         return users.at(0);
      }
   },

   async edit(data: NewUser) {
      const parsing = userSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         const result = await db.update(user).set(parsing.data).where(eq(user.id, parsing.data.id));

         if (!result.rowCount) {
            throw boom.notFound();
         } else {
            return result;
         }
      }
   },

   async delete(id: number) {
      const result = await db.delete(user).where(eq(user.id, id));

      if (!result.rowCount) {
         throw boom.notFound();
      } else {
         return result;
      }
   },
};

export default userService;
