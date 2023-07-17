import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { NewCustomer, customer, customerSchema } from '../schema/customer';
import { user } from '../schema/user';

export const customerService = {
   async create(data: NewCustomer) {
      const parsing = customerSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         data.id = undefined;

         const result = await db.insert(customer).values(data);
         return result;
      }
   },

   async findAll() {
      const users = await db.select().from(customer).leftJoin(user, eq(customer.userId, user.id));

      return users;
   },

   async find(id: number) {
      const users = await db
         .select()
         .from(customer)
         .where(eq(customer.id, id))
         .leftJoin(user, eq(customer.userId, user.id));

      if (!users.length) {
         throw boom.notFound();
      } else {
         return users.at(0);
      }
   },

   async edit(data: NewCustomer) {
      const parsing = customerSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         const result = await db
            .update(customer)
            .set(parsing.data)
            .where(eq(customer.id, parsing.data.id));

         if (!result.rowCount) {
            throw boom.notFound();
         } else {
            return result;
         }
      }
   },

   async delete(id: number) {
      const result = await db.delete(customer).where(eq(customer.id, id));

      if (!result.rowCount) {
         throw boom.notFound();
      } else {
         return result;
      }
   },
};

export default customerService;
