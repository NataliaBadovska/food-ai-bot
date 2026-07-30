import { bot } from "../bot/bot.js";
import { getPhotoFile } from "../services/telegram.service.js";

bot.on("message:photo", async (ctx) => {
  const photos = ctx.message.photo;
  const photo = photos[photos.length - 1];

  if (!photo) {
    await ctx.reply("❌ Не вдалося отримати фото.")
    return;
  }

  const file = await getPhotoFile(photo.file_id);

  console.log(file);

  await ctx.reply("📷 Фото отримано!");
});