import logger from "../utils/logger.js";
import { trace } from "../utils/helpers.js";

/* ====================== Sample Task ====================== */
const NAME = "Sample Task";

export default {
    name: NAME,
    run: trace(NAME, async (params = {}) => {
        logger.info(`[${NAME}] Executing task with params:`, params);
    })
};
