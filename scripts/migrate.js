import umzug from "../src/config/umzug.js";
import db from "../src/config/sequelize.js";
import logger from "../src/utils/logger.js";

/* ====================== Migration Command ====================== */
(async () => {
	try {
		await umzug.up();

		logger.info("Migration completed");

		await db.close();

		process.exit(0);
	} catch (error) {
		logger.error("Migration failed:", error);
		process.exit(1);
	}
})();
