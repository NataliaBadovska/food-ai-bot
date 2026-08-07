import { and, desc, eq, gte } from "drizzle-orm";

import { db } from "../db/index.js";
import { meals } from "../db/schema.js";

class MealRepository {
  async create(data: typeof meals.$inferInsert) {
    await db.insert(meals).values(data);
  }

  async findByUser(userId: number) {
    return db
      .select()
      .from(meals)
      .where(eq(meals.userId, userId))
      .orderBy(desc(meals.createdAt));
  }
  
  async findToday(userId: number, startOfDay: number) {
  const todayMeals = await db
    .select()
    .from(meals)
    .where(
      and(
        eq(meals.userId, userId),
        gte(meals.createdAt, startOfDay)
      )
    )
    .orderBy(desc(meals.createdAt));

  return todayMeals;
}
}

export const mealRepository = new MealRepository();