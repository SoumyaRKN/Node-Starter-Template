import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";

/* ====================== Nexus ====================== */
class Nexus {
	constructor() {
		this.connections = new Map();
	}

	async createSequelize(
		key,
		{ dialect = "postgres", host = "localhost", port = 5432, database, username, password, pool },
	) {
		const sequelize = new Sequelize(database, username, password, {
			host,
			port,
			dialect,
			pool: pool || { max: 10, min: 0, acquire: 30000, idle: 10000 },
			logging: false,
		});

		await sequelize.authenticate();

		this.connections.set(key, { type: "sequelize", client: sequelize });

		logger.info(`Sequelize connected [${key}]`);

		return sequelize;
	}

	async createMongoose(
		key,
		uri,
		options = {},
		modelsPath = path.join(process.cwd(), "src/models/mongoose"),
	) {
		const conn = await mongoose.createConnection(uri, { autoIndex: true, ...options });

		try {
			if (fs.existsSync(modelsPath)) {
				const files = fs
					.readdirSync(modelsPath)
					.filter(f => f.endsWith(".js") || f.endsWith(".mjs"));

				for (const file of files) {
					const full = path.join(modelsPath, file);
					const mod = await import(`file://${full}`);

					if (mod.default && typeof mod.default === "function") {
						await mod.default(conn);

						logger.info(`Registered mongoose model from ${file} on connection ${key}`);
					}
				}
			}
		} catch (error) {
			logger.error("Error loading mongoose models:", error);
			await conn.close();
			throw error;
		}

		this.connections.set(key, { type: "mongoose", client: conn });

		logger.info(`Mongoose connected [${key}]`);

		return conn;
	}

	get(key) {
		return this.connections.get(key);
	}

	async close(key) {
		const entry = this.get(key);

		if (!entry) return false;

		if (entry.type === "mongoose") await entry.client.close();
		if (entry.type === "sequelize") await entry.client.close();

		this.connections.delete(key);

		logger.info(`Connection closed [${key}]`);

		return true;
	}

	async closeAll() {
		const keys = Array.from(this.connections.keys());
		await Promise.all(keys.map(k => this.close(k)));
	}
}

export default new Nexus();
