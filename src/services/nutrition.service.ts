import { generateJson } from "./gemini.service.js";
import { nutritionPrompt } from "../prompts/nutrition.prompt.js";

import type { MealAnalysis } from "../types/meal.js";
import type { MealNutrition } from "../types/nutrition.js";

export async function analyzeNutrition(
  meal: MealAnalysis
): Promise<MealNutrition> {
  return generateJson<MealNutrition>(
    nutritionPrompt,
    meal
  );
}