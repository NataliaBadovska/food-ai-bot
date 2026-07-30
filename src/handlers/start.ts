import { bot } from "../bot/bot.js";

bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 Привіт!\n\nЯ AI-помічник з аналізу харчування.\n\nНадішли мені фото страви 🍕"
  );
});