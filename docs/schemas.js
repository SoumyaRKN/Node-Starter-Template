import { loginSchema } from "../src/validations/auth.validation.js";

/* ====================== Swagger Documentation Request Body Schemas ====================== */
export default {
	/** Authentication */
	"Login Request Body": loginSchema,
};
