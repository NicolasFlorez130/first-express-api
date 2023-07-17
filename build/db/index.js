import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config/config';
const pool = new Pool({
    connectionString: config.connectionString,
});
export const db = drizzle(pool);
//# sourceMappingURL=index.js.map