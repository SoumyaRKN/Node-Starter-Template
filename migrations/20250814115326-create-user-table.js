import { DataTypes } from "sequelize";

export const up = async ({ context: queryInterface }) => {
	await queryInterface.createTable("users", {
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING(50), allowNull: false },
		email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
		password: { type: DataTypes.STRING(255), allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		deletedAt: { type: DataTypes.DATE },
	});

	// Indexes
	await queryInterface.addIndex("users", ["email"]);
};

export const down = async ({ context: queryInterface }) => {
	await queryInterface.dropTable("users");
};
