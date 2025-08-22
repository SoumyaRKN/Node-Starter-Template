import logger from "../../src/utils/logger.js";
import secrets from "../../src/utils/secrets.js";

/* ====================== Vault Connect Command ====================== */
(async () => {
	try {
		const creds = await secrets.getKVv2("postgres");

		if (!creds) {
			logger.error("No postgres creds found in Vault at secret/data/postgres");
			process.exit(1);
		}

		const url = `postgres://${creds.DB_USER}:${creds.DB_PASS}@${creds.DB_HOST}:${creds.DB_PORT}/${creds.DB_NAME}`;

		logger.info(`Database URL → ${url}`);

		process.exit(0);
	} catch (error) {
		logger.error("Unable to establish connection to Vault:", error);
		process.exit(1);
	}
})();
