import type { MealAnalysis } from "../types/meal.js";
import type { MealNutrition } from "../types/nutrition.js";

export function formatMeal(meal: MealAnalysis, nutrition: MealNutrition, coachComment?: string): string {
  let message = "🍽️ Я знайшов на фото:\n\n";

  for (const food of meal.foods) {
    message += `• ${food.name} — ~ ${food.estimatedWeight} г\n`;
    }
    
    message += "\n";
    message += "━━━━━━━━━━━━━━\n\n";

    message += "🔥 Орієнтовна поживна цінність\n\n";

    message += `Калорії: ${nutrition.total.calories} ккал\n\n`;

    message += `🥩 Білки: ${nutrition.total.protein} г\n`;
    message += `🥑 Жири: ${nutrition.total.fat} г\n`;
    message += `🍚 Вуглеводи: ${nutrition.total.carbs} г\n`;

    if (coachComment) {
     message += "\n";
     message += "━━━━━━━━━━━━━━\n\n";
     message += "💡 AI-порада\n\n";
     message += `${coachComment}\n`;
}

   

  return message;
}