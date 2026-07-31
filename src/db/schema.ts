import {
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  telegramId: integer("telegram_id")
    .notNull()
    .unique(),

  firstName: text("first_name").notNull(),

  lastName: text("last_name"),

  username: text("username"),

  languageCode: text("language_code"),

  age: integer("age").notNull(),

  gender: text("gender").notNull(),

  height: integer("height").notNull(),

  weight: integer("weight").notNull(),

  activityLevel: text("activity_level").notNull(),

  goal: text("goal").notNull(),

  dailyCalories: integer("daily_calories").notNull(),

  dailyProtein: integer("daily_protein").notNull(),

  dailyFat: integer("daily_fat").notNull(),

  dailyCarbs: integer("daily_carbs").notNull(),

  createdAt: integer("created_at")
    .$defaultFn(() => Date.now())
    .notNull(),

  updatedAt: integer("updated_at")
    .$defaultFn(() => Date.now())
    .notNull(),
});