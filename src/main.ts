import "dotenv/config";
import { serve } from "@hono/node-server";
import { createServer } from "./lib/server";
import { connectToDatabase } from "./lib/db/database";

(async function main() {
	connectToDatabase(process.env.DB_URL);

	const server = createServer();

	/** start the server */
	serve({ fetch: server.fetch, port: 8080 });
	console.log("server started at http://localhost:8080");
})();