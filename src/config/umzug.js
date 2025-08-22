import path from "path";
import db from "./sequelize.js";
import { Umzug, SequelizeStorage } from "umzug";

/* ====================== Umzug ====================== */
export const umzug = new Umzug({
	migrations: { glob: path.join(process.cwd(), "migrations/*.js") },
	context: db.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize: db }),
	logger: console,
});

export default umzug;
