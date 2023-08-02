export function getPath(request: Request): string {
	const url = request.url;
	const queryIndex = url.indexOf("?", 8);
	const path = url.slice(
		url.indexOf("/", 8),
		queryIndex === -1 ? undefined : queryIndex
	);

	return path;
}
