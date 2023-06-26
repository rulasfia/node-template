import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => c.text("Hello Hono!"));

serve({
	fetch: app.fetch,
	port: 8080,
});
