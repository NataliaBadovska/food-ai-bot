import { bot } from "../bot/bot.js";

bot.on("message:text", async (ctx) => {
  await ctx.reply(`Ти написав:\n${ctx.message.text}`);
});