import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";

/* ====================== Sequelize ====================== */
const { DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if (!DB_DIALECT || !DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
	logger.error(
		"Missing required database configuration: DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASS, and/or DB_NAME are not set in environment variables.",
	);
	process.exit(1);
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: DB_DIALECT,
	logging: false,
	pool: {
		max: 10,
		min: 0,
		idle: 10000,
		acquire: 30000,
	},
});

try {
	await sequelize.authenticate();
	logger.info(
		`Sequelize connected to ${DB_DIALECT} database "${DB_NAME}" at ${DB_HOST}:${DB_PORT}`,
	);
} catch (error) {
	logger.error(`Sequelize connection failed:`, error);
	process.exit(1);
}

export default sequelize;
