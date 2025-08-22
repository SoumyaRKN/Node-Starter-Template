import db from "../src/config/sequelize.js";
import logger from "../src/utils/logger.js";
import umzugSeeders from "../src/config/umzugSeeders.js";

/* ====================== Seed Rollback Command ====================== */
(async () => {
	try {
		await umzugSeeders.down();

		logger.info("Seed rollback completed");

		await db.close();

		process.exit(0);
	} catch (error) {
		logger.error("Seed rollback failed:", error);
		process.exit(1);
	}
})();
