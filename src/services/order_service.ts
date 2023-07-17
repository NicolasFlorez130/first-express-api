import { eq } from 'drizzle-orm';
import { db } from '../db';
import boom from '@hapi/boom';
import { convertErrorIntoString } from '../utils/validation_utils';
import { NewOrder, order, orderSchema } from '../schema/order';
import { customer } from '../schema/customer';
import { product } from '../schema/product';

export const orderService = {
   async create(data: NewOrder) {
      const parsing = orderSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         data.id = undefined;

         const result = await db.insert(order).values(data);

         return result;
      }
   },

   async findAll() {
      const users = await db
         .select()
         .from(order)
         .innerJoin(customer, eq(order.customerId, customer.id))
         .innerJoin(product, eq(order.productId, product.id));
      return users;
   },

   async find(id: number) {
      const users = await db
         .select()
         .from(order)
         .where(eq(order.id, id))
         .innerJoin(customer, eq(order.customerId, customer.id))
         .innerJoin(product, eq(order.productId, product.id));

      if (!users.length) {
         throw boom.notFound();
      } else {
         return users.at(0);
      }
   },

   async edit(data: NewOrder) {
      const parsing = orderSchema.safeParse(data);
      if (parsing.success === false) {
         throw boom.badRequest(convertErrorIntoString(parsing));
      } else {
         const result = await db
            .update(order)
            .set(parsing.data)
            .where(eq(order.id, parsing.data.id));

         if (!result.rowCount) {
            throw boom.notFound();
         } else {
            return result;
         }
      }
   },

   async delete(id: number) {
      const result = await db.delete(order).where(eq(order.id, id));

      if (!result.rowCount) {
         throw boom.notFound();
      } else {
         return result;
      }
   },
};

export default orderService;
