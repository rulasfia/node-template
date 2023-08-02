import type { Insertable, Selectable, Updateable } from "kysely";
import type { DB } from "~/lib/db/database.types";
import { db } from "~/lib/db/database";
import { generateID } from "~/utils/IDGenerator";

export type Product = Selectable<DB["products"]>;
export type NewProduct = Omit<
	Insertable<DB["products"]>,
	"id" | "created_at" | "updated_at"
>;
export type EditedProduct = Omit<
	Updateable<DB["products"]>,
	"id" | "updated_at"
>;

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
	const id = await generateID();

	await db()
		.insertInto("products")
		.values({
			id,
			created_at: new Date(),
			updated_at: new Date(),
			...newProduct,
		})
		.execute();
}

export async function updateProductById(
	id: Product["id"],
	updatedProduct: EditedProduct,
) {
	await db()
		.updateTable("products")
		.set({ updated_at: new Date(), ...updatedProduct })
		.where("products.id", "=", id)
		.execute();
}

export async function deleteProductById(id: Product["id"]) {
	await db().deleteFrom("products").where("products.id", "=", id).execute();
}
