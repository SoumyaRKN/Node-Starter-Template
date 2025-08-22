import EVENTS from "../index.js";
import { trace } from "../../utils/helpers.js";

/* ====================== Sample Event Listener ====================== */
export default trace(EVENTS.SAMPLE_EVENT, async () => {
    return { processed: true, payload };
});