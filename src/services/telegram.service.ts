import axios from "axios";
import { bot } from "../bot/bot.js";
import { BOT_TOKEN } from "../config/env.js";

export async function downloadPhoto(fileId: string) {
  // Отримуємо інформацію про файл
  const file = await bot.api.getFile(fileId);

  if (!file.file_path) {
    throw new Error("File path not found");
  }

  // Формуємо URL для завантаження
  const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

  // Завантажуємо файл як Buffer
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
}