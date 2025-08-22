import EVENTS from "./index.js";
import Emitter from "./Emitter.js";
import sampleListener from "./listeners/sample.listener.js";

/* ====================== Event Listeners ====================== */
export default () => {
    Emitter.on(EVENTS.SAMPLE_EVENT, sampleListener);
};