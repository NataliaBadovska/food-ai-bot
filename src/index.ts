
import { bot } from "./bot/bot.js";

import "./handlers/start.js";
import "./handlers/text.js";

bot.start();

console.log("🚀 Bot started");