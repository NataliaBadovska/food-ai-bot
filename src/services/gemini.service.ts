import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY не вказано в .env файлі!');
}


const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function generateText(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text ?? "";
}