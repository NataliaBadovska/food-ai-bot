import type { Context, SessionFlavor } from "grammy";
import type { ConversationFlavor } from "@grammyjs/conversations";

import type { SessionData } from "./session.js";

export interface BotContext
  extends Context,
    SessionFlavor<SessionData>,
    ConversationFlavor<Context> {}