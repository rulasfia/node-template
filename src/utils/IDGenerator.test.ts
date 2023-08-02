import { expect, test } from "vitest";
import { generateID } from "./IDGenerator";

test("Test generate nanoid function", async () => {
	const id = await generateID();

	expect(id).toBeTypeOf("string");
	expect(id.length).toEqual(21);
});
