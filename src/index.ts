import express from 'express';
import category_controller from './routes/category_controller';
import customer_controller from './routes/customer_controller';
import order_controller from './routes/order_controller';
import product_controller from './routes/product_controller';
import user_controller from './routes/user_controller';
import { db } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { config } from './config/config';
import { errorHandler, parsingFailHandler } from './middlewares/error_catchers';
import { user } from './schema/user';

const app = express();

app.use(express.json());

const PORT = config.port;
app.listen(PORT, async () => {
   await migrate(db, { migrationsFolder: 'drizzle' });
});

app.use(parsingFailHandler);

app.get('/ping', async (_, res) => {
   await db.delete(user);
   res.send('pong?');
});

app.use('/category', category_controller);
app.use('/customer', customer_controller);
app.use('/order', order_controller);
app.use('/product', product_controller);
app.use('/user', user_controller);

app.use(errorHandler);
