export async function generateID(): Promise<string> {
	const { nanoid } = await import("nanoid/async");

	const canonicID = await nanoid();

	return canonicID;
}
