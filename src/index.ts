import { bot } from "./bot/bot.js";

import { conversations, createConversation } from "@grammyjs/conversations";
import { session, webhookCallback } from "grammy";

import { createServer } from "node:http";


import { onboardingConversation } from "./conversations/onboarding.conversation.js";

import { registerStartHandler } from "./handlers/start.js";
import { registerTextHandler } from "./handlers/text.js";
import { registerPhotoHandler } from "./handlers/photo.js";
import { registerTodayHandler } from "./handlers/today.js";
import { registerHistoryHandler } from "./handlers/history.js";
import { registerProfileHandler } from "./handlers/profile.js";
import { registerProfileEditHandler } from "./handlers/profile-edit.js";

import { editWeightConversation } from "./conversations/edit-weight.conversation.js";
import { editAgeConversation } from "./conversations/edit-age.conversation.js";
import { editHeightConversation } from "./conversations/edit-height.conversation.js";
import { editActivityConversation } from "./conversations/edit-activity.conversation.js";
import { editGoalConversation } from "./conversations/edit-goal.conversation.js";
import { editHealthConversation } from "./conversations/edit-health.conversation.js";

bot.use(
  session({
    initial: () => ({}),
  }),
);

bot.use(conversations());

bot.use(createConversation(onboardingConversation));

bot.use(createConversation(editWeightConversation, "editWeight"));
bot.use(createConversation(editHeightConversation, "editHeight"));
bot.use(createConversation(editAgeConversation, "editAge"));
bot.use(createConversation(editActivityConversation, "editActivity"));
bot.use(createConversation(editGoalConversation, "editGoal"));
bot.use(createConversation(editHealthConversation, "editHealth"));
  


registerStartHandler(bot);
registerPhotoHandler(bot);
registerTodayHandler(bot);
registerHistoryHandler(bot);
registerProfileHandler(bot);
registerProfileEditHandler(bot);
registerTextHandler(bot);

bot.catch((err) => {
  console.error(err.error);
});

await bot.api.setMyCommands([
  { command: "start", description: "Почати роботу" },
  { command: "today", description: "Статистика за сьогодні" },
  { command: "history", description: "Історія харчування" },
  { command: "profile", description: "Мій профіль" },
]);

const PORT = Number(process.env.PORT) || 3000;

const handleUpdate = webhookCallback(bot, "http");

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200);
    res.end("OK");
    return;
  }

  if (req.url === "/webhook") {
    return handleUpdate(req, res);
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`🚀 Bot started on port ${PORT}`);
});