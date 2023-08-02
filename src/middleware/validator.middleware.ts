import type { ValidationTargets } from "hono";
import { validator as honoValidator } from "hono/validator";
import { ZodSchema } from "zod";
import { logger } from "~/lib/logger";
import { getErrorMessage } from "~/utils/errorHandler";

export function validator(target: keyof ValidationTargets, schema: ZodSchema) {
	return honoValidator(target, (value, c) => {
		const parsed = schema.safeParse(value);
		if (!parsed.success) {
			logger.error("error: ", getErrorMessage(parsed.error));
			return c.json({ message: "Invalid body!", error: parsed.error }, 400);
		}

		return parsed.data;
	});
}
