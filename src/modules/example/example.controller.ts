import { Context } from "hono";
import { PostExampleType } from "./examples.schema";

export async function getExampleHandler(c: Context) {
	return c.json({ data: "Hello world!" });
}

export async function postExampleHandler(c: Context) {
	const body = await c.req.json<PostExampleType>();

	return c.json({ data: body });
}
