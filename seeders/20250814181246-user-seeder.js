
import { hash } from "bcrypt";
import User from "../src/models/sequelize/user.model.js";

export const up = async () => {
	// Seeding
	await User.create({
		name: "Admin",
		email: "admin@example.com",
		password: await hash("password", 10),
		status: true,
		isAdmin: true,
	});
};

export const down = async () => {
	// Rollback
	await User.destroy({ where: { email: "admin@example.com" } });
};
