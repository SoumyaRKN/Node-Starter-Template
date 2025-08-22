import fs from "fs";
import path from "path";
import logger from "../src/utils/logger.js";
import { generateTimestampId, toKebabCase, pluralize, singularize } from "../src/utils/helpers.js";

/* ====================== Make Seeder Command ====================== */
const args = process.argv.slice(2);

if (!args.length) {
	logger.info("Please provide a seeder name");
	process.exit(1);
}

let name = toKebabCase(args.join(" "));
let table = name.replace(/^(create|insert|add|update|delete)-/, "").replace(/-seeder$/, "");

table = pluralize(table);

const filename = `${generateTimestampId()}-${name}-seeder.js`;
const filepath = path.join(process.cwd(), "seeders", filename);
const model = singularize(table)
	.split("-")
	.map(w => w.charAt(0).toUpperCase() + w.slice(1))
	.join("");

const template = `import ${model} from "../src/models/sequelize/${model.toLowerCase()}.model.js";

export const up = async () => {
  // Seeding
  await ${model}.create({
    name: 'Sample ${model}',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const down = async () => {
  // Rollback
  await ${model}.destroy({ where: { name: 'Sample ${model}' } });
};`;

fs.writeFileSync(filepath, template);
logger.info(`Seeder created: ${filepath}`);
