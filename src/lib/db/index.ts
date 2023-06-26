import { DB } from "./databaseTypes.js"; // this is the Database interface we defined earlier
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
	console.error("Invalid DB_URL!");
	process.exit(1);
}

const dialect = new MysqlDialect({
	pool: createPool(DB_URL),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
	dialect,
});
