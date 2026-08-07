import {
  pgTable,
  serial,
  integer,
  text,
  bigint,
   real
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  telegramId: integer("telegram_id").notNull().unique(),

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

  createdAt: bigint("created_at", {
    mode: "number",
  })
    .notNull()
    .$defaultFn(() => Date.now()),

  updatedAt: bigint("updated_at", {
    mode: "number",
  })
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  imageId: text("image_id"),

  description: text("description"),

  calories: integer("calories").notNull(),

  protein: real("protein").notNull(),

  fat: real("fat").notNull(),

  carbs: real("carbs").notNull(),

  coachComment: text("coach_comment"),

  createdAt: bigint("created_at", {
    mode: "number",
  })
    .notNull()
    .$defaultFn(() => Date.now()),
});