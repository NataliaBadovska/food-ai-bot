import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

export function registerProfileEditHandler(bot: Bot<BotContext>) {
  bot.callbackQuery("edit_weight", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editWeight");
  });

  bot.callbackQuery("edit_height", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editHeight");
  });

  bot.callbackQuery("edit_age", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editAge");
  });

  bot.callbackQuery("edit_activity", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editActivity");
  });

  bot.callbackQuery("edit_goal", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editGoal");
  });

  bot.callbackQuery("edit_health", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("editHealth");
  });
}