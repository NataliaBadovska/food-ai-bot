import { userRepository } from "../repositories/user.repository.js";
import { calculatorService } from "./calculator.service.js";

import type { ProfileData } from "../types/profile.js";
import type {
  Gender,
  Goal,
  ActivityLevel,
} from "../types/user.js";

interface RegisterUserData extends ProfileData {
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

class UserService {
  async isRegistered(telegramId: number): Promise<boolean> {
    return userRepository.exists(telegramId);
  }

  async getByTelegramId(telegramId: number) {
    return userRepository.findByTelegramId(telegramId);
  }

  async register(data: RegisterUserData) {
    const nutrition =
      calculatorService.buildNutritionProfile(
        data.gender,
        data.age,
        data.height,
        data.weight,
        data.activityLevel,
        data.goal
      );

    await userRepository.create({
      telegramId: data.telegramId,

      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      languageCode: data.languageCode,

      age: data.age,
      gender: data.gender,

      height: data.height,
      weight: data.weight,

      activityLevel: data.activityLevel,
      goal: data.goal,

      dailyCalories: nutrition.calories,
      dailyProtein: nutrition.protein,
      dailyFat: nutrition.fat,
      dailyCarbs: nutrition.carbs,
    });

    return nutrition;
  }

  async recalculateNutrition(telegramId: number) {
  const user = await this.getByTelegramId(telegramId);

  if (!user) return;

  const nutrition = calculatorService.buildNutritionProfile(
  user.gender as Gender,
  user.age,
  user.height,
  user.weight,
  user.activityLevel as ActivityLevel,
  user.goal as Goal
);

  await userRepository.update(telegramId, {
    dailyCalories: nutrition.calories,
    dailyProtein: nutrition.protein,
    dailyFat: nutrition.fat,
    dailyCarbs: nutrition.carbs,
  });
}

  async updateProfile(
    telegramId: number,
    profile: Partial<ProfileData>
  ) {
    await userRepository.update(telegramId, profile);
  }

  async delete(telegramId: number) {
    await userRepository.delete(telegramId);
  }
}

export const userService = new UserService();