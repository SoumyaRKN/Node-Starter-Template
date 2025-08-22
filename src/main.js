import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes/index.js";
import logger from "./utils/logger.js";
import { registerJobs } from "./jobs/index.js";
import { registerTasks } from "./tasks/index.js";
import registerEventListeners from "./events/Listeners.js";
import replyMiddleware from "./middlewares/reply.middleware.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";

/*======================= Main Server Entry ==========================*/
const app = express();
const { PORT } = process.env;

if (!PORT) {
	logger.error("Missing required environment variable: PORT");
	process.exit(1);
}

// CORS
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"], origin: "*" }));

// Logging
app.use(morgan("combined"));

// Request body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Custom middlewares
app.use(replyMiddleware);
app.use(errorHandlerMiddleware);

// Register Event Listeners
registerEventListeners();

// Register Jobs
registerJobs();

// Register Tasks
registerTasks();

// Routes
app.use("/", routes);

// Start server
app.listen(PORT, () => {
	logger.info(`Server running and listening on port ${PORT}`);
});

export default app;
