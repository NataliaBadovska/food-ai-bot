import { mealRepository } from "../repositories/meal.repository.js";
import { meals } from "../db/schema.js";

class MealService {
async saveMeal(data: typeof meals.$inferInsert) {
  await mealRepository.create(data);
}

  async getHistory(userId: number) {
    return mealRepository.findByUser(userId);
  }

  async getToday(userId: number) {
  const start = new Date();

  start.setHours(0, 0, 0, 0);

  return mealRepository.findToday(
    userId,
    start.getTime()
  );
}
}

export const mealService = new MealService();