import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";

import { validateAge } from "../services/validation.service.js";
import { userService } from "../services/user.service.js";

export async function editAgeConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  while (true) {
    await ctx.reply("🎂 Введіть новий вік:");

    const ageCtx = await conversation.wait();

    if (!ageCtx.message?.text) {
      continue;
    }

    const age = validateAge(ageCtx.message.text);

    if (age === null) {
      await ctx.reply("❌ Введіть число від 10 до 120.");
      continue;
    }

    await conversation.external(() =>
      userService.updateProfile(ctx.from!.id, {
        age,
      })
    );

    await conversation.external(() =>
      userService.recalculateNutrition(ctx.from!.id)
    );

    await ctx.reply(
      "✅ Вік оновлено.\n\nДенна норма перерахована."
    );

    break;
  }
}