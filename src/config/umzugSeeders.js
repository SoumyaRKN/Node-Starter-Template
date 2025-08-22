import path from "path";
import db from "./sequelize.js";
import { Umzug, JSONStorage } from "umzug";

/* ====================== Umzug Seeders ====================== */
export const umzugSeeders = new Umzug({
	migrations: { glob: path.join(process.cwd(), "seeders/*.js") },
	context: db.getQueryInterface(),
	storage: new JSONStorage({
		path: path.join(process.cwd(), "seeders/.seeded.json"),
	}),
	logger: console,
});

export default umzugSeeders;
