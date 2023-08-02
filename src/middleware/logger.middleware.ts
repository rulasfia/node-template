import type { Context, Next } from "hono";
import { logger } from "~/lib/logger";
import { getPath } from "~/utils/url";

/** function for logging http request */
export async function loggerMiddleware(c: Context, next: Next) {
	const { method } = c.req;
	const path = getPath(c.req.raw);

	log(LogPrefix.Incoming, method, path);

	const start = Date.now();

	await next();

	log(LogPrefix.Outgoing, method, path, c.res.status, time(start));
}

enum LogPrefix {
	Outgoing = "-->",
	Incoming = "<--",
	Error = "xxx",
}

/** format response time */
function humanize(times: string[]) {
	const [delimiter, separator] = [",", "."];

	const orderTimes = times.map((v) =>
		v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter)
	);

	return orderTimes.join(separator);
}

/** calculate response time */
function time(start: number) {
	const delta = Date.now() - start;
	return humanize([
		delta < 1000 ? delta + "ms" : Math.round(delta / 1000) + "s",
	]);
}

/** log function for outputing to console */
function log(
	prefix: string,
	method: string,
	path: string,
	status: number = 0,
	elapsed?: string
) {
	const out =
		prefix === LogPrefix.Incoming
			? `  ${prefix} ${method} ${path}`
			: `  ${prefix} ${method} ${path} [${status}] ${elapsed}`;

	logger.info(out);
}
