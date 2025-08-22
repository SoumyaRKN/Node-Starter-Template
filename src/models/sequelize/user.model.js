import { DataTypes } from "sequelize";
import db from "../../config/sequelize.js";

/* ====================== Sequelize User Model ====================== */
const User = db.define(
	"User",
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING(50), allowNull: false },
		email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
		password: { type: DataTypes.STRING(255), allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		deletedAt: { type: DataTypes.DATE },
	},
	{ tableName: "users", timestamps: true },
);

export default User;
