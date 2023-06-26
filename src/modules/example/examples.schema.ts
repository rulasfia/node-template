import { z } from "zod";

export const postExampleSchema = z.object({
	name: z.string().min(6),
});

export type PostExampleType = z.infer<typeof postExampleSchema>;
