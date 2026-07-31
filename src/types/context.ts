import type { Context } from "grammy";
import type { ConversationFlavor } from "@grammyjs/conversations";

export interface BotContext extends ConversationFlavor<Context> {}