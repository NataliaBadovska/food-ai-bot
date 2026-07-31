import { z } from "zod";

export const MealNutritionSchema = z.object({
  foods: z.array(
    z.object({
      name: z.string(),
      calories: z.number(),
      protein: z.number(),
      fat: z.number(),
      carbs: z.number(),
    })
  ),

  total: z.object({
    calories: z.number(),
    protein: z.number(),
    fat: z.number(),
    carbs: z.number(),
  }),
});