import { Conversation } from "@grammyjs/conversations";

import type { BotContext } from "../types/context.js";

import { userService } from "../services/user.service.js";

export async function editHealthConversation(
  conversation: Conversation<BotContext, BotContext>,
  ctx: BotContext
) {
  if (!ctx.from) return;

  while (true) {
    await ctx.reply(`🩺 Введіть особливості здоров'я.

Наприклад:

• вагітність
• грудне вигодовування
• діабет
• гастрит
• алергія на арахіс
• безлактозна дієта

Якщо особливостей немає — напишіть:

немає`);

    const healthCtx = await conversation.wait();

    if (!healthCtx.message?.text) {
      continue;
    }

    const value =
      healthCtx.message.text.trim().toLowerCase() === "немає"
        ? null
        : healthCtx.message.text.trim();

    await conversation.external(() =>
      userService.updateHealthNotes(
        ctx.from!.id,
        value
      )
    );

    await ctx.reply(
      "✅ Особливості здоров'я оновлено."
    );

    break;
  }
}