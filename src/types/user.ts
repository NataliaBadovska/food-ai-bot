\export type Goal =
  | "lose_weight"
  | "maintain_weight"
  | "gain_weight";

export type Gender =
  | "male"
  | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export interface UserProfile {
  telegramId: number;

  firstName?: string;

  username?: string;

  age: number;

  gender: Gender;

  height: number;

  weight: number;

  activityLevel: ActivityLevel;

  goal: Goal;
}