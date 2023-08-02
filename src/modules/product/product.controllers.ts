import type { Context } from "hono";
import type { PostProductType, UpdateProductType } from "./product.schemas";
import {
	deleteProductById,
	findAllProducts,
	findProductById,
	insertNewProduct,
	updateProductById,
} from "./product.services";
import { getErrorMessage } from "~/utils/errorHandler";
import { logger } from "~/lib/logger";

export async function getProductHandler(c: Context) {
	try {
		const products = await findAllProducts();

		return c.json({ data: products });
	} catch (error) {
		logger.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}

export async function getProductDetailHandler(c: Context) {
	try {
		const id = c.req.param("id");

		const product = await findProductById(id);

		return c.json({ data: product });
	} catch (error) {
		logger.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}
export async function postProductHandler(c: Context) {
	try {
		const body = await c.req.json<PostProductType>();

		await insertNewProduct(body);

		return c.json({ message: "Product created!" }, 201);
	} catch (error) {
		logger.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}

export async function updateProductHandler(c: Context) {
	try {
		const id = c.req.param("id");
		const body = await c.req.json<UpdateProductType>();

		if (!id) throw new Error("Invalid id!");

		await updateProductById(id, body);

		return c.json({ message: "Product updated!" });
	} catch (error) {
		logger.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}

export async function deleteProductHandler(c: Context) {
	try {
		const id = c.req.param("id");

		if (!id) throw new Error("Invalid id!");

		const product = await findProductById(id);

		if (!product) throw new Error("Product not found!");

		await deleteProductById(id);

		return c.json({ message: "Product deleted!" });
	} catch (error) {
		logger.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}
