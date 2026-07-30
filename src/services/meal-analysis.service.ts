import { generateJsonFromImage } from "./gemini.service.js";
import { mealPrompt } from "../prompts/meal.promt.js";
import type { MealAnalysis } from "../types/meal.js";

export async function analyzeMeal(
  image: Buffer,
  description?: string
): Promise<MealAnalysis> {
  const prompt = description
    ? `${mealPrompt}

Опис користувача:
${description}`
    : mealPrompt;

  return generateJsonFromImage<MealAnalysis>(
    prompt,
    image
  );
}