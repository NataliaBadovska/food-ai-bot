import { bot } from "../bot/bot.js";

export async function getPhotoFile(fileId: string) {
  const file = await bot.api.getFile(fileId);

  return file;
}