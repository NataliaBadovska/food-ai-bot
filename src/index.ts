
import { bot } from "./bot/bot.js";

import "./handlers/start.js";
import "./handlers/text.js";
import "./handlers/photo.js";

bot.catch((err) => {
  console.error("Bot error:", err.error);
});

bot.start();

console.log("🚀 Bot started");