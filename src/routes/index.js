import { Router } from "express";
import auth from "./auth.route.js";
import logger from "../utils/logger.js";
import swaggerUi from "swagger-ui-express";
import httpConstants from "../constants/http.constants.js";
import { documentation, options } from "../../docs/index.js";

/* ====================== Routes ====================== */
const router = Router();

// Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(documentation, options));

// Health Check
router.get("/health", (req, res) => {
	try {
		let upTime = process.uptime();

		const days = Math.floor(upTime / (24 * 3600));
		upTime %= 24 * 3600;

		const hours = Math.floor(upTime / 3600);
		upTime %= 3600;

		const minutes = Math.floor(upTime / 60);
		upTime %= 60;

		const secs = Math.floor(upTime);
		const millis = Math.floor((upTime - secs) * 1000);

		const upTimeParts = [];

		if (days) {
			upTimeParts.push(`${days} Day${days !== 1 ? "s" : ""}`);
		}

		if (hours) {
			upTimeParts.push(`${hours} Hour${hours !== 1 ? "s" : ""}`);
		}

		if (minutes) {
			upTimeParts.push(`${minutes} Minute${minutes !== 1 ? "s" : ""}`);
		}

		if (secs) {
			upTimeParts.push(`${secs} Second${secs !== 1 ? "s" : ""}`);
		}

		if (millis) {
			upTimeParts.push(`${millis} Millisecond${millis !== 1 ? "s" : ""}`);
		}

		const now = new Date();

		return res.reply({
			code: httpConstants.CODES.OK,
			status: httpConstants.STATUS.OK,
			message: httpConstants.MESSAGES.OK,
			data: {
				timestamp: now.getTime(),
				uptime: upTimeParts.join(" "),
				dateTime: now.toLocaleString()
			},
		});
	} catch (error) {
		logger.error("Unexpected error during health check:", error);
		return res.reply({
			code: httpConstants.CODES.INTERNAL_SERVER_ERROR,
			status: httpConstants.STATUS.INTERNAL_SERVER_ERROR,
			message: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR
		});
	}
});

router.use("/auth", auth);

export default router;
