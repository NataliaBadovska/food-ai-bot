import { Bot } from "grammy";
import { BOT_TOKEN } from "../config/env.js";

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN не вказано в змінних середовища (.env)!');
}

export const bot = new Bot(BOT_TOKEN);