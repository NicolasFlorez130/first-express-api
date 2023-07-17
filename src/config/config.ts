import dotenv from 'dotenv';

dotenv.config();

export const config = {
   env: process.env.NODE_ENV || 'dev',
   port: process.env.PORT || 3000,
   connectionString: process.env.DB_STRING,
};
