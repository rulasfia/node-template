import pino from "pino";

export const logger = pino({
	transport: {
		target: "pino-pretty",
	},
	formatters: {
		level: (label) => ({ level: label.toUpperCase() }),
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
