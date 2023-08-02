import "dotenv/config";
import { serve } from "@hono/node-server";
import loadConfig from "./config/env";
import { createServer } from "./lib/server";
import { connectToDatabase } from "./lib/db/database";
import { logger } from "./lib/logger";

(function main() {
	loadConfig();

	connectToDatabase(process.env.DB_URL);

	const server = createServer();

	/** start the server */
	serve({ fetch: server.fetch, port: 8080 });
	logger.info("server started at http://localhost:8080");
})();
