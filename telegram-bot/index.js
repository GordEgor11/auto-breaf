// Telegram Bot для Decor CRM
// Отправляет пользователю его Chat ID при команде /start

const { Telegraf } = require('telegraf');

// Инициализация бота
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик команды /start
bot.start((ctx) => {
  const chatId = ctx.from.id;
  
  ctx.reply(
    `🎉 <b>Ваш Chat ID: <code>${chatId}</code></b>\n\n` +
    `📋 <b>Инструкция:</b>\n` +
    `1. Скопируйте число выше (нажмите на него)\n` +
    `2. Откройте Decor CRM\n` +
    `3. Перейдите в Настройки → Telegram\n` +
    `4. Вставьте Chat ID в поле\n` +
    `5. Нажмите "Сохранить"\n\n` +
    `✅ После этого вы будете получать уведомления о новых заявках!`,
    { parse_mode: 'HTML' }
  );
});

// Обработчик команды /help
bot.help((ctx) => {
  ctx.reply(
    `🤖 <b>Бот Decor CRM</b>\n\n` +
    `Отправьте /start чтобы получить ваш Chat ID\n\n` +
    `После получения Chat ID:\n` +
    `1. Откройте Decor CRM\n` +
    `2. Перейдите в Настройки → Telegram\n` +
    `3. Вставьте Chat ID\n` +
    `4. Сохраните\n\n` +
    `Теперь вы будете получать уведомления о новых заявках!`
  );
});

// Запуск бота
bot.launch().then(() => {
  console.log('✅ Бот запущен!');
  console.log(`Username: @${bot.botInfo?.username}`);
}).catch(console.error);

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
