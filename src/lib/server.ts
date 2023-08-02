import { Hono } from "hono";
import { logger } from "hono/logger";
import { loadProductRoutes } from "~/modules/product/product.routes";

export function createServer() {
	const app = new Hono();

	app.use("*", logger());

	app.get("/", (c) => c.json({ message: "Server running!" }));

	/** register products routes */
	app.route("/api", loadProductRoutes());

	return app;
}
