"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const kysely_1 = require("kysely");
const kysely_postgres_js_1 = require("kysely-postgres-js");
const postgres_1 = __importDefault(require("postgres"));
// const db = new Kysely<Database>({
//    dialect: new PostgresDialect({
//       pool: new Pool({
//          port: 5432,
//          host: 'localhost',
//          database: 'root',
//          user: 'root',
//          password: 'root',
//       }),
//    }),
// });
const db = new kysely_1.Kysely({
    dialect: new kysely_postgres_js_1.PostgresJSDialect({
        connectionString: 'postgresql://postgres:testpass123@localhost:6500/mydb?schema=public',
        options: {
            max: 10,
        },
        postgres: postgres_1.default,
    }),
});
const demo = async () => {
    const { id, first_name } = await db
        .insertInto('person')
        .values({
        first_name: 'Alicia',
        gender: 'female',
    })
        .returning(['id', 'first_name'])
        .executeTakeFirstOrThrow();
    return { id, first_name };
};
exports.demo = demo;
//# sourceMappingURL=main.js.map