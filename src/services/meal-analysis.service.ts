import { generateJsonFromImage } from "./gemini.service.js";
import { mealPrompt } from "../prompts/meal.promt.js";
import type { MealAnalysis } from "../types/meal.js";

interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyFat: number;
  dailyCarbs: number;
}

export async function analyzeMeal(
  image: Buffer,
  user: UserProfile,
  description?: string
): Promise<MealAnalysis> {
  const prompt = `
${mealPrompt}

Профіль користувача:

${JSON.stringify(user, null, 2)}

${description ? `Опис страви:\n${description}` : ""}
`;

  return generateJsonFromImage<MealAnalysis>(
    prompt,
    image
  );
}