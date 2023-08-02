import pino from "pino";

export const logger = pino({
	level: "debug",
	transport: {
		target: "pino-pretty",
	},
	formatters: {
		level: (label) => ({ level: label.toUpperCase() }),
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
