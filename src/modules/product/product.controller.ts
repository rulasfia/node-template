import { Context } from "hono";
import type { PostProductType, UpdateProductType } from "./product.schema";
import {
	deleteProductById,
	findAllProducts,
	findProductById,
	insertNewProduct,
	updateProductById,
} from "./product.repository";
import { getErrorMessage } from "~/utils/errorHandler";
import { generateID } from "~/utils/IDGenerator";

export async function getProductHandler(c: Context) {
	try {
		const products = await findAllProducts();

		return c.json({ data: products });
	} catch (error) {
		console.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}

export async function postProductHandler(c: Context) {
	try {
		const body = await c.req.json<PostProductType>();
		const id = await generateID();

		await insertNewProduct({
			...body,
			created_at: new Date(),
			updated_at: new Date(),
			id,
		});

		return c.json({ message: "Product created!" }, 201);
	} catch (error) {
		console.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}

export async function updateProductHandler(c: Context) {
	try {
		const id = c.req.param("id");
		const body = await c.req.json<UpdateProductType>();

		if (!id) throw new Error("Invalid id!");

		await updateProductById(id, {
			...body,
			updated_at: new Date(),
		});

		return c.json({ message: "Product updated!" });
	} catch (error) {
		console.error(error);
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
		console.error(error);
		return c.json({ message: getErrorMessage(error) }, 500);
	}
}
