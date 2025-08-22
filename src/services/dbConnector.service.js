import nexus from "../config/nexus.js";

/* ====================== Database Connector Service ====================== */
export const connectSQL = async (key, cfg) => {
	return nexus.createSequelize(key, cfg);
};

export const connectMongo = async (key, uri, options = {}) => {
	return nexus.createMongoose(key, uri, options);
};

export const runRawSql = async (key, sql, options = {}) => {
	const entry = nexus.get(key);

	if (!entry || entry.type !== "sequelize") {
		throw new Error("SQL connection not found.");
	}

	const [results] = await entry.client.query(sql, options);

	return results;
};

export const runMongo = async (key, modelName, op, ...args) => {
	const entry = nexus.get(key);

	if (!entry || entry.type !== "mongoose") {
		throw new Error("Mongo connection not found.");
	}

	const Model = entry.client.model(modelName);

	if (!Model) throw new Error("Model not found.");

	if (typeof Model[op] !== "function") throw new Error("Invalid operation.");

	return Model[op](...args);
};

export const closeConnection = async key => {
	return nexus.close(key);
};
