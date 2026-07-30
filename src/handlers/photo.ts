import { bot } from "../bot/bot.js";

bot.on("message:photo", async (ctx) => {
  const photos = ctx.message.photo;

  // Беремо фото найбільшого розміру
  const photo = photos[photos.length - 1];

  if (!photo) {
    await ctx.reply("❌ Не вдалося отримати фото.");
    return;
  }

  console.log("Photo file_id:", photo.file_id);

  await ctx.reply("📷 Фото отримано!");
});