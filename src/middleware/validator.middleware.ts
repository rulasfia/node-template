import type { ValidationTargets } from "hono";
import { validator } from "hono/validator";
import { ZodSchema } from "zod";

export function validatorMiddleware(
	target: keyof ValidationTargets,
	schema: ZodSchema,
) {
	return validator(target, (value, c) => {
		const parsed = schema.safeParse(value);
		if (!parsed.success) {
			return c.json({ message: "Invalid body!", error: parsed.error }, 400);
		}
		return parsed.data;
	});
}
