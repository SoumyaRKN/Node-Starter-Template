import fs from "fs";
import path from "path";
import logger from "../src/utils/logger.js";
import { generateTimestampId, toKebabCase, pluralize } from "../src/utils/helpers.js";

/* ====================== Make Migration Command ====================== */
const args = process.argv.slice(2);

if (!args.length) {
	logger.info("Please provide a migration name");
	process.exit(1);
}

let tableFlag = null;
let createFlag = null;

args.forEach((arg, i) => {
	if (arg.startsWith("--table=")) {
		tableFlag = arg.split("=")[1];
		args.splice(i, 1);
	}

	if (arg.startsWith("--create=")) {
		createFlag = arg.split("=")[1];
		args.splice(i, 1);
	}
});

const actions = ["create-", "update-", "delete-", "add-", "remove-", "alter-"];

let name = toKebabCase(args.join(" "));
let action = null;
let table = name;

for (const prefix of actions) {
	if (name.startsWith(prefix)) {
		action = prefix.replace(/-$/, "");
		table = name.slice(prefix.length).replace(/-table$/, "");
		break;
	}
}

if (tableFlag) table = tableFlag;
if (createFlag) {
	action = "create";
	table = createFlag;
}

table = pluralize(table.replace(/-/g, "_"));

const filename = `${generateTimestampId()}-${name}.js`;
const filepath = path.join(process.cwd(), "migrations", filename);

let template = "";

switch (action) {
	case "create":
		template = `import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('${table}', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    // Common fields
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    status: { type: DataTypes.ENUM('pending', 'active', 'inactive'), defaultValue: 'pending' },
    amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    meta: { type: DataTypes.JSON },
    
    // Foreign key example
    user_id: { 
      type: DataTypes.INTEGER, 
      references: { model: 'users', key: 'id' }, 
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL' 
    },

    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE }
  });

  // Indexes
  await queryInterface.addIndex('${table}', ['name']);
  await queryInterface.addIndex('${table}', ['status']);
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('${table}');
};`;
		break;

	case "update":
	case "add":
	case "remove":
	case "alter":
		template = `import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  // Example: await queryInterface.addColumn('${table}', 'new_column', { type: DataTypes.STRING });
};

export const down = async ({ context: queryInterface }) => {
  // Example: await queryInterface.removeColumn('${table}', 'new_column');
};`;
		break;

	case "delete":
		template = `import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('${table}');
};

export const down = async ({ context: queryInterface, Sequelize }) => {
  await queryInterface.createTable('${table}', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  });
};`;
		break;

	default:
		template = `import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface, Sequelize }) => {
  // Migration
};

export const down = async ({ context: queryInterface, Sequelize }) => {
  // Rollback
};`;
		break;
}

fs.writeFileSync(filepath, template);
logger.info(`Migration created: ${filepath}`);
