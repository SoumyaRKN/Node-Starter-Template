import http from "http";
import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Reply Middleware ====================== */
export default (req, res, next) => {
	res.reply = ({ message, status = httpConstants.STATUS.OK, code = httpConstants.CODES.OK, data = null }) => {
		try {
			if (typeof message !== "string" || !message.trim()) {
				throw new Error(`"message" must be a non-empty string.`);
			}

			const statusCodes = Object.keys(http.STATUS_CODES).map(Number);

			if (!statusCodes.includes(status)) {
				throw new Error(`Invalid HTTP status code: ${code}`);
			}

			let state = "SUCCESS";

			if (status >= 500) state = "ERROR";
			else if (status >= 400) state = "FAIL";

			const response = { code, state, message: message.trim(), ...(data && { data }) };

			logger.info("API request processed", {
				status,
				response,
				request: {
					body: req.body,
					query: req.query,
					params: req.params,
					method: req.method,
					host: req.headers.host,
					route: req.originalUrl || req.url,
					userAgent: req.headers["user-agent"],
					ip: req.ip || req.connection.remoteAddress,
					platform: req.headers["sec-ch-ua-platform"],
				},
			});

			return res.status(status).json(response);
		} catch (error) {
			logger.error("Error in res.reply middleware:", error);
			return res
				.status(httpConstants.STATUS.INTERNAL_SERVER_ERROR)
				.json({
					state: "ERROR",
					code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
					message: "Internal server error while sending response!"
				});
		}
	};

	next();
};
