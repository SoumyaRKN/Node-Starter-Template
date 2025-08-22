import cron from "node-cron";
import logger from "../utils/logger.js";
import { TASKS } from "../tasks/index.js";
import { trace } from "../utils/helpers.js";

/* ====================== Sample Job ====================== */
const NAME = "Sample Job";
const SCHEDULE = "*/30 * * * * *"; // Every 30 seconds

export default {
    name: NAME,
    schedule: SCHEDULE,
    register: trace(NAME, async () => {
        return cron.schedule(SCHEDULE, async () => {
            logger.info(`[${NAME}] Triggered at ${new Date().toISOString()}`);
            await TASKS.SAMPLE.run({ auto: true });
        });
    })
};
