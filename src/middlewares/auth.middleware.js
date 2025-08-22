import { verify } from "jsonwebtoken";
import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Auth Middleware ====================== */
export default (req, res, next) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) {
			return res.reply({
				code: httpConstants.CODES.UNAUTHORIZED,
				status: httpConstants.STATUS.UNAUTHORIZED,
				message: httpConstants.MESSAGES.UNAUTHORIZED
			});
		}

		const parts = authorization.split(" ");

		if (parts.length !== 2 || parts[0] !== "Bearer") {
			return res.reply({
				code: httpConstants.CODES.UNAUTHORIZED,
				status: httpConstants.STATUS.UNAUTHORIZED,
				message: httpConstants.MESSAGES.UNAUTHORIZED
			});
		}

		const token = parts[1];

		let payload;

		try {
			payload = verify(token, process.env.JWT_SECRET);
		} catch (error) {
			logger.error("JWT verification failed during authentication:", error);
			return res.reply({
				code: httpConstants.CODES.UNAUTHORIZED,
				status: httpConstants.STATUS.UNAUTHORIZED,
				message: httpConstants.MESSAGES.UNAUTHORIZED
			});
		}

		req.user = payload;

		next();
	} catch (error) {
		logger.error("Unexpected error in auth middleware:", error);
		return res.reply({
			code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
			status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
			message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
		});
	}
};
