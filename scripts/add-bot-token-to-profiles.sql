-- Добавляем токен бота во все существующие профили
-- Выполните этот SQL в Supabase SQL Editor

-- Обновляем все профили, добавляя токен бота
UPDATE public.profiles 
SET telegram_bot_token = '8546580622:AAHLH6785Cg-h8TxKbdGK17S6LA2Gjr8Qns'
WHERE telegram_bot_token IS NULL;

-- Проверяем результат
SELECT id, email, telegram_chat_id, telegram_bot_token 
FROM public.profiles;
