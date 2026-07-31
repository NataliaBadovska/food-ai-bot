import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { downloadPhoto } from "../services/telegram.service.js";
import { analyzeMeal } from "../services/meal-analysis.service.js";
import { analyzeNutrition } from "../services/nutrition.service.js";
import { generateCoachComment } from "../services/coach.service.js";
import { formatMeal } from "../services/meal-formatter.service.js";

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

      const meal = await analyzeMeal(buffer, description);

      const nutrition = await analyzeNutrition(meal);

      const coachComment = await generateCoachComment(nutrition);

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