import { Hono } from "hono";
import {
	deleteProductHandler,
	getProductHandler,
	postProductHandler,
	updateProductHandler,
} from "./product.controller";
import { postProductSchema, updateProductSchema } from "./product.schema";
import { validatorMiddleware } from "~/middleware/validator.middleware";

const api = new Hono();

api.get("/", getProductHandler);
api.post(
	"/",
	validatorMiddleware("json", postProductSchema),
	postProductHandler,
);
api.put(
	"/:id",
	validatorMiddleware("json", updateProductSchema),
	updateProductHandler,
);
api.delete("/:id", deleteProductHandler);

export default api;
