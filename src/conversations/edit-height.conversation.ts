import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";

import { validateHeight } from "../services/validation.service.js";
import { userService } from "../services/user.service.js";

export async function editHeightConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  while (true) {
    await ctx.reply("📏 Введіть новий зріст (см):");

    const heightCtx = await conversation.wait();

    if (!heightCtx.message?.text) {
      continue;
    }

    const height = validateHeight(heightCtx.message.text);

    if (height === null) {
      await ctx.reply("❌ Введіть зріст від 100 до 250 см.");
      continue;
    }

    await conversation.external(() =>
      userService.updateProfile(ctx.from!.id, {
        height,
      })
    );

    await conversation.external(() =>
      userService.recalculateNutrition(ctx.from!.id)
    );

    await ctx.reply(
      "✅ Зріст оновлено.\n\nДенна норма перерахована."
    );

    break;
  }
}