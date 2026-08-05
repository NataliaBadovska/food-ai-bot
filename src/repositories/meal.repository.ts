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

//   async findToday(userId: number, startOfDay: number) {
//   return db
//     .select()
//     .from(meals)
//     .where(
//       and(
//         eq(meals.userId, userId),
//         gte(meals.createdAt, startOfDay)
//       )
//     )
//     .orderBy(desc(meals.createdAt));
  // }
  
  async findToday(userId: number, startOfDay: number) {
  console.log("userId:", userId);
  console.log("startOfDay:", startOfDay);

  const allMeals = await db.select().from(meals);
  console.log("ALL MEALS:", allMeals);

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

  console.log("TODAY MEALS:", todayMeals);

  return todayMeals;
}
}

export const mealRepository = new MealRepository();