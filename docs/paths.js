import { login } from "./routes/auth.js";

/* ====================== Swagger Documentation Routes ====================== */
export default {
	/** Authentication */
	"/auth/login": { post: login },
};
