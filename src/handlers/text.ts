import { bot } from "../bot/bot.js";
import { generateText } from "../services/gemini.service.js";

bot.on("message:text", async (ctx) => {
  if (ctx.message.text === "/ai") {
    await ctx.reply("🧠 Думаю...");

    try {
      const answer = await generateText(
        "Привіт! Відповідай одним реченням українською мовою."
      );

      await ctx.reply(answer);
    } catch (error) {
      console.error(error);

      await ctx.reply("❌ Помилка Gemini");
    }

    return;
  }

  await ctx.reply(`Ти написав: ${ctx.message.text}`);
});