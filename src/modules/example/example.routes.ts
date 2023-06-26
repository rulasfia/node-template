import { Hono } from "hono";
import { getExampleHandler, postExampleHandler } from "./example.controller";
import { postExampleSchema } from "./examples.schema";
import { validatorMiddleware } from "../../middleware/validator.middleware";

const api = new Hono();

api.get("/", getExampleHandler);
api.post(
	"/",
	validatorMiddleware("json", postExampleSchema),
	postExampleHandler,
);

export default api;
