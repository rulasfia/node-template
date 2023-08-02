import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "~/lib/db/database";
import { DB } from "~/lib/db/database.types";

export type Product = Selectable<DB["products"]>;
export type NewProduct = Insertable<DB["products"]>;
export type EditedProduct = Omit<Updateable<DB["products"]>, "id">;

export async function findAllProducts() {
	return await db()
		.selectFrom("products")
		.selectAll()
		.orderBy("created_at", "desc")
		.execute();
}

export async function findProductById(id: Product["id"]) {
	return await db()
		.selectFrom("products")
		.where("products.id", "=", id)
		.selectAll()
		.limit(1)
		.executeTakeFirst();
}

export async function insertNewProduct(newProduct: NewProduct) {
	return await db()
		.insertInto("products")
		.values(newProduct)
		.executeTakeFirstOrThrow();
}

export async function updateProductById(
	id: Product["id"],
	updatedProduct: EditedProduct
) {
	return await db()
		.updateTable("products")
		.set(updatedProduct)
		.where("products.id", "=", id)
		.execute();
}

export async function deleteProductById(id: Product["id"]) {
	return await db()
		.deleteFrom("products")
		.where("products.id", "=", id)
		.execute();
}
