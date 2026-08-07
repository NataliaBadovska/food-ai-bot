import type { Bot } from "grammy";
import type { BotContext } from "../types/context.js";

import { userService } from "../services/user.service.js";
import { profileEditKeyboard } from "../bot/keyboards/profile-edit.keyboard.js";

export function registerProfileHandler(bot: Bot<BotContext>) {
  bot.command("profile", async (ctx) => {
    if (!ctx.from) return;

    const user = await userService.getByTelegramId(ctx.from.id);

    if (!user) {
      await ctx.reply("Спочатку виконайте /start");
      return;
    }

    const gender =
      user.gender === "male"
        ? "Чоловіча"
        : "Жіноча";

    const activity: Record<string, string> = {
      sedentary: "Мінімальна",
      light: "Легка",
      moderate: "Помірна",
      active: "Висока",
      very_active: "Дуже висока",
    };

    const goalText = (() => {
  switch (user.goal) {
    case "lose_weight":
    case "lose":
      return "Схуднення";

    case "maintain_weight":
    case "maintain":
      return "Підтримка ваги";

    case "gain_weight":
    case "gain":
      return "Набір ваги";

    default:
      return user.goal;
  }
})();

    await ctx.reply(`
👤 Ваш профіль

Вік: ${user.age}
Стать: ${gender}

📏 Зріст: ${user.height} см
⚖️ Вага: ${user.weight} кг

🏃 Активність:
${activity[user.activityLevel] ?? user.activityLevel}

🎯 Ціль:
${goalText}

━━━━━━━━━━━━━━

🔥 Денна норма:
${user.dailyCalories} ккал

🥩 Білки:
${user.dailyProtein} г

🥑 Жири:
${user.dailyFat} г

🍚 Вуглеводи:
${user.dailyCarbs} г
`,
        {
    reply_markup: profileEditKeyboard,
  }
    );
   
  });
}