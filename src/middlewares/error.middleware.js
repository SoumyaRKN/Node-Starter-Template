import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Error Middleware ====================== */
export default (err, req, res, next) => {
	try {
		const status = err.status || httpConstants.STATUS.INTERNAL_SERVER_ERROR;
		const code = httpConstants.CODES?.[err.code] || httpConstants.CODES.INTERNAL_SERVER_ERROR;
		const message = httpConstants.MESSAGES?.[code] || httpConstants.MESSAGES.INTERNAL_SERVER_ERROR;

		logger.error("Unhandled error occurred", {
			code,
			status,
			message,
			stack: err.stack,
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

		return res.reply({ status, code, message });
	} catch (error) {
		logger.error("Unexpected error in global error handler middleware:", error);
		return res.reply({
			code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
			status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
			message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
		});
	}
};
