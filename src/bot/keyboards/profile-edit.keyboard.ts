import { InlineKeyboard } from "grammy";

export const profileEditKeyboard = new InlineKeyboard()
  .text("🎂 Вік", "edit_age")
  .row()
  .text("📏 Зріст", "edit_height")
  .row()
  .text("⚖️ Вага", "edit_weight")
  .row()
  .text("🏃 Активність", "edit_activity")
  .row()
  .text("🎯 Ціль", "edit_goal")
  .row()
  .text("🩺 Особливості здоров'я", "edit_health");