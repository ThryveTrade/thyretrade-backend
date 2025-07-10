import dotenv from "dotenv";
dotenv.config();

import { monitorOneMinuteBreakout } from "./ai/strategy-engine/LiveMonitor.js";

(async () => {
  await monitorOneMinuteBreakout();
})();
