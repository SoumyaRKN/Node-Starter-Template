import umzug from "../src/config/umzug.js";
import db from "../src/config/sequelize.js";
import logger from "../src/utils/logger.js";

/* ====================== Migrate Rollback Command ====================== */
(async () => {
	try {
		await umzug.down();

		logger.info("Migrate rollback completed");

		await db.close();

		process.exit(0);
	} catch (error) {
		logger.error("Migrate rollback failed:", error);
		process.exit(1);
	}
})();
