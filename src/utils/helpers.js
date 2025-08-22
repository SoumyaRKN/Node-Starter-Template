import logger from "./logger.js";
import { spawn } from "child_process";

/* ====================== Helpers ====================== */
export const pluralize = word => {
	const lower = word.toLowerCase();

	if (
		lower.endsWith("ies") ||
		lower.endsWith("ses") ||
		lower.endsWith("xes") ||
		lower.endsWith("zes") ||
		lower.endsWith("ches") ||
		lower.endsWith("shes") ||
		(lower.endsWith("s") && !lower.endsWith("ss"))
	) {
		return word;
	}

	if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
		return word.slice(0, -1) + "ies";
	}

	if (
		lower.endsWith("s") ||
		lower.endsWith("x") ||
		lower.endsWith("z") ||
		lower.endsWith("ch") ||
		lower.endsWith("sh")
	) {
		return word + "es";
	}

	return word + "s";
};

export const singularize = word => {
	const lower = word.toLowerCase();

	if (lower.endsWith("ies")) {
		return word.slice(0, -3) + "y";
	}

	if (
		lower.endsWith("ses") ||
		lower.endsWith("xes") ||
		lower.endsWith("zes") ||
		lower.endsWith("ches") ||
		lower.endsWith("shes")
	) {
		return word.slice(0, -2);
	}

	if (lower.endsWith("es") && word.length > 2) {
		return word.slice(0, -2);
	}

	if (lower.endsWith("s") && !lower.endsWith("ss") && word.length > 1) {
		return word.slice(0, -1);
	}

	return word;
};

export const toKebabCase = string => {
	return string
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
		.replace(/[_-]+/g, " ")
		.replace(/([a-z])([0-9])/gi, "$1 $2")
		.replace(/([0-9])([a-z])/gi, "$1 $2")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-");
};

export const generateTimestampId = () => {
	const now = new Date();

	const year = String(now.getFullYear());
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export const execCommand = (cmd, args) => {
	return new Promise((resolve, reject) => {
		const p = spawn(cmd, args, { stdio: "inherit" });

		p.on("close", code => (code === 0 ? resolve() : reject(new Error("Exit code " + code))));
	});
};

export const trace = (event, handler) => {
	return async (payload) => {
		const start = Date.now();

		try {
			logger.info({ event, payload, status: "PENDING", message: "Task execution started" });

			const result = await handler(payload);

			logger.info({ event, payload, status: "SUCCESS", message: "Task executed successfully", data: result, duration: Date.now() - start });

			return result;
		} catch (error) {
			logger.error({ event, payload, status: "FAILED", message: "Task execution failed", error: error.message, duration: Date.now() - start });
			throw error;
		}
	};
};