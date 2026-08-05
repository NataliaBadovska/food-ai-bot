import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { mealService } from "../services/meal.service.js";
import { userService } from "../services/user.service.js";

export function registerHistoryHandler(bot: Bot<BotContext>) {
    
        
    bot.command("history", async (ctx) => {
      console.log("HISTORY COMMAND");

    if (!ctx.from) return;

    const user = await userService.getByTelegramId(ctx.from.id);

    if (!user) {
      await ctx.reply("Спочатку виконайте /start");
      return;
    }

    const meals = await mealService.getHistory(user.id);

    if (!meals.length) {
      await ctx.reply("📭 Історія поки що порожня.");
      return;
    }

    const lastMeals = meals.slice(0, 10);

    const text = lastMeals
      .map((meal, index) => {
        const date = new Date(meal.createdAt).toLocaleString("uk-UA");

        return `${index + 1}. ${date}

🔥 ${meal.calories} ккал
🥩 ${meal.protein} г
🥑 ${meal.fat} г
🍚 ${meal.carbs} г

💬 ${meal.coachComment}`;
      })
      .join("\n\n━━━━━━━━━━━━━━\n\n");

    await ctx.reply(text);
  });
}