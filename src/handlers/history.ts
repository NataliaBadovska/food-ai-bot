import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { mealService } from "../services/meal.service.js";
import { userService } from "../services/user.service.js";

export function registerHistoryHandler(bot: Bot<BotContext>) {
  bot.command("history", async (ctx) => {
    if (!ctx.from) return;

    const user = await userService.getByTelegramId(ctx.from.id);

    if (!user) {
      await ctx.reply("Спочатку виконайте /start");
      return;
    }

    const meals = await mealService.getToday(user.id);

    if (!meals.length) {
      await ctx.reply("📭 За сьогодні ще немає прийомів їжі.");
      return;
    }

    const total = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.fat += meal.fat;
        acc.carbs += meal.carbs;

        return acc;
      },
      {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      }
    );

    const today = new Intl.DateTimeFormat("uk-UA").format(new Date());

    const mealBlocks = meals
      .slice()
      .reverse()
      .map((meal) => {
        const time = new Date(meal.createdAt).toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        });

      const mealTitle =
  meal.mealName ??
  "Невідома страва";

        return `🕒 ${time}
🍽 ${mealTitle}
🔥 ${meal.calories.toFixed(0)} ккал`;
      })
      .join("\n\n");

    await ctx.reply(`📅 ${today}

🔥 ${total.calories.toFixed(0)} / ${user.dailyCalories} ккал

🥩 ${total.protein.toFixed(1)} / ${user.dailyProtein} г
🥑 ${total.fat.toFixed(1)} / ${user.dailyFat} г
🍚 ${total.carbs.toFixed(1)} / ${user.dailyCarbs} г

━━━━━━━━━━━━━━

${mealBlocks}`);
  });
}