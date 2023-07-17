import express from 'express';
import user_controller from './routes/user_controller';
import category_controller from './routes/category_controller';
import { db } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { config } from './config/config';
import { errorHandler } from './middlewares/error_catchers';
import { user } from './schema/user';
const app = express();
app.use(express.json());
const PORT = config.port;
app.listen(PORT, async () => {
    await migrate(db, { migrationsFolder: 'drizzle' });
});
app.get('/ping', async (_, res) => {
    await db.delete(user);
    res.send('pong?');
});
app.use('/user', user_controller);
app.use('/category', category_controller);
app.use(errorHandler);
//# sourceMappingURL=index.js.map