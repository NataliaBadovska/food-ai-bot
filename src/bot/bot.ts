import { Bot } from "grammy";
import { BOT_TOKEN } from "../config/env.js";
import type { BotContext } from "../types/context.js";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN не вказано в .env!");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);