import type {
  ActivityLevel,
  Gender,
  Goal,
} from "./user.js";

export interface ProfileData {
  age: number;

  gender: Gender;

  height: number;

  weight: number;

  activityLevel: ActivityLevel;

  goal: Goal;
}