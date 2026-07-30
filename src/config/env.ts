import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing");
}

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

export { BOT_TOKEN, GEMINI_API_KEY };