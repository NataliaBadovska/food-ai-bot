import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";
import type {
  Gender,
  Goal,
  ActivityLevel,
} from "../types/user.js";

import {
  genderKeyboard,
  activityKeyboard,
  goalKeyboard,
} from "../bot/keyboards/profile.keyboard.js";

import {
  validateAge,
  validateHeight,
  validateWeight,
} from "../services/validation.service.js";

import { userService } from "../services/user.service.js";

interface OnboardingData {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export async function onboardingConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  const user = ctx.from;
  if (!user) {
    await ctx.reply("❌ Не вдалося отримати дані користувача.");
    return;
  }

  const profile: Partial<OnboardingData> = {};

  //
  // AGE
  //

  while (true) {
    await ctx.reply("🎂 Скільки вам років?");

    const ageCtx = await conversation.wait();

    if (!ageCtx.message?.text) {
      continue;
    }

    const age = validateAge(ageCtx.message.text);

    if (age === null) {
      await ctx.reply("❌ Введіть число від 10 до 120.");
      continue;
    }

    profile.age = age;
    break;
  }

  //
  // GENDER
  //

  await ctx.reply("👤 Оберіть стать", {
    reply_markup: genderKeyboard,
  });

  const genderCtx = await conversation.waitForCallbackQuery(/^gender_/);
  await genderCtx.answerCallbackQuery();

  profile.gender = genderCtx.callbackQuery.data.replace(
    "gender_",
    ""
  ) as Gender;

  //
  // HEIGHT
  //

  while (true) {
    await ctx.reply("📏 Ваш зріст (см)");

    const heightCtx = await conversation.wait();

    if (!heightCtx.message?.text) {
      continue;
    }

    const height = validateHeight(heightCtx.message.text);

    if (height === null) {
      await ctx.reply("❌ Введіть зріст від 100 до 250 см.");
      continue;
    }

    profile.height = height;
    break;
  }

  //
  // WEIGHT
  //

  while (true) {
    await ctx.reply("⚖️ Ваша вага (кг)");

    const weightCtx = await conversation.wait();

    if (!weightCtx.message?.text) {
      continue;
    }

    const weight = validateWeight(weightCtx.message.text);

    if (weight === null) {
      await ctx.reply("❌ Введіть коректну вагу.");
      continue;
    }

    profile.weight = weight;
    break;
  }

  //
  // ACTIVITY
  //

  await ctx.reply("🏃 Оберіть рівень вашої физичної активності", {
    reply_markup: activityKeyboard,
  });

  const activityCtx = await conversation.waitForCallbackQuery(/^activity_/);
  await activityCtx.answerCallbackQuery();

  profile.activityLevel = activityCtx.callbackQuery.data.replace(
    "activity_",
    ""
  ) as ActivityLevel;

  //
  // GOAL
  //

  await ctx.reply("🎯 Яка ваша основна мета?", {
    reply_markup: goalKeyboard,
  });

  const goalCtx = await conversation.waitForCallbackQuery(/^goal_/);
  await goalCtx.answerCallbackQuery();

  profile.goal = goalCtx.callbackQuery.data.replace(
    "goal_",
    ""
  ) as Goal;

  //
  // SAVE USER
  //

const nutrition = await conversation.external(() =>
    userService.register({
      telegramId: user.id,
      firstName: user.first_name,
      ...(user.last_name && { lastName: user.last_name }),
      ...(user.username && { username: user.username }),
      ...(user.language_code && { languageCode: user.language_code }),
      age: profile.age!,
      gender: profile.gender!,
      height: profile.height!,
      weight: profile.weight!,
      activityLevel: profile.activityLevel!,
      goal: profile.goal!,
    })
  );

  //
  // FINISH
  //

  await ctx.reply(`🎉 Профіль успішно створено!

Тепер я можу аналізувати ваші страви персонально.

━━━━━━━━━━━━━━

🔥 Денна норма калорій:
${nutrition.calories} ккал

🥩 Білки:
${nutrition.protein} г

🥑 Жири:
${nutrition.fat} г

🍚 Вуглеводи:
${nutrition.carbs} г

━━━━━━━━━━━━━━

📷 Надішліть фотографію першої страви.`);
}