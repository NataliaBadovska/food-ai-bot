# 🍽️ Food AI Bot

Telegram-бот для аналізу фотографій їжі за допомогою Google Gemini AI.

## Можливості

- 📷 Аналіз фотографій страв
- 🧠 Розпізнавання продуктів за допомогою Gemini AI
- 🥗 Розрахунок калорій, білків, жирів і вуглеводів
- 👤 Персональний профіль користувача
- ✏️ Редагування профілю
- 📅 Статистика за сьогодні
- 📜 Історія прийомів їжі
- 🤖 Персональні рекомендації

---

## Стек

- Node.js
- TypeScript
- Grammy
- Google Gemini API
- Drizzle ORM
- PostgreSQL
- OpenFoodFacts API
- Render(деплой)
- Сonsole.neon.tech(деплой БД)

---

## Встановлення

```bash
npm install
```

Створіть файл `.env`

```env
BOT_TOKEN=
GEMINI_API_KEY=
DATABASE_URL=./sqlite.db
```

Запуск

```bash
npm run dev
```

---

## Команди

- `/start`
- `/profile`
- `/today`
- `/history`

---

## Структура

```
src/
 ├── bot/
 ├── conversations/
 ├── db/
 ├── handlers/
 ├── prompts/
 ├── repositories/
 ├── services/
 ├── types/
```

---

## Автор

Наталія Бадовська