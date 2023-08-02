import { Hono } from "hono";
import {
	deleteProductHandler,
	getProductDetailHandler,
	getProductHandler,
	postProductHandler,
	updateProductHandler,
} from "./product.controllers";
import { postProductSchema, updateProductSchema } from "./product.schemas";
import { validator } from "~/middleware/validator.middleware";

export function loadProductRoutes() {
	const api = new Hono().basePath("/products");

	api.get("/", getProductHandler);
	api.get("/:id", getProductDetailHandler);
	api.post("/", validator("json", postProductSchema), postProductHandler);
	api.put("/:id", validator("json", updateProductSchema), updateProductHandler);
	api.delete("/:id", deleteProductHandler);

	return api;
}
