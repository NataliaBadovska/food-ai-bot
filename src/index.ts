import { bot } from "./bot/bot.js";

import { conversations, createConversation } from "@grammyjs/conversations";

import { onboardingConversation } from "./conversations/onboarding.conversation.js";

import { registerStartHandler } from "./handlers/start.js";
import { registerTextHandler } from "./handlers/text.js";
import { registerPhotoHandler } from "./handlers/photo.js";
import { registerTodayHandler } from "./handlers/today.js";
import { registerHistoryHandler } from "./handlers/history.js";

await bot.api.deleteWebhook({
  drop_pending_updates: true,
});

bot.use(conversations());

bot.use(createConversation(onboardingConversation));

registerStartHandler(bot);
registerPhotoHandler(bot);
registerTodayHandler(bot);
registerHistoryHandler(bot);

registerTextHandler(bot);

bot.catch((err) => {
  console.error(err.error);
});

await bot.start();

console.log("🚀 Bot started");