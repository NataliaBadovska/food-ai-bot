import type { NutritionProfile } from "../types/nutrition-profile.js";

import type {
  ActivityLevel,
  Gender,
  Goal,
} from "../types/user.js";


const activityMultiplier: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

function calculateBMR(
  gender: Gender,
  age: number,
  height: number,
  weight: number
): number {
  const base =
    10 * weight +
    6.25 * height -
    5 * age;

  return Math.round(
    gender === "male"
      ? base + 5
      : base - 161
  );
}

function calculateTDEE(
  bmr: number,
  activity: ActivityLevel
): number {
  return Math.round(
    bmr * activityMultiplier[activity]
  );
}

function calculateCalories(
  tdee: number,
  goal: Goal
): number {
  switch (goal) {
    case "lose_weight":
      return tdee - 500;

    case "gain_weight":
      return tdee + 300;

    default:
      return tdee;
  }
}

function calculateMacros(calories: number) {
  const protein = Math.round((calories * 0.30) / 4);

  const fat = Math.round((calories * 0.25) / 9);

  const carbs = Math.round(
    (calories - protein * 4 - fat * 9) / 4
  );

  return {
    protein,
    fat,
    carbs,
  };
}

function buildNutritionProfile(
  gender: Gender,
  age: number,
  height: number,
  weight: number,
  activity: ActivityLevel,
  goal: Goal
): NutritionProfile {
  const bmr = calculateBMR(
    gender,
    age,
    height,
    weight
  );

  const tdee = calculateTDEE(
    bmr,
    activity
  );

  const calories = calculateCalories(
    tdee,
    goal
  );

  const macros = calculateMacros(calories);

  return {
    bmr,
    tdee,
    calories,
    ...macros,
  };
}

export const calculatorService = {
  calculateBMR,
  calculateTDEE,
  calculateCalories,
  calculateMacros,
  buildNutritionProfile,
};