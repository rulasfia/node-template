import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).optional(),
	DB_URL: z.string(),
});

export default function loadConfig() {
	const env = envSchema.safeParse(process.env);

	if (!env.success) {
		const paths = env.error.issues.map((issue) => issue.path[0]);
		throw new Error("Invalid environment variables: " + paths.toString());
	}
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
