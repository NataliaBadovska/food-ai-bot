import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";

import { validateWeight } from "../services/validation.service.js";
import { userService } from "../services/user.service.js";

export async function editWeightConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  while (true) {
    await ctx.reply("⚖️ Введіть нову вагу (кг):");

    const weightCtx = await conversation.wait();

    if (!weightCtx.message?.text) {
      continue;
    }

    const weight = validateWeight(weightCtx.message.text);

    if (weight === null) {
      await ctx.reply("❌ Введіть коректну вагу.");
      continue;
    }

    await conversation.external(() =>
      userService.updateProfile(ctx.from!.id, {
        weight,
      })
    );

    await conversation.external(() =>
      userService.recalculateNutrition(ctx.from!.id)
    );

    await ctx.reply(
      "✅ Вагу оновлено.\n\nНова денна норма вже перерахована."
    );

    break;
  }
}