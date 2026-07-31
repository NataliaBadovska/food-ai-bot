import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { generateText } from "../services/gemini.service.js";

export function registerTextHandler(bot: Bot<BotContext>) {
  bot.command("ai", async (ctx) => {
    await ctx.reply("🧠 Думаю...");

    try {
      const answer = await generateText(
        "Привіт! Відповідай одним реченням українською мовою."
      );

      await ctx.reply(answer);
    } catch (error) {
      console.error(error);
      await ctx.reply("❌ Помилка Gemini");
    }
  });

  bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return;

    await ctx.reply(`Ти написав: ${ctx.message.text}`);
  });
}