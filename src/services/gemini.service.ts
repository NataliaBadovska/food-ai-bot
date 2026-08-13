import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY не вказано.");
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const MODEL = "gemini-3.6-flash";

const MAX_RETRIES = 5;
const BASE_DELAY = 1000;
const MAX_DELAY = 15000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJson<T>(text: string): T {
  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean) as T;
}

function getRetryDelay(error: unknown): number | null {
  if (!(error instanceof Error)) return null;

  const message = error.message;

  const retryMatch = message.match(/"retryDelay":"(\d+)s"/);

  if (retryMatch) {
    return Number(retryMatch[1]) * 1000;
  }

  return null;
}

function isRetryable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const message = error.message;

  if (
    message.includes(
      "GenerateRequestsPerDayPerProjectPerModel-FreeTier"
    )
  ) {
    return false;
  }

  return (
    message.includes('"code":429') ||
    message.includes('"code":500') ||
    message.includes('"code":503') ||
    message.includes('"code":504')
  );
}

async function generateWithRetry(
  contents: Parameters<typeof ai.models.generateContent>[0]["contents"]
) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await ai.models.generateContent({
        model: MODEL,
        contents,
      });
    } catch (error) {
      lastError = error;

      if (!isRetryable(error)) {
        throw error;
      }

      if (attempt === MAX_RETRIES) {
        break;
      }

      let delay = getRetryDelay(error);

      if (!delay) {
        delay = Math.min(
          BASE_DELAY * 2 ** attempt,
          MAX_DELAY
        );

        // jitter +-20%
        delay += Math.floor(Math.random() * delay * 0.2);
      }

      console.warn(
        `Gemini retry ${attempt + 1}/${MAX_RETRIES} через ${delay} ms`
      );

      await sleep(delay);
    }
  }

  throw getUserFriendlyError(lastError);
}

export async function generateText(prompt: string) {
  const response = await generateWithRetry(prompt);

  return response.text ?? "";
}

export async function generateJson<T>(
  prompt: string,
  data: unknown
): Promise<T> {
  const response = await generateWithRetry([
    {
      role: "user",
      parts: [
        {
          text: `${prompt}

Дані:

${JSON.stringify(data, null, 2)}

Поверни тільки JSON.
Без markdown.`,
        },
      ],
    },
  ]);

  return parseJson<T>(response.text ?? "");
}

export async function generateJsonFromImage<T>(
  prompt: string,
  image: Buffer
): Promise<T> {
  const response = await generateWithRetry([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: image.toString("base64"),
      },
    },
    {
      text: `${prompt}

Поверни тільки JSON.
Без markdown.`,
    },
  ]);

  return parseJson<T>(response.text ?? "");
}

function getUserFriendlyError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Невідома помилка.");
  }

  const message = error.message;

  if (
    message.includes(
      "GenerateRequestsPerDayPerProjectPerModel-FreeTier"
    )
  ) {
    return new Error(
      "Вичерпано денний ліміт AI. Спробуйте завтра."
    );
  }

  if (message.includes('"code":503')) {
    return new Error(
      "Сервіс AI зараз перевантажений. Спробуйте через кілька секунд."
    );
  }

  if (message.includes('"code":429')) {
    return new Error(
      "Занадто багато запитів. Спробуйте трохи пізніше."
    );
  }

  if (message.includes('"code":401')) {
    return new Error(
      "Невірний API-ключ Gemini."
    );
  }

  return error;
}