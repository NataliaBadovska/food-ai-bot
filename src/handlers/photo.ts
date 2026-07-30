import { bot } from "../bot/bot.js";
import { downloadPhoto } from "../services/telegram.service.js";

bot.on("message:photo", async (ctx) => {
  const photo = ctx.message.photo.at(-1);

  if (!photo) return;

  await ctx.reply("📥 Завантажую фото...");

  const buffer = await downloadPhoto(photo.file_id);

  console.log("Photo size:", buffer.length);

  await ctx.reply(`✅ Фото завантажено (${buffer.length} bytes)`);
});