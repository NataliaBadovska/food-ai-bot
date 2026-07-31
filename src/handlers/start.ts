import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";
import { userService } from "../services/user.service.js";

export function registerStartHandler(bot: Bot<BotContext>) {
  bot.command("start", async (ctx) => {
    console.log("START HANDLER");
    if (!ctx.from) {
      await ctx.reply(
        "❌ Виникла помилка: не вдалося отримати ваш профіль Telegram."
      );
      return;
    }

    const user = await userService.getByTelegramId(ctx.from.id);

    if (user) {
      await ctx.reply(
        "👋 Радий бачити вас знову!\n\nНадішліть фотографію страви 🍽️"
      );
      return;
    }

    await ctx.conversation.enter("onboardingConversation");
  });
}