import { generateText } from "./gemini.service.js";
import { coachPrompt } from "../prompts/coach.prompt.js";
import type { MealNutrition } from "../types/nutrition.js";

export async function generateCoachComment(
  nutrition: MealNutrition
): Promise<string> {
  return generateText(`
${coachPrompt}

Дані:

${JSON.stringify(nutrition, null, 2)}
`);
}