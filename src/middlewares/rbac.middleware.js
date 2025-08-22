import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Role-Based Access Control (RBAC) Middleware ====================== */
export default role => (req, res, next) => {
	try {
		const user = req.user || {};
		const userRole = user.role || "user";
		const rolesHierarchy = { guest: 0, user: 1, admin: 2 };

		if (rolesHierarchy[userRole] < rolesHierarchy[role]) {
			return res.reply({
				code: httpConstants.CODES.FORBIDDEN,
				status: httpConstants.STATUS.FORBIDDEN,
				message: httpConstants.MESSAGES.FORBIDDEN
			});
		}

		next();
	} catch (error) {
		logger.error("Unexpected error in RBAC middleware:", error);
		return res.reply({
			code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
			status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
			message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
		});
	}
};
