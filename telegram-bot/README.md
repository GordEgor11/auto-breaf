# Telegram Bot для Decor CRM

Бот автоматически отправляет пользователю его Chat ID при команде `/start`.

## 🚀 Запуск локально

```bash
cd telegram-bot
npm install
TELEGRAM_BOT_TOKEN=your_token npm start
```

## 🌐 Запуск на Vercel (бесплатно)

### 1. Создайте файл `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### 2. Создайте файл `.env`:

```
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
```

### 3. Задеплойте:

```bash
cd telegram-bot
vercel --prod
```

### 4. Настройте Webhook (после деплоя):

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<YOUR_VERCEL_URL>"
```

---

## 📋 Альтернатива: Запуск на Heroku (проще)

1. Создайте аккаунт на [heroku.com](https://heroku.com)
2. Установите Heroku CLI
3. Выполните:

```bash
cd telegram-bot
heroku create your-bot-name
heroku config:set TELEGRAM_BOT_TOKEN=your_token
git push heroku main
```

---

## 🤖 Команды бота:

- `/start` — отправляет Chat ID пользователю
- `/help` — инструкция по использованию
