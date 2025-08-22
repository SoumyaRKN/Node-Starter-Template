import vault from "node-vault";
import logger from "../../src/utils/logger.js";

/* ====================== Vault Initialization Command ====================== */
const { VAULT_ADDR, VAULT_TOKEN, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if (!VAULT_ADDR || !VAULT_TOKEN) {
	logger.error(
		"Missing required Vault configuration: VAULT_ADDR and/or VAULT_TOKEN are not set in environment variables",
	);
	process.exit(1);
}

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
	logger.error(
		"Missing required database configuration: DB_HOST, DB_PORT, DB_USER, DB_PASS, and/or DB_NAME are not set in environment variables.",
	);
	process.exit(1);
}

const client = vault({ endpoint: VAULT_ADDR, token: VAULT_TOKEN });

(async () => {
	try {
		logger.info(`Connecting to Vault at ${VAULT_ADDR}`);

		const secretPath = "secret/data/postgres";

		const data = { data: { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } };

		await client.write(secretPath, data);

		logger.info(`Wrote secret to → ${secretPath}`);

		process.exit(0);
	} catch (error) {
		logger.error("Vault init failed:", error);
		process.exit(1);
	}
})();
