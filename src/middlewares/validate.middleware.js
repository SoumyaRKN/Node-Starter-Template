import Ajv from "ajv";
import addFormats from "ajv-formats";
import logger from "../utils/logger.js";
import httpConstants from "../constants/http.constants.js";

/* ====================== Validate Middleware ====================== */
const ajv = new Ajv({ allErrors: true, removeAdditional: true });

addFormats(ajv);

export default schema => {
	const validate = ajv.compile(schema);

	return (req, res, next) => {
		try {
			const valid = validate(req.body);

			if (!valid) {
				return res.reply({
					data: { errors: validate.errors },
					code: httpConstants.CODES.BAD_REQUEST,
					status: httpConstants.STATUS.BAD_REQUEST,
					message: httpConstants.MESSAGES.BAD_REQUEST,
				});
			}

			next();
		} catch (error) {
			logger.error("Unexpected error in validate middleware:", error);
			return res.reply({
				code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
				status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
				message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
			});
		}
	};
};
