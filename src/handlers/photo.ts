import { bot } from "../bot/bot.js";
import { downloadPhoto } from "../services/telegram.service.js";
import { analyzeMeal } from "../services/meal-analysis.service.js";
import { formatMeal } from "../services/meal-formatter.service.js";
import { analyzeNutrition } from "../services/nutrition.service.js";
import { generateCoachComment } from "../services/coach.service.js";

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
    const buffer = await downloadPhoto(photo.file_id);

   const meal = await analyzeMeal(buffer, description);

    const nutrition = await analyzeNutrition(meal);
    
    const coachComment = await generateCoachComment(nutrition);

   const message = formatMeal(meal, nutrition, coachComment);

    await ctx.reply(message);
    
  } catch (error) {
    console.error(error);

    await ctx.reply("❌ Не вдалося проаналізувати фотографію.");
  }
});