import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";

/*======================= Logger ==========================*/
const STORAGE = "./logs";
const DEBUG = process.env.DEBUG === "TRUE";

if (!fs.existsSync(STORAGE)) fs.mkdirSync(STORAGE, { recursive: true });

const combinedTransport = new winston.transports.DailyRotateFile({
	dirname: STORAGE,
	filename: "combined-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "10m",
	maxFiles: "7d",
	level: "info",
});

const errorTransport = new winston.transports.DailyRotateFile({
	dirname: STORAGE,
	filename: "error-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "10m",
	maxFiles: "7d",
	level: "error",
});

const transports = [combinedTransport, errorTransport];

if (DEBUG) {
	transports.push(
		new winston.transports.Console({
			level: "debug",
			format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
		}),
	);
}

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports,
});

export default logger;
