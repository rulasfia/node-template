import type { ValidationTargets } from "hono";
import type { ZodSchema, z } from "zod";
import { validator as honoValidator } from "hono/validator";
import { logger } from "~/lib/logger";
import { getErrorMessage } from "~/utils/errorHandler";

export function validator<S extends ZodSchema>(
	target: keyof ValidationTargets,
	schema: S,
) {
	return honoValidator(target, (value, c): Response | z.infer<S> => {
		const parsed: z.SafeParseReturnType<S, S> = schema.safeParse(value);

		if (!parsed.success) {
			logger.error("error: ", getErrorMessage(parsed.error));
			return c.json({ message: "Invalid body!", error: parsed.error }, 400);
		}

		return parsed.data;
	});
}
