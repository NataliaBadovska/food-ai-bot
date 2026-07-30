import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY не вказано в .env файлі!');
}


const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function main() {
  console.log("📋 Доступні моделі:\n");

  const pager = await ai.models.list();

  for await (const model of pager) {
    console.log(model.name);

    if (model.supportedActions?.includes("generateContent")) {
      console.log("   ✅ generateContent");
    }

    console.log("----------------------------");
  }
}

main().catch(console.error);