import { spawn } from "child_process";
import logger from "../src/utils/logger.js";
import { execCommand } from "../src/utils/helpers.js";

/* ====================== Development Server Initialization Command ====================== */
(async () => {
	try {
		logger.info("Running migrations & seeders...");

		await execCommand("npm", ["run", "migrate:seed"]);

		logger.info("Starting development server with nodemon...");

		const child = spawn(
			process.platform === "win32" ? "npx.cmd" : "npx",
			[
				"nodemon",
				"--watch",
				"src",
				"--exec",
				"node",
				"--env-file=.env",
				"--enable-source-maps",
				"src/main.js",
			],
			{ stdio: "inherit" },
		);

		child.on("close", code => {
			logger.info(`nodemon exited with code ${code}`);
			process.exit(code);
		});
	} catch (error) {
		logger.error("Development server failed to start with nodemon:", error);
		process.exit(1);
	}
})();
