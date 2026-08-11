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
  healthNotes?: string | null;
}

export async function analyzeMeal(
  image: Buffer,
  user: UserProfile,
  description?: string
): Promise<MealAnalysis> {
  const prompt = `
${mealPrompt}

Профіль користувача:

Вік: ${user.age}
Стать: ${user.gender}
Зріст: ${user.height} см
Вага: ${user.weight} кг
Активність: ${user.activityLevel}
Ціль: ${user.goal}

Денна норма:
- Калорії: ${user.dailyCalories}
- Білки: ${user.dailyProtein} г
- Жири: ${user.dailyFat} г
- Вуглеводи: ${user.dailyCarbs} г

Особливості здоров'я:
${user.healthNotes ?? "немає"}

${description ? `Опис страви:\n${description}` : ""}
`;

  return generateJsonFromImage<MealAnalysis>(
    prompt,
    image
  );
}