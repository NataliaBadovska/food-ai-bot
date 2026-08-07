import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";
import type { ActivityLevel } from "../types/user.js";

import { activityKeyboard } from "../bot/keyboards/profile.keyboard.js";
import { userService } from "../services/user.service.js";

export async function editActivityConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  await ctx.reply(
    "🏃 Оберіть новий рівень активності:",
    {
      reply_markup: activityKeyboard,
    }
  );

  const activityCtx =
    await conversation.waitForCallbackQuery(/^activity_/);

  await activityCtx.answerCallbackQuery();

  const activityLevel =
    activityCtx.callbackQuery.data.replace(
      "activity_",
      ""
    ) as ActivityLevel;

  await conversation.external(() =>
    userService.updateProfile(ctx.from!.id, {
      activityLevel,
    })
  );

  await conversation.external(() =>
    userService.recalculateNutrition(ctx.from!.id)
  );

  await ctx.reply(
    "✅ Рівень активності оновлено.\n\nДенна норма перерахована."
  );
}