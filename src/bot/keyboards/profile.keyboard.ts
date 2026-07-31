import { InlineKeyboard } from "grammy";

export const genderKeyboard = new InlineKeyboard()
  .text("👨 Чоловік", "gender_male")
  .text("👩 Жінка", "gender_female");

export const activityKeyboard = new InlineKeyboard()
  .text("🛋 Мінімальна", "activity_sedentary")
  .row()
  .text("🚶 Легка", "activity_light")
  .row()
  .text("🏃 Середня", "activity_moderate")
  .row()
  .text("💪 Висока", "activity_active")
  .row()
  .text("🔥 Дуже висока", "activity_very_active");

export const goalKeyboard = new InlineKeyboard()
  .text("🔥 Схуднути", "goal_lose_weight")
  .row()
  .text("⚖️ Підтримувати вагу", "goal_maintain_weight")
  .row()
  .text("💪 Набрати масу", "goal_gain_weight");