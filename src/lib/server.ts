import { Hono } from "hono";
import { loggerMiddleware } from "~/middleware/logger.middleware";
import { loadProductRoutes } from "~/modules/product/product.routes";

export function createServer() {
	const app = new Hono();

	app.use("*", loggerMiddleware);

	app.get("/", (c) => c.json({ message: "Server running!" }));

	/** register products routes */
	app.route("/api", loadProductRoutes());

	return app;
}
