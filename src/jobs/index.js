import logger from "../utils/logger.js";
import sampleJob from "./sample.job.js";

/* ====================== Jobs ====================== */
export const JOBS = {
    SAMPLE: sampleJob,
};

export const registerJobs = () => {
    logger.info("Registering Jobs...");

    Object.values(JOBS).forEach((job) => {
        logger.info(`Registering Job: ${job.name} With Schedule: ${job.schedule}`);
        job.register();
    });
};
