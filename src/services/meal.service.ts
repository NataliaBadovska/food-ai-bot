import { mealRepository } from "../repositories/meal.repository.js";
import { meals } from "../db/schema.js";

class MealService {
async saveMeal(data: typeof meals.$inferInsert) {
  await mealRepository.create(data);
}

  async getHistory(userId: number) {
    return mealRepository.findByUser(userId);
  }
}

export const mealService = new MealService();