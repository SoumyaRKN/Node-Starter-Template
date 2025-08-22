import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Auth Controller ====================== */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (email !== "admin@example.com" || password !== "password") {
			return res.reply({
				code: httpConstants.CODES.UNAUTHORIZED,
				status: httpConstants.STATUS.UNAUTHORIZED,
				message: httpConstants.MESSAGES.UNAUTHORIZED
			});
		}

		const user = { id: 1, email: "admin@example.com", status: true, isAdmin: true };
		const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "8h" });

		return res.reply({
			data: { user, token },
			code: httpConstants.CODES.OK,
			status: httpConstants.STATUS.OK,
			message: httpConstants.MESSAGES.OK
		});
	} catch (error) {
		logger.error("Unexpected error during login:", error);
		return res.reply({
			code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
			status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
			message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
		});
	}
};
