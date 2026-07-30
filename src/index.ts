
import { bot } from "./bot/bot.js";

import "./handlers/start.js";
import "./handlers/text.js";
import "./handlers/photo.js";

bot.start();

console.log("🚀 Bot started");