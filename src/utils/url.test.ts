import { expect, test } from "vitest";
import { getPath } from "./url";

test("Test getPath function based on request url", () => {
	const input = {
		url: new URL("http://localhost:8080/api/products").toString(),
	};

	const path = getPath(input as unknown as Request);

	expect(path).toEqual("/api/products");
});
