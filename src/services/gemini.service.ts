import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY не вказано в .env файлі!");
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const MODEL = "gemini-3.6-flash";

function parseJson<T>(text: string): T {
  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean) as T;
}

export async function generateText(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text ?? "";
}

export async function generateJson<T>(
  prompt: string,
  data: unknown
): Promise<T> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${prompt}

Дані:

${JSON.stringify(data, null, 2)}

Поверни ТІЛЬКИ JSON.
Не використовуй markdown.
Не використовуй \`\`\`json.`,
          },
        ],
      },
    ],
  });

  const text = response.text ?? "";

 return parseJson<T>(response.text ?? "");
}

export async function generateJsonFromImage<T>(
  prompt: string,
  image: Buffer
): Promise<T> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: image.toString("base64"),
        },
      },
      {
        text: `${prompt}

Поверни ТІЛЬКИ JSON.
Не використовуй markdown.
Не використовуй \`\`\`json.`,
      },
    ],
  });

  const text = response.text ?? "";

 return parseJson<T>(response.text ?? "");
}