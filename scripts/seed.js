import db from "../src/config/sequelize.js";
import logger from "../src/utils/logger.js";
import umzugSeeders from "../src/config/umzugSeeders.js";

/* ====================== Seed Command ====================== */
(async () => {
	try {
		await umzugSeeders.up();

		logger.info("Seeding completed");

		await db.close();

		process.exit(0);
	} catch (error) {
		logger.error("Seeding failed:", error);
		process.exit(1);
	}
})();
