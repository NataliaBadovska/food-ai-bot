import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { downloadPhoto } from "../services/telegram.service.js";
import { analyzeMeal } from "../services/meal-analysis.service.js";
import { analyzeNutrition } from "../services/nutrition.service.js";
import { formatMeal } from "../services/meal-formatter.service.js";
import { userService } from "../services/user.service.js";
import { mealService } from "../services/meal.service.js";

export function registerPhotoHandler(bot: Bot<BotContext>) {
  bot.on("message:photo", async (ctx) => {
    const photo = ctx.message.photo.at(-1);
    const description = ctx.message.caption?.trim();

    if (!photo) return;

    await ctx.reply(
      description
        ? "🧠 Аналізую фотографію з урахуванням вашого опису..."
        : "🧠 Аналізую фотографію..."
    );

    try {
      console.log("📷 Photo received");

      const buffer = await downloadPhoto(photo.file_id);

      const user = await userService.getByTelegramId(ctx.from.id);

      if (!user) {
        throw new Error("User not found");
      }

      const meal = await analyzeMeal(
        buffer,
        {
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          activityLevel: user.activityLevel,
          goal: user.goal,
          dailyCalories: user.dailyCalories,
          dailyProtein: user.dailyProtein,
          dailyFat: user.dailyFat,
          dailyCarbs: user.dailyCarbs,
        },
        description
      );

      const nutrition = await analyzeNutrition(meal);

      const coachComment = meal.coachComment;

      await mealService.saveMeal({
        userId: user.id,
        imageId: photo.file_id,
        ...(description && { description }),
        calories: nutrition.total.calories,
        protein: nutrition.total.protein,
        fat: nutrition.total.fat,
        carbs: nutrition.total.carbs,
        coachComment,
      });

      const message = formatMeal(
        meal,
        nutrition,
        coachComment
      );

      await ctx.reply(message);

      console.log("✅ Analysis completed");
    } catch (error) {
      console.error(error);

      await ctx.reply(
        "❌ Не вдалося проаналізувати фотографію."
      );
    }
  });
}