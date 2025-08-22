import logger from "../utils/logger.js";
import sampleTask from "./sample.task.js";

/* ====================== Tasks ====================== */
export const TASKS = {
    SAMPLE: sampleTask,
};

export const registerTasks = () => {
    logger.info("Registering Tasks...");

    Object.values(TASKS).forEach((task) => {
        logger.info(`Task Registered: ${task.name}`);
    });
};
