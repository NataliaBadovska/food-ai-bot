import { z } from "zod";

export const MealAnalysisSchema = z.object({
  foods: z.array(
    z.object({
      name: z.string().min(1),
      estimatedWeight: z.number().positive(),
    })
  ),
});