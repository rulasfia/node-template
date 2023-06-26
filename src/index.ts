import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import exampleRouter from "./modules/example/example.routes";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => c.json({ message: "Server running!" }));

/** register all routes */
app.route("/api/examples", exampleRouter);

/** start the server */
console.log("server started at http://localhost:8080");
serve({ fetch: app.fetch, port: 8080 });
