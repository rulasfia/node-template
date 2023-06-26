import { z } from "zod";

export const postProductSchema = z.object({
	title: z.string().min(3),
	stock: z.number(),
	price: z.number(),
});

export type PostProductType = z.infer<typeof postProductSchema>;

export const updateProductSchema = postProductSchema.partial();

export type UpdateProductType = z.infer<typeof updateProductSchema>;
