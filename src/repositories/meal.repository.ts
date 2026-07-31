import { desc, eq } from "drizzle-orm";

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
}

export const mealRepository = new MealRepository();