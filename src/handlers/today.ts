import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { mealService } from "../services/meal.service.js";
import { userService } from "../services/user.service.js";

export function registerTodayHandler(bot: Bot<BotContext>) {
  bot.command("today", async (ctx) => {
    if (!ctx.from) return;

    const user = await userService.getByTelegramId(ctx.from.id);

    if (!user) {
      await ctx.reply("Спочатку виконайте /start");
      return;
    }

    const meals = await mealService.getToday(user.id);

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

    await ctx.reply(`
🔥 За сьогодні

Калорії:
${total.calories} / ${user.dailyCalories} ккал

🥩 Білки:
${total.protein} / ${user.dailyProtein} г

🥑 Жири:
${total.fat} / ${user.dailyFat} г

🍚 Вуглеводи:
${total.carbs} / ${user.dailyCarbs} г

━━━━━━━━━━━━━━

Залишилось:

🔥 ${Math.max(user.dailyCalories - total.calories, 0)} ккал

🥩 ${Math.max(user.dailyProtein - total.protein, 0)} г

🥑 ${Math.max(user.dailyFat - total.fat, 0)} г

🍚 ${Math.max(user.dailyCarbs - total.carbs, 0)} г
`);
  });
}