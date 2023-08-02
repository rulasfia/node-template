import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./errorHandler";

describe("Test different type of error", () => {
	it("Work when error is JS Error instance", () => {
		const err = new Error("this is error");

		expect(getErrorMessage(err)).toEqual("this is error");
	});

	it("Work when error is normal object with message", () => {
		const err = { message: "this is error" };

		expect(getErrorMessage(err)).toEqual("this is error");
	});

	it("Work when error is just normal string", () => {
		const err = "this is error";

		expect(getErrorMessage(err)).toEqual("this is error");
	});
});
