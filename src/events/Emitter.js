import { EventEmitter } from "events";
import logger from "../utils/logger.js";

/* ====================== Event Emitter ====================== */
class CustomEventEmitter extends EventEmitter { }

const Emitter = new CustomEventEmitter({ captureRejections: true });

Emitter.on("error", (error) => {
    logger.error({
        event: "GLOBAL_EVENT_ERROR",
        message: "Unhandled event listener error",
        error: error?.message || error,
        stack: error?.stack,
    });
});

export default Emitter;