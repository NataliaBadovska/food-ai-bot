import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";
import type { Goal } from "../types/user.js";

import { goalKeyboard } from "../bot/keyboards/profile.keyboard.js";
import { userService } from "../services/user.service.js";

export async function editGoalConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  await ctx.reply(
    "🎯 Оберіть нову ціль:",
    {
      reply_markup: goalKeyboard,
    }
  );

  const goalCtx =
    await conversation.waitForCallbackQuery(/^goal_/);

  await goalCtx.answerCallbackQuery();

  const goal =
    goalCtx.callbackQuery.data.replace(
      "goal_",
      ""
    ) as Goal;

  await conversation.external(() =>
    userService.updateProfile(ctx.from!.id, {
      goal,
    })
  );

  await conversation.external(() =>
    userService.recalculateNutrition(ctx.from!.id)
  );

  await ctx.reply(
    "✅ Ціль оновлена.\n\nДенна норма перерахована."
  );
}